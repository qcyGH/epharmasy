import React, { useEffect, useState } from 'react'

import {Preloader} from '@/components/Preloader'
import {List} from '@/components/List'

import { useDispatch } from 'react-redux'
import { fetchItems } from '@/store/shopSlice'


export default function Home(props) {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/data')
      const data = await response.json()
      console.log(data)

      if (data) {
        dispatch(fetchItems({data}))
        setLoading(false)
      }
    }

    fetchData();
  }, []);


  return (
    <>
      {
        isLoading ? <Preloader isLoading={isLoading} /> : <List />
      }
    </>
  )
}