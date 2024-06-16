'use client'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button } from '@/components/ui/button'
import { Account } from '@/app/lib/util/definitions'

import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Page({
  searchParams,
}: {
  searchParams: { selectedAccount: string; transactionId: string }
}) {
  // TODO
  //const accountList = await fetchAccountList()
  const fetchPayeeList = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payees`,
    )
    return response.data
  }

  const fetchAccountList = async () => {
    const response = await axios.get<Account[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/accounts`,
    )
    return response.data
  }

  const [accountList, setAccountList] = useState<Account[]>([])

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await fetchAccountList()
      setAccountList(accounts)
    }

    fetchAccounts()
  }, [])

  //   [
  //     { id: 1, name: 'TD Bank' },
  //     { id: 2, name: '三井住友銀行' },
  //     { id: 3, name: 'SONY銀行' },
  //   ]

  const accountId = searchParams.selectedAccount
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
        {accountList.map((account) => (
          <Link
            key={account.id}
            href={{
              pathname: '/transaction',
              query: {
                transactionId: searchParams.transactionId,
                selectedAccount: account.id,
              },
            }}
            className="text-black"
          >
            <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
              <div className="flex flex-row items-center justify-between">
                <AccountBalanceIcon className="mr-2" />
                {account.name}
              </div>
              {/* TODO FIX TO ID */}
              {/* {account.name === accountId && ( */}
              {account.name === accountId && (
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
