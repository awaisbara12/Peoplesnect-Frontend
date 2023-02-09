import React, { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import ApplicatnDetails from "./ApplicantDetails";
import { USE_APPLY_JOB_API } from "../../../../pages/config";
import { useRouter } from "next/router";

const JobsApplicant = () => {
  const [user, setuser] = useState();
  const [userdetail, setuserdetail] = useState();
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
 
  //  GET ALL applicant/candidate
  const Applicant =()=>{
    fetch(USE_APPLY_JOB_API+"/job_applicant?id="+myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setuser(result.data)
          // setuserdetail(result.data[0]);
          console.log("data",result.data)
        }
      })
      .catch((err) => console.log(err));
  }
   
  useEffect(() => {
    Applicant();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="grid grid-cols-3">
          <div className="">
            <div className="border bg-white rounded-l-xl">
              <div className="sticky z-40 top-0 bg-white rounded-l-xl">
                <div className="p-3 border-b">
                  <div className="font-bold">Applicant List</div>
                </div>
              </div>
              <div className="overflow-y-scroll h-[700px] ">
              {user?(
                user.map((i)=>(
                <div key={i.id} onClick={()=>setuserdetail(i)}>
                  {/* <Link href="/jobs/posted-jobs/job-applicants"> */}
                    <a className="flex items-center gap-2 bg-gray-100 p-2 border-b">
                    {/* <Link href="/User-Profile"> */}
                    <Link href={{pathname: "/User-Profile", query: i.id,}}>
                      <a>
                        {i.display_photo_url?(
                            <img
                            className="object-cover rounded-full h-[45px] w-[45px]"
                            src={i.display_photo_url}
                            alt=""
                          />
                        )
                        :
                        (
                            <Image
                              className="object-cover rounded-full"
                              src={ProfileAvatar}
                              width={45}
                              height={45}
                              alt=""
                            />
                        )}
                      </a>
                    </Link>
                      <div className="">
                        <div className="font-bold capitalize">{i.first_name} {i.last_name}</div>
                        <div className="">User Applied on Job</div>
                        <div className="font-light text-sm">2Hours Ago</div>
                      </div>
                    </a>
                  {/* </Link> */}
                </div>
                ))
              ):("")}
              </div>
            </div>
          </div>
          {userdetail?(
              <div className="col-span-2">
                <ApplicatnDetails data={userdetail}/>
              </div>
          ):('')}
        </div>
      </div>
    </div>
  );
};

export default JobsApplicant;
