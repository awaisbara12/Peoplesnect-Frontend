import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Checkbox from "./Checkbox";
import { Friends } from "./mock";
import postimage from "../../../../public/images/post-image.png";
import { InviteFriends } from "../../../../pages/config";
import axios from "axios";

const InviteFriendsGroup = (props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState(props.isCheck);
  const [list, setList] = useState([]);

  // console.log(props.page);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  const GetInviteFriends = async () => {
    const res = await axios(InviteFriends+"/get_friends_and_followers?page_id="+props.page.id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = await res;

    try {
      if (result.status == 200) {
        setList(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  useEffect(() => {
    GetInviteFriends();
  }, []);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map(li => li.id));
    props.setIsCheck(list.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
      props.setIsCheck([]);
    }
  };
  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    props.setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
      props.setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  // console.log("id is",isCheck);

  const catalog = list.map(({ id, first_name, last_name, city, country,display_photo_url  }) => {
    return (
      <div className="flex gap-2 items-center py-2 border-b" key={id}>
        <Checkbox
          key={id}
          type="checkbox"
          name={first_name}
          id={id}
          handleClick={handleClick}
          isChecked={isCheck.includes(id)}
        />
        <div className="flex gap-2 items-center">

        {display_photo_url?(
                            <img
                              src={display_photo_url} 
                              className="object-cover rounded-full z-40 h-[44px] w-[44px]"
                              alt=""
                            />
                          ):(
                            <Image
                            src={postimage}
                            className="object-cover rounded-full z-40"
                            width={56}
                            height={56}
                            alt=""
                          />
                          )}
          <div>
          <div className="text-sm font-bold">
            {first_name} {last_name}
          </div>
          <div className="text-base -mt-1 font-extralight">
            {city}{','} {country}
          </div>
          </div>

        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 justify-end  border-b pb-4">
      <Checkbox
        type="checkbox"
        name="selectAll"
        id="selectAll"
        handleClick={handleSelectAll}
        isChecked={isCheckAll}
      />
      Select All
      </div>
      <div>
      {catalog}
      </div>
    </div>
  );
};
export default InviteFriendsGroup;
