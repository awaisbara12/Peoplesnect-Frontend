import React from "react";

const EducationBar = () => {
  return (
    <div>
      <div className="">
        <div className="mt-8 mx-auto bg-white rounded-xl w-full h-auto p-4">
          <div className="font-bold">Educations:</div>
          <div className="bg-gray-50 hover:bg-gray-100 hover:shadow-xl p-3 mt-4 rounded-xl">
            <div className="font-bold">
              Matric <span className="font-light">(Scince)</span>
            </div>
            <div className="text-sm font-semibold mt-2 ml-3">
              <div className="">974/1100</div>
              <div className="">Lahore Board</div>
              <div className="">2012</div>
            </div>
          </div>
          <div className="bg-gray-50 hover:bg-gray-100 hover:shadow-xl p-3 mt-4 rounded-xl">
            <div className="font-bold">
              Intermediate <span className="font-light">(FSc)</span>
            </div>
            <div className="text-sm font-semibold mt-2 ml-3">
              <div className="">853/1100</div>
              <div className="">Lahore Board</div>
              <div className="">2014</div>
            </div>
          </div>
          <div className="bg-gray-50 hover:bg-gray-100 hover:shadow-xl p-3 mt-4 rounded-xl">
            <div className="font-bold">
              BSc <span className="font-light">(Duble Math physics)</span>
            </div>
            <div className="text-sm font-semibold mt-2 ml-3">
              <div className="">84%</div>
              <div className="">Punjab University Lahore</div>
              <div className="">2016</div>
            </div>
          </div>
          <div className="bg-gray-50 hover:bg-gray-100 hover:shadow-xl p-3 mt-4 rounded-xl">
            <div className="font-bold">
              MSc <span className="font-light">(Physics)</span>
            </div>
            <div className="text-sm font-semibold mt-2 ml-3">
              <div className="">2.98 CGPA</div>
              <div className="">University Of Lahore</div>
              <div className="">2018</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationBar;
