import React from "react";
import { Button } from "semantic-ui-react";

export default function Game(props) {
  const handleLogout = () => {
    localStorage.removeItem("csbuildweek1");
    props.history.push("/");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Log out</Button>
      <h1>GAME</h1>
    </div>
  );
}
