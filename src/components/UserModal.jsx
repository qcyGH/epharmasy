import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import { CloseButton } from '@chakra-ui/react'
import { signout } from '@/store/userSlice'
import Login from './Login'

import useSound from 'use-sound'


export function UserModal(props) {
    const user = useSelector(state => state.user.user)
    const { show, closeModalOutside, closeModal } = props
    const rootUserModal = useRef(null)

    const [playSound] = useSound(
        '/sounds/sine-click.mp3',
        { volume: 0.5 }
    )

    const dispatch = useDispatch()

    useEffect(() => {
        if (!show) return

        const handleClick = (e) => {
            if (!rootUserModal.current) return
            if (!rootUserModal.current.contains(e.target)) {
                closeModalOutside(e)
            }
        }

        document.addEventListener('click', handleClick)

        return () => document.removeEventListener('click', handleClick)
    }, [rootUserModal, show, closeModal])

    if (!show) return null

    return (
        <>
            <div ref={rootUserModal}
                className='absolute bottom-10 md:bottom-[-1rem] right-0 md:translate-y-[100%] w-max py-2 pl-3 pr-4
                            bg-zinc-300/90 dark:bg-zinc-800/90 rounded-md backdrop-blur-xl backdrop-saturate-150
                            shadow-lg shadow-zinc-400/50 dark:shadow-zinc-900/50
                            text-zinc-900 dark:text-zinc-200
                            transition-color duration-300
                '>
                {
                    user ? <div className='flex flex-col items-start pl-1 pr-6 pt-2 pb-1'>
                                <span className='text-lg text-zinc-700 leading-none dark:text-zinc-300 ease-in duration-150'>
                                    {user}
                                </span>
                                <button onClick={() => dispatch(signout())} className='opacity-100 font-semibold bg-[#edf2f7] hover:bg-[#e2e8f0] dark:bg-[#ffffff14] dark:hover:bg-[#ffffff29] rounded-md px-3 py-2 mt-4 duration-200'>
                                    Sign out
                                </button>
                            </div> : <div className='flex flex-col items-start pl-1 pr-4 pt-2 pb-1'>
                                <Link onClick={() => playSound()} href='/signup' className='opacity-100 font-semibold bg-[#edf2f7] hover:bg-[#e2e8f0] dark:bg-[#ffffff14] dark:hover:bg-[#ffffff29] rounded-md px-3 py-2 mb-3 duration-200'>Sign Up</Link>
                                <Login />
                            </div>
                }
                <span className='absolute top-1 right-1'>
                    <CloseButton
                        size='sm'
                        bg='transparent'
                        _active={{ bg: 'transparent' }}
                        _hover={{ bg: 'transparent' }}
                        w='10px' h='10px' p='11px'
                        aria-label='close modal'
                        onClick={(e) => closeModal(e)}
                    >
                    </CloseButton>
                </span>
            </div>
        </>
    )
}