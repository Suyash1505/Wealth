'use client'

import { useEffect, useState } from "react"
import {
Drawer,
DrawerTitle,
DrawerTrigger,
DrawerHeader,
DrawerContent,
DrawerClose
} from "./ui/drawer"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { accountSchema } from "@/lib/schema"

import { Input } from "./ui/input"

import {
Select,
SelectContent,
SelectTrigger,
SelectGroup,
SelectItem,
SelectValue
} from "./ui/select"

import { Switch } from "./ui/switch"
import { Button } from "./ui/button"
import useFetch from "@/hooks/useFetch"
import { createAccount } from "@/lib/api/account"
import { toast } from "react-toastify"

const CreateAccountDrawer = ({ children }) => {

    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset
        } = useForm({
            resolver: zodResolver(accountSchema),
            defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        }
    })

    const {
        data: newAccount,
        error,
        fn: createAccountFn,
        loading: createAccountLoading,
    } = useFetch(createAccount);

    const onSubmit = async (data) => {
        console.log(data)
        await createAccountFn(data);
    }

    useEffect( () => {
        if(newAccount){
            toast.success("ACCOUNT CREATED SUCCESSFULLY!");
            reset();
            setOpen(false);
        }
    }, [reset, newAccount])

    useEffect(() => {
        if (error) {
            toast.error(error.message || "FAILED TO CREATE AN ACCOUNT");
        }
    }, [error]);

return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            {children}
        </DrawerTrigger>


        <DrawerContent className="max-w-lg mx-auto">

            {/* HEADER */}
            <DrawerHeader className="border-b border-gray-100 pb-4">
                <DrawerTitle className="text-xl font-semibold">
                    Create New Account
                </DrawerTitle>

                <p className="text-sm text-gray-500">
                    Add a new financial account to track your balance and transactions.
                </p>
            </DrawerHeader>


            {/* FORM */}
            <div className="px-6 pb-6 pt-4">
            <form
                className="space-y-5"
                onSubmit={handleSubmit(onSubmit)}
            >

                {/* ACCOUNT NAME */}
                <div className="space-y-2">

                <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                >
                    Account Name
                </label>

                <Input
                    id="name"
                    placeholder="e.g., Main Checking"
                    {...register("name")}
                />

                {errors.name && (
                    <p className="text-sm text-red-500">
                    {errors.name.message}
                    </p>
                )}

                </div>


                {/* ACCOUNT TYPE */}
                <div className="space-y-2">
                    <label
                        htmlFor="type"
                        className="text-sm font-medium text-gray-700"
                    >
                        Account Type
                    </label>

                    <Select
                        onValueChange={(value) => setValue("type", value)}
                        defaultValue={watch("type")}
                    >

                        <SelectTrigger id="type" className="w-full">
                        <SelectValue placeholder="Select Type" />
                        </SelectTrigger>

                        <SelectContent>
                        <SelectGroup>
                            <SelectItem value="CURRENT">Current</SelectItem>
                            <SelectItem value="SAVING">Saving</SelectItem>
                        </SelectGroup>
                        </SelectContent>

                    </Select>

                    {errors.type && (
                        <p className="text-sm text-red-500">
                        {errors.type.message}
                        </p>
                    )}
                </div>


                {/* INITIAL BALANCE */}
                <div className="space-y-2">
                    <label
                        htmlFor="balance"
                        className="text-sm font-medium text-gray-700"
                    >
                        Initial Balance
                    </label>

                    <Input
                        id="balance"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("balance")}
                    />

                    {errors.balance && (
                        <p className="text-sm text-red-500">
                        {errors.balance.message}
                        </p>
                    )}
                </div>


                {/* DEFAULT ACCOUNT */}
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                    <div>

                        <label
                        htmlFor="isDefault"
                        className="text-sm font-medium cursor-pointer"
                        >
                        Set As Default
                        </label>

                        <p className="text-xs text-gray-500">
                        This account will be selected by default for transactions.
                        </p>
                    </div>

                    <Switch
                        id="isDefault"
                        checked={watch("isDefault")}
                        onCheckedChange={(checked) =>
                        setValue("isDefault", checked)
                        }
                    />
                </div>


                {/* BUTTONS */}
                <div className="flex gap-3 pt-2">
                    <DrawerClose asChild>
                        <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        >
                        Cancel
                        </Button>
                    </DrawerClose>

                    <Button
                        type="submit"
                        className="flex-1"
                        disabled={createAccountLoading}
                        >
                        {createAccountLoading ? "Creating..." : "Create Account"}
                    </Button>
                </div>
            </form>
            </div>
        </DrawerContent>
    </Drawer>
    )
}

export default CreateAccountDrawer
