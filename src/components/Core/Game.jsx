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
			

		</div>
	)
}
