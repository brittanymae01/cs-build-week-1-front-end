import React, { Component } from 'react';
import {Button} from "semantic-ui-react";

export default function Game (props){
	
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
