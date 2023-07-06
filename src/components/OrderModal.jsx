import React, { useRef } from 'react'
import axios from 'axios'

import useSound from 'use-sound'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { makePurchase } from '@/store/shopSlice'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'

export default function OrderModal() {

  const [playSound] = useSound('/sounds/sine-click.mp3', { volume: 0.5 })

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({ mode: 'onBlur'})

  const dispatch = useDispatch()
  const notification = useToast()
  const bgColor = useColorModeValue('#E4E4E7', '#18181B')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)

  const orderList = useSelector((state) => state.shop.orderList)
  const clientId = useSelector((state) => state.user.id)

  const onSubmit = async (data) => {

    const {
      address,
      paymentType
    } = data

    let quantity = ''
    let price = 0
    let medicineId = ''

    orderList.forEach((good) => {
      price += parseInt(good.price)
      quantity += good.quantity + ', '
      medicineId += good.medicine_id + ', '
    })

    // making order
    try {

      const response = await axios.post('/api/makeOrder', {
        clientId,
        quantity,
        price,
        medicineId,
        address,
        paymentType
      })

      console.log(response)

      //* success notification
      notification({
        title: 'Successfully made new order',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      dispatch(makePurchase())
    } catch(error) {
      console.error(error)
    }

    reset()
    onClose()
  }

  return (
    <>
      <Button _active={{transform: 'scale(90%)'}}
              _hover={{ background:'rgb(147, 51, 234)', transform: 'scale(95%)' }}
              fontSize='18px' fontWeight='400' color='rgb(241, 245, 249)' bg='rgb(147, 51, 234)' px='24px' py='11px' height='100%' transitionTimingFunction='ease' transitionDuration='200ms'
        onClick={() => {
          playSound()
          onOpen()
        }}
      >
        Make order
      </Button>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
      >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent bg={bgColor}>
          <ModalHeader className='text-center text-3xl font-semibold text-gray-700 dark:text-gray-200 transition-color duration-150 ease-in'>
            Order
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col items-center'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-stretch max-w-sm'
              >
                <label className='text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                  Shipment address:{' '}
                  <input
                    ref={initialRef}
                    {...register('address', {
                      required: 'This label is required',
                      minLength: 1
                    })}
                    className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                  />
                </label>
                {
                  errors?.address && <span className='mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-semibold'>
                                          {errors?.address?.message || 'Error!'}
                                      </span>
                }
                <label className='mt-3 inline'>
                  Payment:
                  <select
                    className='ml-2 pr-10 text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-color duration-150 ease-in'
                    {...register('paymentType', {
                      required: 'This label is required'
                    })}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </label>
                {
                  errors?.paymentType && <span className='mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-semibold'>
                                          {errors?.paymentType?.message || 'Error!'}
                                      </span>
                }
                <input
                  onClick={() => playSound()}
                  value='Submit'
                  type='submit'
                  disabled={!isValid}
                  className='disabled:opacity-40 disabled:hover:scale-100 disabled:active:scale-100 text-gray-100 bg-fuchsia-600 px-6 py-2 mt-5 mb-2 rounded-md hover:scale-95 active:scale-90 transition-all ease duration-200'
                />
              </form>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}