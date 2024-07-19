'use client'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { Account } from '@/app/lib/types'
import apiClient from '@/app/lib/apiClient'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Calendar } from '@/components/ui/calendar'
import { Transaction } from '@/app/lib/types'

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<number | undefined>(date?.getMonth())
  const [mode, setMode] = useState<'calendar' | 'list'>('calendar')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const router = useRouter()

  useEffect(() => {
    const getHasTransactionDates = async () => {
      const month = date?.getMonth()
      const year = date?.getFullYear()
      const res = await apiClient.get(`/transactions/dates/${year}-${month}`, {
        withCredentials: true,
      })
      console.log(res.data)
    }
    getHasTransactionDates()
  }, [])

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const dataParam = date ? new Date(date).toISOString().split('T')[0] : ''
        const res = await apiClient.get(`/transactions/?date=${dataParam}`, {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
        setTransactions(res.data)
      } catch (error) {
        console.error(error)
        //router.push('/login')
      }
    }
    getTransactions()
  }, [date])

  const monthChange = (month: Date) => {
    setMonth(month.getMonth())
    console.log(month.getMonth())
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full py-2 bg-stone-800 ">
        <Button>修正</Button>
        <h2 className="p-0 text-xl font-bold text-primary-foreground border-none">
          Transaction
        </h2>
        <Button>追加</Button>
      </div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        onMonthChange={monthChange}
        hideDays={mode === 'list'}
        className="rounded-md border bg-primary-foreground flex justify-center items-center"
      />
      <div className="p-0 m-0 list-none bg-primary-foreground">
        {transactions.map((transaction: Transaction) => (
          <div
            key={transaction.id}
            className="m-1 py-2 border-b-[0.8px] text-l text-primary-700 flex justify-between border-stone-600"
          >
            <div className="flex flex-row items-center gap-2">
              {/* FIXME: アイコンをカテゴリに合わせる */}
              <AccountBalanceIcon className="text-stone-600" />
              <div>
                <div className="text-sm">{transaction.category?.name}</div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <span
                className={
                  transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                }
              >
                {transaction.amount}
              </span>{' '}
              <KeyboardArrowRightIcon className="text-stone-600" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-between w-full py-2 ">
        <Button>修正</Button>

        <Button>追加</Button>
      </div>
    </div>
  )
}
