// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Currency = {
    id: string;
    name: string;
    code: string;
    symbol: string;
  };

  export type Family = {
    id: string;
    name: string;
  };

  export type User = {
    id: string;
    name: string;
    email: string;
    family_id: string;
    password: string;
  };
  
  export type Account = {
    id: string;
    name: string;
    currency_id: string;
  };

  export type Category = {
    id: string;
    name: string;
    is_expense: boolean;
  };
  
  // Add the Transaction type definition
  export type Transaction = {
    id: string;
    amount: number;
    category: string;
    account: string;
    store: string;
    date: Date;
    is_expense: boolean;
  };

