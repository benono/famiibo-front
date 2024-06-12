'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import CloseIcon from '@mui/icons-material/Close'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentsIcon from '@mui/icons-material/Payments'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'
import StoreIcon from '@mui/icons-material/Store'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Input } from '@/components/ui/input'
import { Transaction } from '@/app/lib/util/definitions'

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
    store: 'Costco',
    date: new Date('2024-03-15'),
    is_expense: false,
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
            className={`rounded-l-lg p-2 cursor-pointer ${transaction.is_expense ? 'bg-stone-7000 text-primary-foreground' : 'bg-gray-200'}`}
            onClick={() =>
              setTransaction({ ...transaction, is_expense: false })
            }
          >
            Income
          </div>
          <div
            className={`rounded-r-lg p-2 cursor-pointer ${transaction.is_expense ? 'bg-gray-200' : 'bg-stone-7000 text-primary-foreground'}`}
            onClick={() => setTransaction({ ...transaction, is_expense: true })}
          >
            Expense
          </div>
        </div>
        <Button>Save</Button>
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
            value={transaction.date?.toISOString().split('T')[0]}
            className="px-0 pl-12 w-40 text-base text-right border-none focus:border-none rounded-none outline-none bg-transparent"
            onChange={(e) =>
              setTransaction({
                ...transaction,
                date: new Date(e.target.value),
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
            value={transaction.amount}
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
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <PaymentsIcon className="mr-2" />
            Category
          </div>
          <div>{transaction.category}</div>
        </div>
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <StoreIcon className="mr-2" />
            Store
          </div>
          <div>{transaction.store}</div>
        </div>
        <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
          <div>
            <LocalAtmIcon className="mr-2" />
            Account
          </div>
          <div>{transaction.account}</div>
        </div>

        <div>
          <div>{transaction.is_expense ? 'Expense' : 'Income'}</div>
          <div>{transaction.amount}</div>
          <div>{transaction.date?.toLocaleDateString()}</div>
        </div>
      </div>
    </>
  )
}