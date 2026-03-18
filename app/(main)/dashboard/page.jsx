"use client"

import React, { useEffect, useState } from 'react'
import CreateAccountDrawer from '@/components/Create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { getUserAccount } from '@/lib/api/account'
import AccountCard from './_components/account-card'

const DashboardPage = () => {
    const [accounts, setAccounts] = useState([])

    const fetchAccounts = async () => {
        try {
            const data = await getUserAccount()
            setAccounts(data)
        } 
        catch (error) {
            console.error(error)
        }
    }

    useEffect( () => {
        fetchAccounts()
    }, [])


    // TOTAL BALANCE CALCULATION
    const totalBalance = accounts.reduce((acc, curr) => {
        return acc + parseFloat(curr.balance?.$numberDecimal || 0)
    }, 0)

    return (
        <div className="container mx-auto px-4 py-8 space-y-10">

        {/* PAGE HEADER */}
        <div>
            <p className="text-gray-500 mt-1">
            Manage your accounts and track your finances
            </p>
        </div>


        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TOTAL BALANCE */}
            <Card className="p-5 rounded-2xl shadow-sm hover:shadow-lg transition">
                <p className="text-sm text-gray-500 mb-1">
                    Total Balance
                </p>
                <h2 className="text-2xl font-bold">
                    ₹ {totalBalance.toFixed(2)}
                </h2>
            </Card>


            {/* TOTAL ACCOUNTS */}
            <Card className="p-5 rounded-2xl shadow-sm hover:shadow-lg transition">
                <p className="text-sm text-gray-500 mb-1">
                    Total Accounts
                </p>

                <h2 className="text-2xl font-bold">
                    {accounts.length}
                </h2>
            </Card>


            {/* ACTIVE ACCOUNT */}
            <Card className="p-5 rounded-2xl shadow-sm hover:shadow-lg transition">
                <p className="text-sm text-gray-500 mb-1">
                    Default Account
                </p>

                <h2 className="text-lg font-semibold capitalize">
                    {accounts.find(acc => acc.isDefault)?.name || "None"}
                </h2>
            </Card>

        </div>


        {/* 🔥 ACCOUNT GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {/* ADD ACCOUNT CARD */}
            <CreateAccountDrawer>
                <div className="flex flex-col items-center justify-center gap-2 h-[150px]
                    rounded-2xl border-2 border-dashed border-gray-300
                    hover:border-blue-500 hover:bg-blue-50
                    transition cursor-pointer group"
                >

                    <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition" />

                    <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600">
                    Add New Account
                    </p>

                </div>
            </CreateAccountDrawer>

                {/* ACCOUNT LIST */}
                {
                accounts.length > 0 ? (
                    accounts.map((account) => (
                    <AccountCard 
                        key={account._id} 
                        account={account} 
                        refreshAccounts={fetchAccounts}
                    />
                    ))
                ) : (

                // EMPTY STATE
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-gray-500 mb-3">
                        No accounts found
                    </p>

                    <p className="text-sm text-gray-400">
                        Start by adding your first account
                    </p>
                </div>

                )}
            </div>
        </div>
    )
}

export default DashboardPage
