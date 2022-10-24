import React, { useEffect, useState } from "react";
import Switch from "react-switch";

const History = () => {
  const [checked, setChecked] = useState(true);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };
  const [checked1, setChecked1] = useState(true);
  const handleChange1 = (nextChecked1) => {
    setChecked1(nextChecked1);
  };
  const [checked2, setChecked2] = useState(true);
  const handleChange2 = (nextChecked2) => {
    setChecked2(nextChecked2);
  };
  const [checked3, setChecked3] = useState(true);
  const handleChange3 = (nextChecked3) => {
    setChecked3(nextChecked3);
  };
  const [checked4, setChecked4] = useState(true);
  const handleChange4 = (nextChecked4) => {
    setChecked4(nextChecked4);
  };

  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="heading text-lg font-bold mb-5">History</div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-center">
                  <th scope="col" className="py-3 px-6">
                    Product name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Purchase Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Expiration
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Spent
                  </th>
                  <th scope="col" className="py-3 px-6 float-right">
                    Stop Subscription
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17
                  </th>
                  <td className="py-4 px-6">12-02-2021</td>
                  <td className="py-4 px-6">12-02-2024</td>
                  <td className="py-4 px-6">$2999</td>
                  <td className="py-4 px-6 text-right">
                    <div>
                      <label>
                        <Switch
                          onChange={handleChange}
                          checked={checked}
                          className="react-switch"
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="py-4 px-6">12-02-2021</td>
                  <td className="py-4 px-6">12-02-2024</td>
                  <td className="py-4 px-6">$1999</td>
                  <td className="py-4 px-6 text-right">
                    <div>
                      <label>
                        <Switch
                          onChange={handleChange1}
                          checked={checked1}
                          className="react-switch"
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="py-4 px-6">12-02-2021</td>
                  <td className="py-4 px-6">12-02-2024</td>
                  <td className="py-4 px-6">$99</td>
                  <td className="py-4 px-6 text-right">
                    <div>
                      <label>
                        <Switch
                          onChange={handleChange2}
                          checked={checked2}
                          className="react-switch"
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    LCD
                  </th>
                  <td className="py-4 px-6">12-02-2021</td>
                  <td className="py-4 px-6">12-02-2024</td>
                  <td className="py-4 px-6">$158</td>
                  <td className="py-4 px-6 text-right">
                    <div>
                      <label>
                        <Switch
                          onChange={handleChange4}
                          checked={checked4}
                          className="react-switch"
                        />
                      </label>
                    </div>
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Mobile
                  </th>
                  <td className="py-4 px-6">12-02-2021</td>
                  <td className="py-4 px-6">12-02-2024</td>
                  <td className="py-4 px-6">$954</td>
                  <td className="py-4 px-6 text-right">
                    <div>
                      <label>
                        <Switch
                          onChange={handleChange3}
                          checked={checked3}
                          className="react-switch"
                        />
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
