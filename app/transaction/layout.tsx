'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import CloseIcon from '@mui/icons-material/Close'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PaymentsIcon from '@mui/icons-material/Payments'
import LocalAtmIcon from '@mui/icons-material/LocalAtm'

interface Transaction {
  amount: number
  category: string
  account: string
  isIncome: boolean
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [transaction, setTransaction] = useState<Transaction>({
    amount: 0,
    category: '',
    account: '',
    isIncome: true,
  })
  return <>{children}</>
}
