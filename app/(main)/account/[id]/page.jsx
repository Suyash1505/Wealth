"use client"

import useFetch from '@/hooks/useFetch'
import { getAccountDetails } from '@/lib/api/account'
import React, { Suspense, useEffect } from 'react'
import { useParams } from 'next/navigation'
import TransactionTable from '../_components/transaction-table'
import { BarLoader } from 'react-spinners'

const AccountsPage = () => {

  const params = useParams();
  const accountId = params.id;

  const {
    data: account,
    loading,
    fn: getAccountFn,
    error,
  } = useFetch(getAccountDetails)

  useEffect(() => {
    if(accountId){
      getAccountFn(accountId)
    }
  }, [accountId])

  return (
    <div className='space-y-8 px-5'>
      <div>
        <div>
          <h1 className='text-5xl sm:text-6xl font-bold gradient-title capitalize'>
            {account?.name}
          </h1>

          <p className='text-muted-foreground'>
            {account?.type &&
              account.type.charAt(0) + account.type.slice(1).toLowerCase()
            } Account
          </p>
        </div>

        <div className='text-right pb-2'>
          <div className='text-xl sm:text-2xl font-bold'>
            ₹ {
              account?.balance
                ? parseFloat(account.balance?.$numberDecimal || account.balance).toFixed(2)
                : "0.00"
            }
          </div>
          <p className='text-sm text-muted-foreground'>
            {account?.transactionCount || 0} Transactions
          </p>
        </div>
      </div>

      {/* CHART SECTION */}

      {/* TRANSACTION TABLE */}
      <Suspense
        fallback={
          <BarLoader
            className='mt-4'
            width={"100%"}
            color='#9333ea'
          />
        }
      >
        <TransactionTable transactions={account?.transactions || []} />
      </Suspense>
    </div>
  )
}

export default AccountsPage