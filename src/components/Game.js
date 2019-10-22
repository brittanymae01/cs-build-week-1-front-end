import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Loader } from "semantic-ui-react";

export default function Game(props) {
  const [loading, setLoading] = useState(false);

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
        setInitialData({
          username: response.data.name,
          roomName: response.data.title,
          roomDescription: response.data.description,
          playersInCurrentRoom: response.data.players
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  const handleMove = move => {
    setLoading(active => !active);
    axios
      .post(
        "https://lambda-mud-test.herokuapp.com/api/adv/move/",
        {
          direction: move
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("csbuildweek1")}`
          }
        }
      )
      .then(response => {
        console.log("MOVE RESPONSE", response);
        setInitialData(responseData => ({
          ...responseData,
          roomName: response.data.title,
          roomDescription: response.data.description,
          playersInCurrentRoom: response.data.players
        }));
        setLoading(active => !active);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("csbuildweek1");
    props.history.push("/");
  };

  return (
    <div>
      <div>
        <Button onClick={handleLogout}>Log out</Button>
      </div>

      <h1>Welcome {initialData.username}!</h1>
      {loading ? (
        <Loader active={loading} size="massive" inline="left" />
      ) : (
        <div>
          <div style={{ marginBottom: "40px" }}>
            <h1>Make a move!</h1>
            <Button
              content="West"
              icon="angle double left"
              size="big"
              color="green"
            />
            <Button
              onClick={() => handleMove("n")}
              content="North"
              icon="angle double up"
              size="big"
              color="teal"
            />
            <Button
              content="East"
              icon="angle double right"
              size="big"
              color="green"
            />
            <Button
              content="South"
              icon="angle double down"
              size="big"
              color="blue"
            />
          </div>

          <div>
            <p>
              Current room: <strong>{initialData.roomName}</strong>
            </p>
            <p>
              Description: <strong>{initialData.roomDescription}</strong>
            </p>
            <p>Players in room:</p>
            {initialData.playersInCurrentRoom.map((player, index) => (
              <span key={index} style={{ fontWeight: 600 }}>
                | {player}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
