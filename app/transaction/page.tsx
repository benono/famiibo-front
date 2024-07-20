'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentsIcon from '@mui/icons-material/Payments'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import StoreIcon from '@mui/icons-material/Store'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  TransactionInput,
  TransactionType,
  TransactionParams,
} from '@/app/lib/types'

import apiClient from '@/app/lib/apiClient'

export default function Page({
  searchParams,
}: {
  searchParams?: TransactionParams
}) {
  const [transaction, setTransaction] = useState<TransactionInput>({
    id: null,
    amount: null,
    accountId: 1,
    accountName: 'TD Bank',
    categoryId: 1,
    categoryName: 'Food',
    payeeId: 1,
    payeeName: 'Costco',
    currencyId: 1,
    currencyCode: 'USD',
    date: new Date().toISOString().split('T')[0],
    type: TransactionType.WITHDRAWAL,
    description: '',
  })

  const saveTransaction = async () => {
    try {
      const response = await apiClient.post(`/transactions`, transaction)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }
  const once = useRef(true)
  useEffect(() => {
    if (!once.current) return
    once.current = false
    if (searchParams?.transactionId) {
      // ここでデータベースからトランザクションをフェッチするロジックを追加
      // フェッチしたデータでsetTransactionを呼び出す
    }
    setTransaction({
      ...transaction,
      accountId: Number(searchParams?.accountId) ?? 1,
      accountName: searchParams?.accountName ?? 'TD Bank',
      currencyId: Number(searchParams?.currencyId) ?? 1,
      currencyCode: searchParams?.currencyCode ?? 'CAD',
      payeeId: Number(searchParams?.payeeId) ?? 1,
      payeeName: searchParams?.payeeName ?? 'Costco',
    })
  }, [searchParams, transaction])

  // TODO: Fetch transaction from database
  /* if (!searchParams?.transactionId) {
    return <div>No transaction ID</div>
  } */

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full py-4 bg-stone-800 ">
        <CloseIcon className="cursor-pointer text-primary-foreground ml-2" />
        <div className="flex flex-row border-2 border-stone-700 rounded-lg">
          <div
            className={`rounded-l-lg p-2 cursor-pointer ${transaction.type === TransactionType.WITHDRAWAL ? 'bg-stone-7000 text-primary-foreground' : 'bg-gray-200'}`}
            onClick={() =>
              setTransaction({
                ...transaction,
                type: TransactionType.WITHDRAWAL,
              })
            }
          >
            Income
          </div>
          <div
            className={`rounded-r-lg p-2 cursor-pointer ${transaction.type === TransactionType.WITHDRAWAL ? 'bg-gray-200' : 'bg-stone-7000 text-primary-foreground'}`}
            onClick={() =>
              setTransaction({
                ...transaction,
                type: TransactionType.WITHDRAWAL,
              })
            }
          >
            Expense
          </div>
        </div>
        <Button onClick={() => saveTransaction()}>Save</Button>
      </div>

      <div className="p-4">
        {/* Date */}
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <CalendarTodayIcon className="" />
            Date
          </div>
          <Input
            type="date"
            value={transaction.date}
            className="px-0 pl-12 w-40 text-base text-right border-none focus:border-none rounded-none outline-none bg-transparent"
            onChange={(e) =>
              setTransaction({
                ...transaction,
                date: e.target.value,
              })
            }
          />
        </div>

        {/* Amount */}
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <AccountBalanceIcon className="mr-2" />
            Amount
          </div>
          <Input
            type="number"
            value={transaction.amount ?? ''}
            placeholder="EX: 100"
            className="w-20 text-base text-right border-none focus:border-none rounded-none outline-none bg-transparent "
            onChange={(e) =>
              setTransaction({
                ...transaction,
                amount: parseInt(e.target.value),
              })
            }
          />
        </div>
        {/* Category */}
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <PaymentsIcon className="mr-2" />
            Category
          </div>
          <div className="flex flex-row items-center justify-between">
            <div>{transaction.categoryName}</div>
            <KeyboardArrowRightIcon />
          </div>
        </div>
        {/* Store(Payee) */}
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <Link
            href={{
              pathname: '/transaction/payee',
              query: { ...searchParams },
            }}
            className="flex flex-row w-full items-center justify-between"
          >
            <div>
              <StoreIcon className="mr-2" />
              Store
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>{transaction.payeeName}</div>
              <KeyboardArrowRightIcon />
            </div>
          </Link>
        </div>
        {/* Account */}
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <Link
            href={{
              pathname: '/transaction/account',
              query: { ...searchParams },
            }}
            className="flex flex-row w-full items-center justify-between"
          >
            <div>
              <LocalAtmIcon className="mr-2" />
              Account
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>{transaction.accountName}</div>
              <KeyboardArrowRightIcon />
            </div>
          </Link>
        </div>
        {/* input description */}
        <div className="pt-6 h-[30vh]">
          <Textarea
            value={transaction.description}
            className="w-full h-full"
            placeholder="Description"
            onChange={(e) =>
              setTransaction({
                ...transaction,
                description: e.target.value,
              })
            }
          />
        </div>
      </div>
    </>
  )
}
