import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useClients } from '@/hooks/useDB'
import axios from 'axios'

import { useDispatch } from "react-redux"
import { signin } from "@/store/userSlice"

import useSound from 'use-sound'

export default function SignUp() {

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({ mode: 'onBlur'})

    const notification = useToast()
    const dispatch = useDispatch()
    const [clients, getClients] = useClients()


    const onSubmit = async (data) => {

        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            password
        } = data

        // used because "useState" troubleshooting: https://react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value
        let sameClient = false

        // creating client
        const createUser = async (firstName, lastName, email, phoneNumber, password) => {

            const response = await axios.post('/api/createUser', {
                firstName,
                lastName,
                email,
                phoneNumber,
                password
            })

            //* success notification
            notification({
                title: 'Successfully created new account',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            // auto login
            const user = firstName
            const id = await getClientId(email)

            dispatch(signin({ user, id }))
            // auto login
        }

        const getClientId = async (email) => {
            const clients = await getClients()
            let id = 0

            if (clients.status == '200') {
                clients.data.forEach(client => {

                    if (client.email == email) {
                        id = client.client_id
                    }
                })
            } else if (clients.status == '500') {
                console.error('Database connection error')
            }

            return id
        }

        try {

            // checking for clients with same email or phone number
            await clients.data.forEach(client => {

                if (client.email == email || client.phone_number == phoneNumber) {
                    sameClient = true

                }
            })

            if (!sameClient) {

                // use function for creating new client
                await createUser(firstName, lastName, email, phoneNumber, password)
            } else {

                // error notification
                notification({
                    title: 'Client with same email or phone number already in database',
                    status: 'error',
                    duration: 3000,
                    isClosable: false,
                })
            }


            reset()
        } catch(error) {
            console.error(error)
        }
      }

      const [playSound] = useSound('/sounds/sine-click.mp3', { volume: 0.5 })

    return (
        <>
            <h1 className='mt-5 text-2xl font-semibold text-center'>Sign Up</h1>

            <div className='flex flex-col items-center'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col items-stretch max-w-sm mt-8 mb-4'
                >
                    <label className='dark:font-medium text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                    First name:{' '}
                        <input
                            type='text'
                            {...register('firstName', {
                                required: 'This label is required',
                                maxLength: {
                                    value: 255,
                                    message: 'Too long first name'
                                }
                            })}
                            className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                        />
                    </label>
                    {
                        errors?.firstName && <span className='mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-semibold'>
                                                {errors?.firstName?.message || 'Error!'}
                                            </span>
                    }

                    <label className='mt-3 dark:font-medium text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                    Last name:{' '}
                        <input
                            type='text'
                            {...register('lastName', {
                                required: 'This label is required',
                                maxLength: {
                                    value: 255,
                                    message: 'Too long last name'
                                }
                            })}
                            className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                        />
                    </label>
                    {
                        errors?.lastName && <span className='mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-semibold'>
                                                {errors?.lastName?.message || 'Error!'}
                                            </span>
                    }

                    <label className='mt-3 dark:font-medium text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                    Email:{' '}
                        <input
                            type='email'
                            {...register('email', {
                                required: 'This label is required',
                                pattern: {
                                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: 'Wrong email'
                                }
                            })}
                            className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                        />
                    </label>
                    {
                        errors?.email && <span className='mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-semibold'>
                                                {errors?.email?.message || 'Error!'}
                                            </span>
                    }

                    <label className='mt-3 dark:font-medium text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                    Phone number:{' '}
                        <input
                            {...register('phoneNumber', {
                                required: 'This label is required',
                                pattern: {
                                    value: /[0-9]{10}/,
                                    message: 'Wrong phone number'
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Minimum phone number length is 10'
                                },
                                maxLength: {
                                    value: 13,
                                    message: 'Maximum phone number length is 13'
                                }
                            })}
                            className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                        />
                    </label>
                    {
                        errors?.phoneNumber && <span className='mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-semibold'>
                                                {errors?.phoneNumber?.message || 'Error!'}
                                            </span>
                    }

                    <label className='mt-3 dark:font-medium text-zinc-50 dark:text-zinc-800 bg-zinc-800 dark:bg-zinc-50 rounded-lg px-3 transition-all duration-150 ease-in'>
                    Password:{' '}
                        <input
                            type='password'
                            {...register('password', {
                                required: 'This label is required',
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                    message: 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                                }
                            })}
                            className='text-zinc-50 dark:text-zinc-800 bg-transparent rounded-lg border-none outline-none py-1 px-2 focus:border-none focus:shadow-none focus:ring-0 focus-visible:outline-none transition-color duration-150 ease-in'
                        />
                    </label>
                    {
                        errors?.password && <span className='mt-1 ml-2 text-sm text-red-600 dark:text-red-500 font-semibold'>
                                                {errors?.password?.message || 'Error!'}
                                            </span>
                    }

                    <input
                        onClick={() => playSound()}
                        value='Sign Up'
                        type='submit'
                        disabled={!isValid}
                        className='disabled:opacity-40 disabled:hover:scale-100 disabled:active:scale-100 text-gray-100 bg-fuchsia-600 px-6 py-2 mt-4 mb-2 rounded-md hover:scale-95 active:scale-90 transition-all ease duration-200'
                    />
                </form>
            </div>
        </>
    )
}