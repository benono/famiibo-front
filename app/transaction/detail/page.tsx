'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import CloseIcon from '@mui/icons-material/Close'

const DetailPage = () => {
  const [activeTab, setActiveTab] = useState('Income')

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full p-4 bg-stone-800 ">
        <CloseIcon className="cursor-pointer text-primary-foreground" />
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
    </>
  )
}

export default DetailPage
