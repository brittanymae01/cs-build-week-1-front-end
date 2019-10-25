import React, { useState, useEffect } from 'react';
import {Button, Loader, Message} from "semantic-ui-react";
import axios from "axios";

export default function Game (props){
	const [loading, setLoading] = useState(false);

	// Sets initial data & then the actual data once we have it for the following
	// username, room name, description of the room & gets players currently in the room
	const [initialData, setInitialData] = useState({
		username: "",
		roomName: "",
		roomDescription: "",
		playersInCurrentRoom: [],
		error_msg: ""
	});

	useEffect(() => {
		axios
		  	.get("https://intense-woodland-40601.herokuapp.com/api/adv/init/", {
				headers: {
			  	Authorization: `Token ${localStorage.getItem("csbuildweek1")}`
				}
		  	})
		  	.then(response => {
				console.log(response);
				setInitialData(responseData => ({
			  	...responseData,
			  		username: response.data.name,
			  		roomName: response.data.title,
			  		roomDescription: response.data.description,
					playersInCurrentRoom: response.data.players,

			}));
		  })
		  	.catch(err => {
				console.log(err.response);
		  	});
	}, []);

	const handleMove = move => {
		setLoading(active => !active);
		axios
		  .post(
			"https://intense-woodland-40601.herokuapp.com/api/adv/move/",
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
			  playersInCurrentRoom: response.data.players,
			  error_msg: response.data.error_msg
			}));
	
			setLoading(active => !active);
		  })
		  .catch(err => {
			console.log(err.response);
		  });
	  };
	
	const handleLogout = () =>{
		localStorage.removeItem("csbuildweek1");
		props.history.push('/');
	}
	
	return(
		<div className="game_core">
			<div className="logout">
				<Button onClick={handleLogout}> Log out </Button>
			</div>
		
			<div className="room_data">
				<h2> We are currently in the {initialData.roomName}.</h2>
				<h3>{initialData.roomDescription}</h3>

			</div>

			<div className="room_movement">
			<Button onClick={() => handleMove("w")} content="West" icon="angle double left" size="big" color="green" />
            <Button onClick={() => handleMove("n")} content="North" icon="angle double up" size="big" color="teal" />
            <Button onClick={() => handleMove("e")} content="East" icon="angle double right" size="big" color="green" />
            <Button onClick={() => handleMove("s")} content="South" icon="angle double down" size="big" color="blue" />
			</div>

			<div className="room_visualizer">
				Somehow visualize the rooms
			</div>

		</div>
	)
}
