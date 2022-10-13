import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "./Context";
import "react-toastify/dist/ReactToastify.css";

export default function Card({ props }) {
  const { dispatchUserEvent } = useContext(AppContext);
  function handelRemove() {
    dispatchUserEvent("REMOVE_USER", { userId: props.id });
    toast.warn("User is Removed", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }
  return (
    <>
      <div className="border m-4 w-96">
        <button
          type="button"
          className="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 m-2 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
          onClick={handelRemove}
        >
          X<span className="sr-only">Icon description</span>
        </button>
        <Link to={`/update-contact/${props.id}`}>
          <div className="rounded-lg shadow-xl bg-white flex flex-col justify-center items-center">
            <img
              src={props.picture}
              alt={props.name}
              className="rounded-full p-4 h-24 mx-auto"
            />

            <header className=" text-xl font-extrabold py-2 px-2 text-center ">
              {props.name}
            </header>
            <div className="flex justify-center w-4/5 my-4">
              <ul className="text-gray-700 text-start font-semibold ">
                <li className="flex">
                  {" "}
                  <div className="w-20">Group:</div> <div>{props.group}</div>{" "}
                </li>
                <li className="flex">
                  {" "}
                  <div className="w-20">Gender :</div> <div>{props.gender}</div>{" "}
                </li>
                <li className="flex">
                  {" "}
                  <div className="w-20">Phone :</div> <div>{props.phone}</div>{" "}
                </li>
                <li className="flex">
                  <div className="w-20">Address: </div>
                  <div>
                    {" "}
                    <address>
                      {" "}
                      {props.location.street.number},{" "}
                      {props.location.street.name}
                      , <br /> {props.location.city},{props.location.state},
                      <br />
                      {props.location.country}, ,{props.location.postcode}
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
