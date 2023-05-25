import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import { PAGE_REQUEST_API } from "../../../../pages/config";
import { useRouter } from "next/router";

const PendingGroupRequest = () => {
  const [all_reaquest, setall_reaquest] = useState();
  const [disabled, setdisabled] = useState(false);
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  // Accepted or Cancelled the request
  const ActionButton = (status, Id) => {
    setdisabled(true);
    fetch(PAGE_REQUEST_API + "/" + Id + "?member_requests[status]=" + status, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        PendingRequest();
        alert("Request has been " + status);
        setdisabled(false);
      })
  }
  // Get Pending_Request
  const PendingRequest = () => {
    fetch(PAGE_REQUEST_API + "?group_id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setall_reaquest(result.data);
      })
  }
  useEffect(() => {
    PendingRequest();
  }, [])


  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
        <div className="bg-white rounded-xl">
          <div className="flex justify-between items-center border-b-1 p-4">
            <div className="heading">Group Joining Request</div>
          </div>
          <div className="border-b-1">
            {all_reaquest ? (
              all_reaquest.map((i) => (
                <div className="request-profile flex  px-4 py-3 justify-between items-center" key={i.id}>
                  <div className="flex items-center gap-3">
                    {/* className="object-cover rounded-full z-40 h-[35px] w-[35px]" */}
                    {i.sender_details && i.sender_details.display_photo_url ? (
                      <Link href={{ pathname: "/User-Profile", query: i.sender_details.id, }}>
                        <a>
                          <img src={i.sender_details.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]" alt="" />
                        </a>
                      </Link>
                    ) : (
                      <Link href={{ pathname: "/User-Profile", query: i.sender_details.id, }}>
                        <a>
                          <Image src={ProfileAvatar} width={35} height={35} alt="" />
                        </a>
                      </Link>
                    )}

                    <div className="">
                      <Link href={{ pathname: "/User-Profile", query: i.sender_details.id, }}>
                        <a>
                          <div className="username text-sm font-bold capitalize">{i.sender_details.first_name} {i.sender_details.last_name}</div>
                          <div className="mutual-followers text-xs">
                            {i.sender_details.email}{/* Friends Already Members */}
                            {/* <span className="text-indigo-400"> 2+</span> */}
                          </div>
                          <div className="userfield text-xs">
                            Added By{" "}
                            <span className="text-indigo-400">User Name</span>
                          </div>
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="Request-button flex items-center gap-2">
                    <button onClick={() => ActionButton("accepted", i.id) }
                      disabled={disabled}
                      className="border-1 border-indigo-400 rounded-full text-indigo-400 px-3 py-1 hover:bg-indigo-400 hover:text-white">
                      Add To Group
                    </button>
                    <button onClick={() => ActionButton("cancelled", i.id)}
                      disabled={disabled}
                      className="text-gray-600 border-1 border-gray-600 rounded-full px-3 py-1 hover:bg-gray-600 hover:text-white">
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : ('')}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingGroupRequest;
