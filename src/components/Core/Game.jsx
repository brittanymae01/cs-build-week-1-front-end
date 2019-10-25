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
			  		playersInCurrentRoom: response.data.players
			}));
		  })
		  	.catch(err => {
				console.log(err.response);
		  	});
	}, []);

	
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
				<h2> We are currently in the _____ Room</h2>
			</div>

			<div className="room_movement">
				<p> We can move in these directions </p>
			</div>

			<div className="room_visualizer">
				Somehow visualize the rooms
			</div>

		</div>
	)
}
