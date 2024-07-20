'use client'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button } from '@/components/ui/button'
import { Store } from '@/app/lib/util/definitions'

import Link from 'next/link'
import apiClient from '@/app/lib/apiClient'
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { TransactionParams } from '@/app/lib/types'

export default function Page({
  searchParams,
}: {
  searchParams: TransactionParams
}) {
  const [storeList, setStoreList] = useState<Store[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPayeeList = async () => {
      try {
        const response = await apiClient.get(`/payees/`)
        setStoreList(response.data)
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          router.push('/login')
          alert('You are not logged in.')
          return
        }
        alert('Error')
      }
    }
    fetchPayeeList()
  }, [])

  const payeeId = searchParams.payeeId

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full py-4 bg-stone-800 ">
        <Link
          href={{
            pathname: '/transaction',
            query: { ...searchParams },
          }}
          className="text-white"
        >
          <ArrowBackIosIcon className="cursor-pointer text-primary-foreground ml-2" />
          Back
        </Link>
        <div className="flex flex-row border-2 border-stone-700 rounded-lg"></div>
        <Button>Edit</Button>
      </div>
      <div className="p-4">
        {storeList.map((store) => (
          <Link
            key={store.id}
            href={{
              pathname: '/transaction',
              query: {
                ...searchParams,
                payeeId: store.id,
                payeeName: store.name,
              },
            }}
            className="text-black"
          >
            <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
              <div className="flex flex-row items-center justify-between">
                <AccountBalanceIcon className="mr-2" />
                {store.name}
              </div>
              {store.id === Number(searchParams.payeeId) && (
                <div>
                  <CheckIcon />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
