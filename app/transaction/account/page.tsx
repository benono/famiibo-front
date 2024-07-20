'use client'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Button } from '@/components/ui/button'
import { Account } from '@/app/lib/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import apiClient from '@/app/lib/apiClient'
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { TransactionParams } from '@/app/lib/types'

export default function Page({
  searchParams,
}: {
  searchParams: TransactionParams
}) {
  const [accountList, setAccountList] = useState<Account[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiClient.get<Account[]>(`/accounts/`)
        if (response.data) {
          setAccountList(response.data)
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          router.push('/login')
          alert('You are not logged in.')
          return
        }
        alert('Error')
      }
    }
    fetchAccounts()
  }, [searchParams.accountId, router])

  useEffect(() => {
    const accountName = accountList.find(
      (account) => account.id === Number(searchParams.accountId),
    )?.name
    console.log(accountName)
  }, [accountList, searchParams.accountId])

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full py-4 bg-stone-800 ">
        <Link
          href={{
            pathname: '/transaction',
            query: { ...searchParams },
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
                ...searchParams,
                accountId: account.id,
                accountName: account.name,
                currencyId: account.currency?.id,
                currencyCode: account.currency?.code,
              },
            }}
            className="text-black"
          >
            <div className="flex flex-row items-center justify-between py-2 border-b border-stone-700">
              <div className="flex flex-row items-center justify-between">
                <AccountBalanceIcon className="mr-2" />
                {account.name}
              </div>
              {account.id === Number(searchParams.accountId) && (
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
