import React from "react";
import Card from "../UI/Card";
import classes from "./UserDetailsList.module.css";

const UserDetailsList = (props) => {
  return (
    <Card className={classes["users-list"]}>
        <ul>
            {props.users.map((user, index) => (
                <li key={index}>{`${user.name} (${user.age} years old)`}</li>
            ))}
        </ul>
    </Card>
    );
};

export default UserDetailsList;
