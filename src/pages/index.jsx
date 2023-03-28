import React, { useEffect, useState } from 'react'

import {Preloader} from '@/components/Preloader'
import {List} from '@/components/List'

import { useDispatch } from 'react-redux'
import { fetchItems } from '@/store/shopSlice'


export default function Home(props) {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)
  const [status, setStatus] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/medicines')
      const data = await response.json()
      console.log(data)

      if (data.status == '200') {
        dispatch(fetchItems({data}))
        setLoading(false)
        setStatus(200)
      } else if (data.status == '500') {
        setLoading(false)
        setStatus(500)
      }
    }

    fetchData();
  }, []);


  return (
    <>
      {
        isLoading
        ? <Preloader isLoading={isLoading} />
        : status == '200' ? <List /> : <h1 className='mt-5 text-2xl font-semibold text-center'>Data base error connection</h1>
      }
    </>
  )
}