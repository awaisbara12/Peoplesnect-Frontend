import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../../public/images/752126.jpg";
import { GROUP_API,JOIN_GROUP_API, GROUP_MEMBER_Request } from "../../../pages/config";
import { useRouter } from "next/router";
import Spinner from "../../../components/common/Spinner";


const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 355) + (text.length > 355?("......"):('')) : text}
      {text.length > 355?(
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ):('')}
    </p>
  );
};

const SuggestionGroups = () => {
  const [groupDetail,setgroupDetail] = useState();
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  // const history = useHistory();
  const [join, setjoin] = useState(false);

  const data = router.asPath;
  const myArray = data.split("?");
  const [memberrequest, setMemberRequest] = useState();

  const GroupJoinFun =event=>{
    setSpinner(true);
    event.currentTarget.disabled = true;
    const res = fetch(JOIN_GROUP_API +"?id="+myArray[1], {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if(groupDetail && groupDetail.group_type != "private_group"){
        setjoin(true);
        router.push('/group-page/joind-group?'+myArray[1]);
      }else{
        // setjoin(true);
        // router.push('/group-page');
        GetMemberRequest();
      }
      
    })
  }
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const GroupDetail =()=>{
    const res = fetch(GROUP_API +"/"+myArray[1], {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setgroupDetail(result.data)
    })
  }

  const Ismember =()=>{
    const res = fetch(GROUP_API +"/ismember?group_id="+myArray[1], {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
     if(result.data)
     {
      // router.push('/group-page');
        setjoin(true);
     }
    })
  }

  const GetMemberRequest=async()=>{    
   
    await fetch(GROUP_MEMBER_Request+"?group_id="+myArray[1], {
      method: "GET",
       headers: {
        Accept: "application/json",
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          if (result.data)
          {
            setMemberRequest(result.data);
          }
        }
      })
      .catch((err) => console.log(err)); 
  }

  useEffect(() => {
    GroupDetail();
    GetMemberRequest();
    Ismember();
  },[myArray[1]])
  return (
    <div className="mt-8">
    <div className="w-[600px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
        <div className="blogs bg-white rounded-xl">
        
          <div className="image">
          {groupDetail?(
                groupDetail.cover_image_url?(
                  <img
                    src={groupDetail.cover_image_url}
                    className="object-cover rounded-xl h-[350px] w-[1350px]"
                    alt=""
                  />
                ):(
                  <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={1350}
                  height={450}
                  alt=""
                />
                )
              )
              :(<Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={1350}
                  height={450}
                  alt=""
                />
                )}
          </div>
          <div className=" details p-5">
            <div className="heading text-2xl text-indigo-400 font-bold">
              {groupDetail?(groupDetail.title):("")}
            </div>
            <div className="mt-4">
              Group Type :{" "}
              <a href="" className="text-indigo-400 font-bold">
                {" "}
                {groupDetail && groupDetail.group_type == "public_group" ?("Public"):("Private")}
              </a>
            </div>
            <div className="button text-center mt-4">
              <div className="bg-indigo-400 border border-indigo-400 text-white font-bold px-3 py-2 rounded-full hover:bg-transparent hover:text-indigo-400">
                {memberrequest?(
                  <button disabled={true}>
                    Request Send
                  </button>
                ):(
                  join == true?(
                    <button disabled={true}>
                      You have Join this Group
                    </button>
                  ):(
                    <button onClick={GroupJoinFun}>
                      Join Group {spinner && true ? <Spinner /> : ""}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="bg-white rounded-xl">
            <div className="p-5">
              <div className="">
                <div className="font-bold text-lg">Group Details</div>
              </div>
              <div className="Details mt-5">
                <div className="caption text-lg font-extralight">
                  Group Discraption in Details
                </div>
                <div className="font-extralight">
                <ReadMore>
                  {groupDetail?(groupDetail.description):('')}
                </ReadMore>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="Creat-Name mt-5 font-bold">
                  Group Admin Name :{" "}
                  <span className="text-indigo-400 ml-2 cursor-pointer">
                  {groupDetail?(groupDetail.owner.first_name+" "+ groupDetail.owner.last_name):('')}
                  </span>
                </div>
                <div className="Creat-Name mt-5">
                  Total Members :{" "}
                  <span className="ml-2 cursor-pointer">{groupDetail?(groupDetail.group_members_count):(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionGroups;
