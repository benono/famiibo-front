export interface Account {
  id: string
  name: string
  balance: number
  currency: Currency
}

export interface Accounts {
  accounts: Account[]
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Currency {
  id: number
  code: string
  name: string
}

export interface Category {
  id: number
  order: number
  name: string
  familyId: number
  family: Family | null
  createById: number
  createBy: User | null
}

export interface Family {
  id: number
  name: string
}

export interface Payee {
  id: number
  name: string
  familyId: number
  family: Family | null
  createById: number
  createBy: User | null
}

export interface Transaction {
  id: number
  amount: number
  type: TransactionType
  date: string
  description: string
  userId: number
  user: User | null
  accountId: number
  account: Account | null
  currencyId: number
  currency: Currency | null
  categoryId: number
  category: Category | null
  payeeId: number
  payee: Payee | null
}

export interface TransactionInput {
  id: number | null
  amount: number | null
  type: TransactionType
  date: string
  description: string
  accountId: number
  accountName: string
  currencyId: number
  currencyCode: string
  categoryId: number
  categoryName: string
  payeeId: number
  payeeName: string
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
}
