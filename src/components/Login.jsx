import React, { useRef } from 'react'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useClients } from '@/hooks/useDB'
import { useDispatch, useSelector } from 'react-redux'

import { signin } from '@/store/userSlice'

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

import useSound from 'use-sound'

export default function Login() {

  const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      reset
  } = useForm({ mode: 'onBlur'})

  const dispatch = useDispatch()
  const notification = useToast()
  const [clients, getClients] = useClients()
  const bgColor = useColorModeValue('#E4E4E7', '#18181B')

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const onSubmit = (data) => {

    const {
      email,
      password
    } = data

    let correctPassword = false

    clients.data.forEach(client => {

      // checking the correctness of the password
      if (client.email == email && client.password == password) {
        const user = client.first_name
        const id = client.client_id

        dispatch(signin({ user, id }))

        //* success notification
        notification({
          title: 'Successfully logged in to account',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        correctPassword = true

        onClose()
      }
    })

    // if password isn`t correct
    if (!correctPassword) {

      // error notification
      notification({
        title: 'Incorrect email or password',
        status: 'error',
        duration: 3000,
        isClosable: false,
      })
    }

    reset()

  }

  const [playSound] = useSound('/sounds/sine-click.mp3', { volume: 0.5 })

  return (
    <>
      <Button px='12px' mr='18px' onClick={onOpen}>
        Login
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
            Login
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col items-center'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-stretch max-w-sm'
              >
                <label className='text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                  Email:{' '}
                  <input
                    ref={initialRef}
                    {...register('email', {
                      minLength: 1
                    })}
                    className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                  />
                </label>
                <label className='mt-3 text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                  Password:{' '}
                  <input
                    type='password'
                    {...register('password', {
                      minLength: 1
                    })}
                    className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                  />
                </label>
                <input
                  onClick={() => playSound()}
                  value='Login'
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
  );
}

export function RequireLogin({ children }) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
} = useForm({ mode: 'onBlur'})

  const dispatch = useDispatch()
  const notification = useToast()
  const [clients, getClients] = useClients()
  const bgColor = useColorModeValue('#E4E4E7', '#18181B')
  const user = useSelector((state) => state.user.user)

  const { onClose } = useDisclosure();

  const initialRef = useRef(null);

  const onSubmit = (data) => {

    const {
      email,
      password
    } = data

    let correctPassword = false

    clients.data.forEach(client => {

      // checking the correctness of the password
      if (client.email == email && client.password == password) {
        const user = client.first_name
        const id = client.client_id

        dispatch(signin({ user, id }))

        //* success notification
        notification({
          title: 'Successfully logged in to account',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        correctPassword = true

        onClose()
      }
    })

    // if password isn`t correct
    if (!correctPassword) {

      // error notification
      notification({
        title: 'Incorrect email or password',
        status: 'error',
        duration: 3000,
        isClosable: false,
      })
    }

    reset()

  }

  const [playSound] = useSound('/sounds/sine-click.mp3', { volume: 0.5 });

  if (!user) {
    return (
      <>
        <Modal
        initialFocusRef={initialRef}
        isOpen={true}
        onClose={onClose}
        motionPreset='slideInBottom'
      >
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
        <ModalContent bg={bgColor}>
          <ModalHeader className='text-center text-3xl font-semibold text-gray-700 dark:text-gray-200 transition-color duration-150 ease-in'>
            Login
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col items-center'>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-stretch max-w-sm'
              >
                <label className='text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                  Email:{' '}
                  <input
                    ref={initialRef}
                    {...register('email', {
                      minLength: 1
                    })}
                    className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                  />
                </label>
                <label className='mt-3 text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                  Password:{' '}
                  <input
                    type='password'
                    {...register('password', {
                      minLength: 1
                    })}
                    className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                  />
                </label>
                <input
                  onClick={() => playSound()}
                  value='Login'
                  type='submit'
                  disabled={!isValid}
                  className='disabled:opacity-40 disabled:hover:scale-100 disabled:active:scale-100 text-gray-100 bg-fuchsia-600 px-6 py-2 mt-5 mb-2 rounded-md hover:scale-95 active:scale-90 transition-all ease duration-200'
                />
              </form>
              <span className='mt-6 mb-2'>Don`t have an account?
                <Link onClick={() => playSound()} href='/signup' className='ml-1 text-green-600 hover:text-green-500 ease-in duration-150 opacity-100'>
                  Create new account
                </Link>
              </span>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      </>
    );
  }

  return children;
}
