'use client'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button } from '@/components/ui/button'
import { Store } from '@/app/lib/util/definitions'

import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Page({
  searchParams,
}: {
  searchParams: { selectedPayee: string; transactionId: string }
}) {
  // TODO
  //const accountList = await fetchAccountList()

  const [storeList, setStoreList] = useState<Store[]>([])

  useEffect(() => {
    const fetchPayeeList = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/payees`,
      )
      setStoreList(response.data)
    }
    fetchPayeeList()
  }, [])

  //   [
  //     { id: 1, name: 'TD Bank' },
  //     { id: 2, name: '三井住友銀行' },
  //     { id: 3, name: 'SONY銀行' },
  //   ]

  const payeeId = searchParams.selectedPayee

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full py-4 bg-stone-800 ">
        <Link
          href={{
            pathname: '/transaction',
            query: { transactionId: searchParams.transactionId },
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
                transactionId: searchParams.transactionId,
                selectedStore: store.id,
              },
            }}
            className="text-black"
          >
            <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
              <div className="flex flex-row items-center justify-between">
                <AccountBalanceIcon className="mr-2" />
                {store.name}
              </div>
              {/* TODO FIX TO ID */}
              {/* {account.name === accountId && ( */}
              {store.id === Number(payeeId) && (
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
