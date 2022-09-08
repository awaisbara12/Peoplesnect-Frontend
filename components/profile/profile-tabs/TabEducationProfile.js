import React from "react";

const TabEducationProfile = () => {
  return (
    <div className="">
      <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-7">
        <div className="flex justify-between">
          <div className="font-bold">Education Skills:</div>
          <div className="text-indigo-400 cursor-pointer">Edit</div>
        </div>
        <div className="bg-gray-50 hover:bg-gray-100 hover:shadow-xl p-5 mt-4 rounded-xl">
          <div className="">
            <div className="font-bold">M-Phill</div>
          </div>
          <div className="flex justify-between items-end">
            <div className="">
              <div className="text-sm font-semibold mt-2 ml-3">
                <div className="text-indigo-400 cursor-pointer underline mb-2">
                  Punjab University Lahore
                </div>
                <div className="font-normal">3.4 (CGPA)</div>
              </div>
            </div>
            <div className="text-sm font-semibold mt-2 mr-3">
              <div className="mb-2 font-normal">
                Session: (<span className="underline">2019-2022</span>)
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 hover:bg-gray-100 hover:shadow-xl p-5 mt-4 rounded-xl">
          <div className="">
            <div className="font-bold">MSc</div>
          </div>
          <div className="flex justify-between items-end">
            <div className="">
              <div className="text-sm font-semibold mt-2 ml-3">
                <div className="text-indigo-400 cursor-pointer underline mb-2">
                  Bahauddin Zakariya University Multan
                </div>
                <div className="font-normal">2.8 (CGPA)</div>
              </div>
            </div>
            <div className="text-sm font-semibold mt-2 mr-3">
              <div className="mb-2 font-normal">
                Session: (<span className="underline">2017-2019</span>)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabEducationProfile;
