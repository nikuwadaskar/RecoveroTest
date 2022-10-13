import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "./Context";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateForm({ user }) {
  const { dispatchUserEvent } = useContext(AppContext);
  const navigate = useNavigate();
  let { users } = useContext(AppContext);
  function handelSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("grid-first-name").value;
    const phone = document.getElementById("grid-phone").value;
    const zip = document.getElementById("grid-zip").value;
    const country = document.getElementById("grid-country").value;
    const state = document.getElementById("grid-state").value;
    const groupId = document.getElementById("grid-group");
    const group = groupId.options[groupId.selectedIndex].value;
    const genderId = document.getElementById("grid-gender");
    const gender = genderId.options[genderId.selectedIndex].value;
    const cityname = document.getElementById("grid-cityname").value;
    const streetname = document.getElementById("grid-streetname").value;
    const streetnumber = document.getElementById("grid-streetnumber").value;
    const newuser = {
      id: user ? user.id : users.length + 1,
      gender: gender,
      name: name,
      location: {
        street: {
          number: streetnumber,
          name: streetname,
        },
        city: cityname,
        state: state,
        country: country,
        postcode: zip,
      },
      phone: phone,
      picture: user ? user.picture : "https://loremflickr.com/300/300/human",
      group: group,
    };

    if (
      !name ||
      !phone ||
      !zip ||
      !country ||
      !state ||
      !cityname ||
      !streetname ||
      !streetnumber
    ) {
      alert("All field are meddatory");
    } else {
      if (user) {
        handelSubmitUpdate(newuser);
      } else {
        handelSubmitCreate(newuser);
      }
    }
  }

  function handelSubmitUpdate(newuser) {
    const newUsers = users.map((ele) => {
      if (ele && ele.id === user.id) {
        return (ele = newuser);
      } else {
        return ele;
      }
    });
    dispatchUserEvent("UPDATE_USER", { users: newUsers });
    toast.success("User is Updated", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigate("/");
  }
  function handelSubmitCreate(newuser) {
    dispatchUserEvent("ADD_USER", { newUser: newuser });
    toast.success("User is Added", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/");
  }

  return (
    <div>
      <div className="w-full max-w-lg">
        <div className="flex justify-center m-3">
          {user ? (
            <h1 className="font-black text-3xl text-blue-900">
              Update Contact
            </h1>
          ) : (
            <h1 className="font-black text-3xl text-blue-900">
              Create New Contact
            </h1>
          )}

          {/* <h1 className="font-black text-3xl text-blue-900">Update User</h1> */}
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Full Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              required
              defaultValue={user ? user.name : ""}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-phone"
              type="number"
              placeholder="99999999999"
              required
              defaultValue={user ? user.phone : ""}
            />
          </div>
        </div>

        <div className="flex mb-6 justify-around">
          <div className=" m4-3 w-2/5 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-group"
            >
              Group
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-group"
                defaultValue={user ? user.group : ""}
              >
                <option>Friend</option>
                <option>Colleagues</option>
                <option>Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className=" w-2/5 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-gender"
            >
              Gender
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-gender"
                defaultValue={user ? user.gender : ""}
              >
                <option defaultValue>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Street Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-streetnumber"
              type="number"
              placeholder="Your Street Number"
              required
              defaultValue={user ? user.location.street.number : ""}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Street Name
            </label>
            <div className="relative">
              <input
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Your state"
                id="grid-streetname"
                required
                defaultValue={user ? user.location.street.name : ""}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              City Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-cityname"
              type="text"
              placeholder="Your City Name"
              required
              defaultValue={user ? user.location.city : ""}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2"
              htmlFor="grid-zip"
            >
              State
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
              type="text"
              placeholder="State"
              required
              defaultValue={user ? user.location.state : ""}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2"
              htmlFor="grid-zip"
            >
              Country
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-country"
              type="text"
              placeholder="Country"
              required
              defaultValue={user ? user.location.country : ""}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold m-2"
              htmlFor="grid-zip"
            >
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="number"
              placeholder="90210"
              required
              defaultValue={user ? user.location.postcode : ""}
            />
          </div>

          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5 ml-3"
            onClick={handelSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
