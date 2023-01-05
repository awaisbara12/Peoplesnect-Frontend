import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Checkbox from "./Checkbox";
import { Friends } from "./mock";
import postimage from "../../../../public/images/post-image.png";

const InviteFriendsGroup = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(Friends);
  }, [list]);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  console.log(isCheck);

  const catalog = list.map(({ id, name }) => {
    return (
      <div className="flex gap-2 items-center py-2 border-b">
        <Checkbox
          key={id}
          type="checkbox"
          name={name}
          id={id}
          handleClick={handleClick}
          isChecked={isCheck.includes(id)}
        />
        <div className="flex gap-2 items-center">
          <Image
            src={postimage}
            className="object-cover rounded-full z-40"
            width={56}
            height={56}
            alt=""
          />
          <div>
          <div className="text-sm font-bold">
            User Name
          </div>
          <div className="text-base -mt-1 font-extralight">
            Location
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
