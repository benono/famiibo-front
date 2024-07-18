'use client'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { Account } from '@/app/lib/types'
import apiClient from '@/app/lib/apiClient'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const totalAmount = 7000
  // 負債
  const debt = 1000
  // 収入
  const income = 5000
  // 今月収支
  const monthlyBalance = income - debt

  const router = useRouter()
  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await apiClient.get('/accounts', {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
          },
        })
        setAccounts(res.data)
      } catch (error) {
        console.error(error)
        router.push('/login')
      }
    }
    getAccounts()
  }, [])

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-full py-2 bg-stone-800 ">
        <Button>修正</Button>
        <h2 className="p-0 text-xl font-bold text-primary-foreground border-none">
          アカウント
        </h2>
        <Button>追加</Button>
      </div>
      {/* overview */}
      <div className="w-full py-2 bg-primary-foreground">
        <div className="flex flex-col items-center justify-between pb-3 border-b-[0.8px] border-stone-600">
          <div
            className={cn(
              totalAmount < 0 ? 'text-red-600' : 'text-green-600',
              'text-xl',
            )}
          >
            {totalAmount}
          </div>
          <div className="text-xs">総資産</div>
        </div>
        <div className="flex flex-row items-center justify-between w-[80%] mx-auto pt-3">
          <div className="flex flex-col items-center justify-between">
            <div
              className={cn(
                income < 0 ? 'text-red-600' : 'text-green-600',
                'text-xl',
              )}
            >
              {income}
            </div>
            <div className="text-xs">収入</div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="text-red-600 text-xl">{debt}</div>
            <div className="text-xs">支出</div>
          </div>
          <div className="flex flex-col items-center justify-between">
            <div
              className={cn(
                monthlyBalance < 0 ? 'text-red-600' : 'text-green-600',
                'text-xl',
              )}
            >
              {monthlyBalance}
            </div>
            <div className="text-xs">今月収支</div>
          </div>
        </div>
      </div>
      {/* アカウント一覧 */}
      <h3 className="m-2 p-0 text-l text-primary-700 border-none">
        アカウント一覧
      </h3>
      <div className="p-0 m-0 list-none bg-primary-foreground">
        {accounts.map((account: Account) => (
          <div
            key={account.id}
            className="m-1 py-2 border-b-[0.8px] text-l text-primary-700 flex justify-between border-stone-600"
          >
            <div className="flex flex-row items-center gap-2">
              <AccountBalanceIcon className="text-stone-600" />
              <div>
                <div className="text-sm">{account.name}</div>
                <div className="text-xs">{account.currency.code}</div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <span
                className={
                  account.balance < 0 ? 'text-red-600' : 'text-green-600'
                }
              >
                {account.balance}
              </span>{' '}
              <KeyboardArrowRightIcon className="text-stone-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
