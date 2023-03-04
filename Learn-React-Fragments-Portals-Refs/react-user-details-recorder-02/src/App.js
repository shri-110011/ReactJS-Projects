import React, {useState} from "react";
import "./App.css";
import UserDetailsForm from "./components/UserDetails/UserDetailsForm";
import UserDetailsList from "./components/UserDetails/UserDetailsList";

function App() {
  const [users, setUsers] = useState([
    {
      name: "Max",
      age: 31,
    }
  ]);

  const onUserAddedHandler = (user) => {
    setUsers([...users, user]);
  };

  return (
    <>
      <UserDetailsForm onUserAdded={onUserAddedHandler} />
      <UserDetailsList users={users}/>
    </>
  );
}

export default App;
