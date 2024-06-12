'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import CloseIcon from '@mui/icons-material/Close'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentsIcon from '@mui/icons-material/Payments'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import { Input } from '@/components/ui/input'

export interface Transaction {
  id: string
  amount: number
  category: string
  account: string
  isIncome: boolean
}

export default function Page({
  searchParams,
}: {
  searchParams?: {
    transactionId?: string
  }
}) {
  const [transaction, setTransaction] = useState<Transaction>({
    id: searchParams?.transactionId ?? '',
    amount: 100,
    category: 'Food',
    account: 'Checking',
    isIncome: false,
  })

  // TODO: Fetch transaction from database
  if (!searchParams?.transactionId) {
    return <div>No transaction ID</div>
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full py-4 bg-stone-800 ">
        <CloseIcon className="cursor-pointer text-primary-foreground ml-2" />
        <div className="flex flex-row border-2 border-stone-700 rounded-lg">
          <div
            className={`rounded-l-lg p-2 cursor-pointer ${transaction.isIncome ? 'bg-gray-200' : 'bg-stone-7000 text-primary-foreground'}`}
            onClick={() => setTransaction({ ...transaction, isIncome: true })}
          >
            Income
          </div>
          <div
            className={`rounded-r-lg p-2 cursor-pointer ${transaction.isIncome ? 'bg-stone-7000 text-primary-foreground' : 'bg-gray-200'}`}
            onClick={() => setTransaction({ ...transaction, isIncome: false })}
          >
            Expense
          </div>
        </div>
        <Button>Save</Button>
      </div>

      <div className="p-4">
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <AccountBalanceIcon className="mr-2" />
            Amount
          </div>
          <Input
            type="number"
            value={transaction.amount}
            className="w-20 text-right border-none focus:border-none"
            onChange={(e) =>
              setTransaction({
                ...transaction,
                amount: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <PaymentsIcon className="mr-2" />
            Category
          </div>
          <div>{transaction.category}</div>
        </div>
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <LocalAtmIcon className="mr-2" />
            Account
          </div>
          <div>{transaction.account}</div>
        </div>
        {transaction.isIncome ? (
          <div>
            <div>Income</div>
            <div>{transaction.amount}</div>
          </div>
        ) : null}
      </div>
    </>
  )
}
