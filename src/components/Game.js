import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

export default function Game(props) {
  const [initialData, setInitialData] = useState({
    username: "",
    roomName: "",
    roomDescription: "",
    playersInCurrentRoom: []
  });

  useEffect(() => {
    axios
      .get("https://lambda-mud-test.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("csbuildweek1")}`
        }
      })
      .then(response => {
        console.log(response);
        setInitialData(initialData => ({
          username: response.data.name,
          roomName: response.data.title,
          roomDescription: response.data.description,
          playersInCurrentRoom: response.data.players
        }));
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("csbuildweek1");
    props.history.push("/");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Button onClick={handleLogout}>Log out</Button>
      </div>

      <h1>Welcome {initialData.username}!</h1>

      <div></div>
    </div>
  );
}
