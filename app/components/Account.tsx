'use client'

import { useState } from 'react'
import apiClient from '../lib/apiClient'

const AccountType = {
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  CASH: 'CASH',
  CREDIT: 'CREDIT',
  INVESTMENT: 'INVESTMENT',
} as const

type AccountType = (typeof AccountType)[keyof typeof AccountType]

export const Account: React.FC = () => {
  const [accountName, setAccountName] = useState<string>('')
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.CHECKING,
  )

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    alert('Add Account')
    await apiClient.post('/accounts/', {
      name: accountName,
      type: accountType,
    })
  }
  return (
    <div>
      <h1>Account</h1>
      <div className="flex flex-col gap-2">
        <select
          value={accountType}
          onChange={(e) => setAccountType(e.target.value as AccountType)}
        >
          {Object.values(AccountType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <button onClick={handleClick}>Add Account</button>
      </div>
    </div>
  )
}
