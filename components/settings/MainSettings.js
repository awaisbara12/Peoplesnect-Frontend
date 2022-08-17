import {
  AtSymbolIcon,
  BellIcon,
  EyeIcon,
  KeyIcon,
  LockClosedIcon,
  LockOpenIcon,
  RefreshIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/outline";
import React from "react";

const MainSettings = () => {
  return (
    <div>
      <div className="mt-8">
        <div className="w-[600px] px-5 md:px-0 lg:px-0">
          <div className="mb-4">
            <div className="heading font-bold">Account Settings</div>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="settings/contect-info">
              <div className="username flex gap-2 text-lg font-medium">
                <UserCircleIcon className="h-7 w-7" />
                Contact Info
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="settings/personal-info">
              <div className="username flex gap-2 text-lg font-medium">
                <UserIcon className="h-7 w-7" />
                Personal Info
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="settings/account-preference">
              <div className="username flex gap-2 text-lg font-medium">
                <KeyIcon className="h-7 w-7" />
                Account Prefernces
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="settings/account-security">
              <div className="username flex gap-2 text-lg font-medium">
                <LockClosedIcon className="w-7 h-7" />
                Account Security
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="settings/payment-subscription">
              <div className="username flex gap-2 text-lg font-medium">
                <ShoppingBagIcon className="h-7 w-7" />
                Payments & Subscription
              </div>
            </a>
          </div>
          <div className="border hover:bg-gray-50 mt-4 p-4 bg-white hover:shadow-lg rounded-xl">
            <a href="settings/account-managment">
              <div className="username flex gap-2 text-lg font-medium">
                <RefreshIcon className="h-7 w-7" />
                Account Manegment
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSettings;
