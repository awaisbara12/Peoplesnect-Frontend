import React from "react";
import {
  PhoneIcon,
} from "@heroicons/react/outline";

const AboutProfile = () => {
  return (
    <div className="bg-gray-100 rounded-b-xl">
      <div className="font-bold text-lg p-5">User Details</div>
      <div className="grid grid-cols-2">
        <div className="px-12 py-5 border-r">
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">State Name:</div>
            <div className="">Arizona</div>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">City Name:</div>
            <div className="">Phoenix</div>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Company Name:</div>
            <div className="">
              <a href="" className="hover:underline">
                Neptune Technologies
              </a>
            </div>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Position in Company:</div>
            <div className="">
              <a href="" className="">
                Senior Websits developers
              </a>
            </div>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Your Company Adress:</div>
            <div className="">
              <a href="" className="hover:underline">
                2000 East Rio Salado Parkway Phoenix Arizona
              </a>
            </div>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Current Job Title:</div>
            <div className="">Rubby and Rails Devolper</div>
          </div>
          <hr />
        </div>
        <div className="px-4 py-5">
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Email Adress:</div>
            <div className="">abc123@gmail.com</div>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Phon Number:</div>
            <a href="" className="flex gap-2 hover:underline">
              <PhoneIcon className="h-5 w-5" />
              +1 844-962-2802
            </a>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Birthday:</div>
            <div className="">25-August-1998</div>
          </div>
          <hr />
          <div className="flex items-center gap-3 my-4">
            <div className="font-bold">Your Adress:</div>
            <div className="">
              <a href="" className="hover:underline">
                15091 South Komatke Lane Laveen Village, Phoenix
              </a>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center p-4">
        <div className="font-bold">Join PeoplesNect:</div>
        <div className="font-normal">2-11-1992</div>
      </div>
    </div>
  );
};

export default AboutProfile;
