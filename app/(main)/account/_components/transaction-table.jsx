"use client"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { categoryColors } from "@/data/categories"

import { 
    Table, 
    TableBody, 
    TableCaption, 
    TableCell, TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"

import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger 
} from "@/components/ui/tooltip"
import { Clock } from "lucide-react"
import { format } from "date-fns"


const TransactionTable = ({ transactions }) => {

    const filteredAndSortedTransaction = transactions || [];
    const handleSorting = () => {
        
    }
    return (
        <div className="space-y-4">
            {/* FILTERS */}

            {/* TRANSACTION */}
            <div>
                <Table>
                    <TableCaption>
                        A list of your recent invoices.
                    </TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12.5">
                                <Checkbox/>
                            </TableHead>

                            <TableHead 
                                className="cursor-pointer"
                                onClick={() => handleSorting("date")}    
                            >
                                <div className="flex items-center">
                                    Date
                                </div>
                            </TableHead>

                            <TableHead>
                                Description
                            </TableHead>

                            <TableHead 
                                className="cursor-pointer"
                                onClick={() => handleSorting("category")}    
                            >
                                <div className="flex items-center">
                                    Category
                                </div>
                            </TableHead>

                            <TableHead 
                                className="cursor-pointer"
                                onClick={() => handleSorting("amount")}    
                            >
                               <div className="flex items-center justify-end">
                                    Amount
                                </div>
                            </TableHead>

                            <TableHead>
                                Recurring
                            </TableHead>

                            <TableHead className="w-12.5">
                               
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            filteredAndSortedTransaction.length === 0 
                            ? (
                                <TableRow 
                                    colSpan={7}
                                    className="text-center text-muted-foreground"
                                >
                                    <TableCell>
                                        No Transaction Found
                                    </TableCell>
                                </TableRow>
                            )
                            : (
                                filteredAndSortedTransaction.map( (transaction) => (
                                    <TableRow key={transaction._id}>
                                        <TableCell>
                                            <Checkbox/>
                                        </TableCell>

                                        <TableCell>
                                            {format(new Date(transaction.date), "PP")}
                                        </TableCell>

                                        <TableCell>
                                            {transaction.description}
                                        </TableCell>

                                        <TableCell className="capitalize">
                                            <span
                                                style={{
                                                    background: categoryColors[transaction.category] || "#999"
                                                }}
                                                className="px-2 py-1 text-sm text-white rounded-sm"
                                            >
                                                {transaction.category}
                                            </span>
                                        </TableCell>

                                        <TableCell 
                                            className="text-right font-medium"
                                            style={{
                                                color: transaction.type === "EXPENSE" ? "red" : "green",
                                            }}
                                        >
                                            {transaction.type === "EXPENSE" ? "-" : "+"}
                                            {parseFloat(
                                                transaction.amount?.$numberDecimal || transaction.amount
                                            ).toFixed(2)}
                                        </TableCell>

                                        <TableCell>
                                            {transaction.isRecurring 
                                            ? (
                                                <Tooltip>
                                                    <TooltipTrigger>Hover</TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Add to library</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            )
                                        : (
                                            <Badge>
                                                <Clock className="w-3 h-3"/>
                                                One-Time
                                            </Badge>
                                        )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TransactionTable
