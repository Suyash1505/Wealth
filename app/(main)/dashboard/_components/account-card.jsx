import { Switch } from '@/components/ui/switch'
import {
Card,
CardHeader,
CardTitle,
CardContent,
CardFooter
} from '@/components/ui/card'

import React from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const AccountCard = ({ account }) => {

    const { name, type, balance, _id, isDefault } = account

    const formattedBalance = parseFloat(
    balance?.$numberDecimal || 0
    ).toFixed(2)

    return (

    <Card className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        {/* subtle gradient highlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50 to-indigo-50 transition"></div>
        <div className="relative p-5">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <div>

                    <h3 className="text-sm font-semibold text-gray-800 capitalize">
                    {name}
                    </h3>

                    <p className="text-xs text-gray-500 capitalize">
                    {type.toLowerCase()} account
                    </p>
                </div>
                <Switch checked={isDefault} />
            </div>

            {/* BALANCE */}
            <div className="mb-5">
                <div className="text-3xl font-bold text-gray-900">
                    ₹ {formattedBalance}
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1 text-green-500">
                    <ArrowUpRight className="h-4 w-4" />
                    Income
                </div>

                <div className="flex items-center gap-1 text-red-500">
                    <ArrowDownRight className="h-4 w-4" />
                    Expense
                </div>
            </div>
        </div>

        {/* clickable overlay */}
        <Link href={`/account/${_id}`} className="absolute inset-0" />
    </Card>
    )
}

export default AccountCard
