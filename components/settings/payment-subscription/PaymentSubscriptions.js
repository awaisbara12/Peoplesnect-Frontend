import { ChevronDownIcon } from "@heroicons/react/outline";
import React from "react";

const PaymentSubscriptions = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">
              Payment & Subscriptions
            </div>
            <a href="payment-subscription/history">
              <div className="border bg-white mt-4 px-4 py-6 cursor-pointer rounded-xl">
                <div className="">History</div>
              </div>
            </a>
            <div className="flex items-center justify-between border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="">Upgrade</div>
              <div className="">
                <a
                  href=""
                  className="font-medium text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white  p-2 rounded-full"
                >
                  Upgrade
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSubscriptions;
