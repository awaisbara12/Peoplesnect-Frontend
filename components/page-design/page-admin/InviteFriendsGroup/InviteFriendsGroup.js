import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Checkbox from "./Checkbox";
import { Friends } from "./mock";
import profile from "../../../../public/images/profile-avatar.png";
import axios from "axios";
import { GROUP_API, GROUP_MEMBERS_API, InviteFriends, PAGES_API } from "../../../../pages/config";
import { Input } from "@material-tailwind/react";

const InviteFriendsGroup = (props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState(props.isCheck);
  const [list, setList] = useState([]);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  const GetMember = () => {
    fetch(PAGES_API + "/page_liker?page_id=" + props.group.id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        // setList(result.data);
        const mergedList = result.data.map(({ user }) => user);
        setList([...list, ...mergedList]);
        // console.log(result.data);
      })
  }

  useEffect(() => {
    GetMember();
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
                src={profile}
                className="object-cover rounded-full z-40"
                width={44}
                height={44}
                alt=""
              />
            )
          }
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
      {/* <div>
        <Input placeholder="Type Name" />
      </div> */}
      <div className="flex gap-2 justify-end  border-b pb-2">
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
