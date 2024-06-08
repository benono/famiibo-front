'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import CloseIcon from '@mui/icons-material/Close'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentsIcon from '@mui/icons-material/Payments'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'

interface Transaction {
  amount: number
  category: string
  account: string
}

const DetailPage = () => {
  const [activeTab, setActiveTab] = useState('Income')

  const transaction: Transaction = {
    amount: 4200,
    category: activeTab === 'Income' ? 'Salary' : 'Rent',
    account: 'TD Bank',
  }
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full py-4 bg-stone-800 ">
        <CloseIcon className="cursor-pointer text-primary-foreground ml-2" />
        <div className="flex flex-row border-2 border-stone-700 rounded-lg">
          <div
            className={`rounded-l-lg p-2 cursor-pointer ${activeTab === 'Income' ? 'bg-gray-200' : 'bg-stone-7000 text-primary-foreground'}`}
            onClick={() => setActiveTab('Income')}
          >
            Income
          </div>
          <div
            className={`rounded-r-lg p-2 cursor-pointer ${activeTab === 'Expense' ? 'bg-gray-200' : 'bg-stone-7000 text-primary-foreground'}`}
            onClick={() => setActiveTab('Expense')}
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
          <div>{transaction.amount}</div>
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
      </div>
    </>
  )
}

export default DetailPage
