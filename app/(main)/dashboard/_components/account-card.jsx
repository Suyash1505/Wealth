"use client";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { setDefaultAccount } from "@/lib/api/account";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AccountCard = ({ account, refreshAccounts }) => {
  const { name, type, balance, _id, isDefault } = account;

  const formattedBalance = parseFloat(balance?.$numberDecimal || 0).toFixed(2);

  const {
    fn: updateDefaultFn,
    loading: updateDefaultLoading,
    data: updateAccount,
    error,
  } = useFetch(setDefaultAccount);

  const handleDefaultChange = async (event) => {
    event.preventDefault();

    if (isDefault) {
      toast.error("YOU NEED ATLEAST ONE DEFAULT ACCOUNT");
      return;
    }
    await updateDefaultFn(_id);
  };

  useEffect(() => {
    if (updateAccount?.success) {
      toast.success("DEFAULT ACCOUNT UPDATED SUCCESSFULLY!");
      refreshAccounts();
    }
  }, [updateAccount?.success]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "FAILED TO UPDATE ACCOUNT!");
    }
  }, [error]);
  return (
    <Link href={`/account/${_id}`}>
      <Card className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* subtle gradient highlight */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-50 to-indigo-50 transition"></div>
        <div className="relative p-5 z-10">
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
            <Switch
              checked={isDefault}
              onClick={(e) => {
                e.stopPropagation();
                handleDefaultChange(e);
              }}
              disabled={updateDefaultLoading}
            />
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
      </Card>
    </Link>
  );
};

export default AccountCard;
