import React, { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { useFormik } from "formik";
import { XIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { OnboardingSchemaFitst } from "../auth/schemas/OnboardSchema";
import { ONBOARDING_STEP_ONE_URL, ONBOARDING_STEP_THREE_URL } from "../../pages/config";
import { fetchUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City }  from 'country-state-city';
import Spinner from "../common/Spinner";
import ShowAlert from "../Alerts/Alertss";

const StepOne = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [err, setErr] = useState();
  const [close, setClose] = useState(false);
  const dispatch = useDispatch();
  const [country, setcountry] = useState();
  const [countryName, setcountryName] = useState();   // Country name for db save
  const [city, setcity] = useState();
  const [state, setstates] = useState();
  const [stateName, setstateName] = useState();                 // state name for db save
  const [Errcountry, setcountryErr] = useState();
  const [Errcity, setcityErr] = useState();
  const [Errstate, setstateErr] = useState();
  const [openalert, setopenalert] = useState(false); // For Alert Show
  const [alertbody, setalertbody] = useState(); // For Alert Body
  


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  var { data: user } = useSelector((state) => state.user);

  const handleClose = () => {
    setClose(true);
  };
// onSubmit={stepData}
  const stepData = async () => {
    // e.preventDefault();
    // handleSubmit();
    // const isValid = await OnboardingSchemaFitst.isValid(values)
    if(city && country && state){
      setSpinner(true);
      const data = {
          user: {
              country: countryName,
              city:city,
              state:stateName,
            },
          };
          const resp = await fetch(ONBOARDING_STEP_ONE_URL, {
              method: "PUT",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: authKey,
                },
                body: JSON.stringify(data),
              });
              const result = await resp.json();
              try {
                if (result && result.error) {
                    setErr(result.error);
                  } else {
                      if (result && 200) {
                          // router.push("/onboarding/step-two");
                          //  console.log("step.1",result)
                          const otps = {
                            user: {
                              otp: 123456,
                            },
                          };
                          const resp = await fetch(ONBOARDING_STEP_THREE_URL, {
                            method: "PUT",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: `${authKey}`,
                            },
                            body: JSON.stringify(otps),
                          });
                            const result = await resp.json();
                            try {
                              if (result && result.error) {
                                setopenalert(true);
                                setalertbody("Enter OTP")
                              } else {
                                if (result && 200) {
                                  const currentuserSting = JSON.stringify(result.data);     // convert json into string
                                  localStorage.setItem("currentuser", currentuserSting);    // save currentuser in localstorage as string
                                  router.push("/news-feed");
                                }
                              }
                            } catch (err) {
                              console.log(err);
                            }



                        }
                      }
              } catch (err) {
                console.log(err);
                }
      setSpinner(false);
    }else{
      var check=0;
      if (country){ setcityErr('Required');setstateErr('Required'); setcountryErr('');check=1;}
      if (city){setcountryErr('Required');setstateErr('Required');setcityErr(''); check=1;}
      if (state){setcountryErr('Required');setcityErr('Required'); setstateErr('');check=1;}
      if(check==0){setcityErr('Required');setcountryErr('Required');setstateErr('Required');}
    }
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      country: country,
      city: city,
      state: state,
    },
    validationSchema: OnboardingSchemaFitst,
  });

  useEffect(() => {
    // redirect to home if already onboarded
    const getUser = () => {
      if(user.user && user.user.onboarded){
        router.push('/news-feed')
      }
    };
    getUser();
  }, [user]);

  // Contry handler
  const countryhandler=(e)=>{
    var a;
    if( e && e.target && e.target.value){
      a=e.target.value.split(",")
      // console.log(a);
      setcountry(a[0]);
      setcountryName(a[1]);
      setstates('');
      setstateName('');
      setcity('');
    }
  }
  //  state handler
  const statehandler=(e)=>{
    var a;
    if( e && e.target && e.target.value){
      a=e.target.value.split(",")
      // console.log(a);
      setstates(a[0]);
      setstateName(a[1]);
      setcity('');
    }
  }
  return (
    <>
      {openalert?(
        <ShowAlert openalert={openalert} setopenalert={setopenalert} body={alertbody}/>
      ):("")}
      <div className="signUp--background min-h-screen overflow-y-auto">
        <div className="text-center py-6">
          <Image
            src={Logo}
            width={234}
            height={45}
            placeholder="blur"
            alt="peoplesNect-logo"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white w-[95%] lg:w-[50%] md:w-[60%] rounded-xl p-5">
            {err ? (
              <div
                className={`bg-red-50 mt-4 text-red-600 px-4 py-4 rounded relative ${
                  close === true ? "hidden" : "visible"
                }`}
                role="alert"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircleIcon className="fill-current h-6 w-6 text-red-500" />
                    <span className="block sm:inline">{err}</span>
                  </div>
                  <XIcon
                    onClick={() => handleClose()}
                    className="fill-current h-6 w-6 text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="text-center pt-6">
              <h1 className="font-bold text-xl pb-2">
              Hi, Welcome onboard 👋{" "}
              </h1>
              <p className="font-light">
                Start building up your profile and start finding 
                <br />the professionals from a number of different 
                industries.
              </p>
            </div>

            <for  className="w-3/4 mx-auto pt-8 pb-6">
              {/* Country */}
              <div className="form-group pb-4">
                <label htmlFor="" className="font-medium">
                  Country - Region <span className="text-red-400">*</span>
                </label>
                <select onChange={countryhandler} 
                // className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2"
                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none
                 focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                  Errcountry ? "border-red-600" : ""
                }`}
                >
                  <option value={country}>{country}</option>
                  {
                    Country.getAllCountries().map((item)=>(
                      <option value={[item.isoCode,item.name]} key={item.id}>{item.name}</option>
                    ))  
                  }
                </select>
                {/* <input
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                    errors.country && touched.country ? "border-red-600" : ""
                  }`}
                /> */}
                {Errcountry? (
                  <div className="text-red-600 pt-2 pl-1">{Errcountry}</div>
                ) : null}
              </div>
              {/* State */}
              <div className="form-group pb-4">
                <label htmlFor="" className="font-medium">
                  State <span className="text-red-400">*</span>
                </label>
                <select onChange={statehandler} 
                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none
                 focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                  Errstate ? "border-red-600" : ""
                }`}
                >
                  <option value={state}>{state}</option>
                    {
                      State.getStatesOfCountry(country).map((item)=>(
                        <option value={[item.isoCode,item.name]} key={item.name}>{item.name}</option>
                      ))  
                    }
                </select>
                {Errstate? (
                  <div className="text-red-600 pt-2 pl-1">{Errstate}</div>
                ) : null}
              </div>
              {/* City */}
              <div className="form-group pb-4">
                <label htmlFor="" className="font-medium">
                  City <span className="text-red-400">*</span>
                </label>
                <select onChange={e=>setcity(e.target.value)} 
                 // className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:min-w-[13rem] placeholder:pl-2 rounded-full placeholder:py-2"
                 className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                  Errcity ? "border-red-600" : ""
                }`}>
                 <option value={city}>{city}</option>
                    {
                      City.getCitiesOfState(country, state).map((item)=>(
                        <option value={item.name} key={item.name}>{item.name}</option>
                      ))  
                    }
                </select>
                {/* <input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                    errors.city && touched.city ? "border-red-600" : ""
                  }`}
                /> */}
                {Errcity? (
                  <div className="text-red-600 pt-2 pl-1">{Errcity}</div>
                ) : null}
              </div>
              {country && state && city?(
                <button
                  // type="submit"
                  disabled={spinner}
                  onClick={()=>stepData()}
                  className="bg-indigo-400 flex gap-2 items-center justify-center text-white text-xl text-center cursor-pointer font-semibold w-full py-2 rounded-full mt-6"
                >
                  Continue {spinner && true ? <Spinner /> : ""}
                </button>
              ):(
                <button
                className="bg-indigo-100 flex gap-2 items-center justify-center text-white text-xl text-center cursor-not-allowed font-semibold w-full py-2 rounded-full mt-6"
              >
                Continue {spinner && true ? <Spinner /> : ""}
              </button>
              )}
              
            </for>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepOne;
