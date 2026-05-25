"use client";

import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerTitle,
  DrawerTrigger,
  DrawerHeader,
  DrawerContent,
  DrawerClose,
} from "./ui/drawer";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/lib/schema";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "./ui/select";

import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import useFetch from "@/hooks/useFetch";
import { createAccount } from "@/lib/api/account";
import { toast } from "react-toastify";

const CreateAccountDrawer = ({ children, refreshAccounts }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: 0,
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    fn: createAccountFn,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  const onSubmit = async (data) => {
    console.log(data);
    await createAccountFn(data);
  };

  useEffect(() => {
    if (newAccount) {
      toast.success("ACCOUNT CREATED SUCCESSFULLY!");
      refreshAccounts();
      reset();
      setOpen(false);
    }
  }, [reset, newAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "FAILED TO CREATE AN ACCOUNT");
    }
  }, [error]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="mx-auto overflow-hidden rounded-t-[2.5rem] border border-teal-500/15 bg-[#0b1d36]/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(45,212,191,0.10)]">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/50 to-transparent" />

        <DrawerHeader className="border-b border-white/5 px-6 pb-6 pt-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-10 bg-teal-400" />

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              New Account
            </span>
          </div>

          <DrawerTitle className="text-4xl font-black tracking-tight text-white">
            Create{" "}
            <span className="bg-linear-to-r from-teal-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
              Account
            </span>
          </DrawerTitle>

          <p className="mt-4 max-w-md text-base leading-8 text-slate-400">
            Add a new financial account to track balances and transactions.
          </p>
        </DrawerHeader>

        {/* FORM */}
        <div className="px-6 pb-8 pt-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {/* ACCOUNT NAME */}
            <div className="space-y-3">
              <label
                htmlFor="name"
                className="text-sm font-semibold tracking-wide text-slate-300"
              >
                Account Name
              </label>

              <Input
                id="name"
                placeholder="e.g. Main Checking"
                {...register("name")}
                className="h-14 rounded-2xl border border-white/10 bg-white/3 px-5 text-base text-white placeholder:text-slate-500 focus:border-teal-400/30 focus:ring-0"
              />

              {errors.name && (
                <p className="text-sm font-medium text-rose-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* ACCOUNT TYPE */}
            <div className="space-y-3">
              <label
                htmlFor="type"
                className="text-sm font-semibold tracking-wide text-slate-300"
              >
                Account Type
              </label>

              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValue={watch("type")}
              >
                <SelectTrigger
                  id="type"
                  className="h-14 w-full rounded-2xl border border-white/10 bg-white/3 px-5 text-base text-white focus:border-teal-400/30 focus:ring-0"
                >
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent className="rounded-2xl border border-teal-500/15 bg-[#0b1d36] text-white backdrop-blur-2xl">
                  <SelectGroup>
                    <SelectItem
                      value="CURRENT"
                      className="rounded-xl focus:bg-teal-500/10 focus:text-teal-300"
                    >
                      Current
                    </SelectItem>

                    <SelectItem
                      value="SAVING"
                      className="rounded-xl focus:bg-teal-500/10 focus:text-teal-300"
                    >
                      Saving
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm font-medium text-rose-400">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* INITIAL BALANCE */}
            <div className="space-y-3">
              <label
                htmlFor="balance"
                className="text-sm font-semibold tracking-wide text-slate-300"
              >
                Initial Balance
              </label>

              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("balance")}
                className="h-14 rounded-2xl border border-white/10 bg-white/3 px-5 text-base text-white placeholder:text-slate-500 focus:border-teal-400/30 focus:ring-0"
              />

              {errors.balance && (
                <p className="text-sm font-medium text-rose-400">
                  {errors.balance.message}
                </p>
              )}
            </div>

            {/* DEFAULT ACCOUNT */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-5 py-5 backdrop-blur-xl">
              <div>
                <label
                  htmlFor="isDefault"
                  className="text-base font-semibold text-white cursor-pointer"
                >
                  Set As Default
                </label>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  This account will automatically be selected for future
                  transactions.
                </p>
              </div>

              <Switch
                id="isDefault"
                checked={watch("isDefault")}
                onCheckedChange={(checked) => setValue("isDefault", checked)}
              />
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-4">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="h-14 flex-1 rounded-2xl border border-white/10 bg-white/3 text-base font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-teal-400/20 hover:bg-teal-500/10 hover:text-teal-300"
                >
                  Cancel
                </Button>
              </DrawerClose>

              <Button
                type="submit"
                disabled={createAccountLoading}
                className="h-14 flex-1 rounded-2xl border border-teal-300/20 bg-linear-to-r from-teal-400 via-emerald-400 to-lime-400 text-base font-bold text-[#04111f] shadow-[0_0_35px_rgba(45,212,191,0.25)] transition-all duration-500 hover:shadow-[0_0_55px_rgba(45,212,191,0.40)]"
              >
                {createAccountLoading ? "Creating..." : "Create Account"}
              </Button>
            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
