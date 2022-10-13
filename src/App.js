import Header from "./components/Header";
import React, { useState } from "react";
import Card from "./components/Card";
import jsonData from "./components/UserData.json";
import UpdateEdit from "./components/UpdateEdit";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "./components/Context";
import { ToastContainer } from "react-toastify";

function App() {
  const [users, setUsers] = useState(jsonData);

  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case "ADD_USER":
        setUsers([...users, payload.newUser]);
        return;
      case "UPDATE_USER":
        setUsers(payload.users);
        return;
      case "REMOVE_USER":
        setUsers(users.filter((user) => user.id !== payload.userId));
        return;
      default:
        return;
    }
  };

  const renderList = users.map((e) => 
    <Card key={e.id} props={e} />
);

  return (
    <BrowserRouter>
      <div className="App">
        <AppContext.Provider value={{ users, dispatchUserEvent }}>
          <Header />
          <ToastContainer />
          <div className="flex flex-wrap w-auto justify-evenly">
            <Routes>
              <Route path="/" element={renderList} />
              <Route path="/create-contact" element={<UpdateEdit />} />
              <Route path="/update-contact/:id" element={<UpdateEdit />} />
            </Routes>
          </div>
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}
export default App;
