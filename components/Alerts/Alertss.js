import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import { BellIcon } from "@heroicons/react/outline";

const Alert = (props) => {
  const [showAlert, setShowAlert] = React.useState(props.openalert);
  if (props.openalert) {
    setTimeout(() => {
      props.setopenalert(false)
    }, 2000);
  }
  return (
    <>
      {showAlert ? (

        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
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
                      {props.body}
                    </p>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6">
                  {/* <button
              className="text-indigo-400 border border-indigo-400 rounded-full background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => props.setopenalert(false)}
            >
              Close
            </button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-opacity-80 fixed inset-0 z-40 bg-black" onClick={() => props.setopenalert(false)}></div>
        </>












        // <div
        //   className={
        //     "text-white px-6 py-4 border-0 flex justify-center rounded relative mb-4 bg-pink-500"
        //   }
        // >
        //   <span className="text-xl inline-block mr-5 align-middle">
        //     <i className="fas fa-bell" />
        //   </span>
        //   <span className="inline-block align-middle mr-0">
        //     <b className="capitalize">{props.body}</b>
        //   </span>
        //   <button
        //     className=" bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-0 ml-6 outline-none focus:outline-none"
        //     onClick={() => props.setopenalert(false)}
        //   >
        //     <span>×</span>
        //   </button>

        // </div>
      ) : null}
    </>
  );
};

export default function ShowAlert(props) {
  return (
    <>
      <Alert openalert={props.openalert} setopenalert={props.setopenalert} body={props.body} />
    </>
  );
}