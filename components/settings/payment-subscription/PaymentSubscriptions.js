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
            <div className="border bg-white mt-4 px-4 py-6 hover:bg-gray-100 cursor-pointer rounded-xl">
              <div className="">History</div>
            </div>
            <div className="border bg-white mt-4 px-4 py-6 hover:bg-gray-100 cursor-pointer rounded-xl">
              <div className="">Upgrade</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSubscriptions;
