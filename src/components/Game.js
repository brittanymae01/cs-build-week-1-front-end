import React, { useEffect } from "react";
import axios from "axios";
import { Button, Icon } from "semantic-ui-react";

export default function Game(props) {
  useEffect(() => {
    axios
      .get("https://lambda-mud-test.herokuapp.com/api/adv/init/", {
        headers: {
          Authorization: `Token ${localStorage.getItem("csbuildweek1")}`
        }
      })
      .then(response => {
        console.log(response);
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
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={handleLogout}>Log out</Button>
      </div>

      <h1>GAME</h1>

      <div></div>
    </div>
  );
}
