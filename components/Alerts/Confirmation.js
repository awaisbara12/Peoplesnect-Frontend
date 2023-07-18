import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import { BellIcon } from "@heroicons/react/outline";

const Confirm =(props) => {
  const [showconfirmation, setShowconfirmation] = React.useState(props.openalert);
  return (
    <>
      {showconfirmation ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[500px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              {/*header*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className="flex gap-2 items-center">
                    <Image
                      src={logo}
                      className="object-cover w-full"
                      placeholder="empty"
                      alt=""
                    />
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setopenalert(false)}
                  >
                    <span className="bg-transparent text-indigo-400 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex gap-2">
                    <BellIcon className="h-7 w-7 text-indigo-400" />
                    <p className="text-slate-500 text-lg leading-relaxed">
                      Are You Sure??
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex gap-6 items-center justify-center py-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-indigo-400 border border-indigo-400 rounded-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setopenalert(false)}
                  >
                    No
                  </button>
                  <div className="">
                    <button
                      className="text-white rounded-full bg-indigo-400 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => props.setopenalert(false)}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-opacity-80 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );

};

export default function ShowConfirm(props) {
  console.log("props", props)
  return (
    <>
      <Confirm openalert={props.openalert} setopenalert={props.setopenalert} body={props.body} />
    </>
  );
}