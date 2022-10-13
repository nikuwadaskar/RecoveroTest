import React, { useContext } from "react";
import {useParams } from "react-router-dom";
import { AppContext } from "./Context";
import UpdateForm from "./Form";

export default function UpdateEdit() {
  const { id } = useParams();
  const { users } = useContext(AppContext);
  const user = users.find((ele) => ele.id === Number(id));
  return <>{user ? <UpdateForm user={user} /> : <UpdateForm />}</>;
}
