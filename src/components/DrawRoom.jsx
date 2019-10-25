import React, { Component } from 'react';

/* Plan --
the DrawRoom component would take in the parameters for each individual room,
draw a box for the center of the room
draw some little circles on each exit "n","e","s","w"
*/

const DrawRoom = (props) =>{
	console.log("We rendered room number: x")
	
	return(
		<div className="room">
			im a row of 10???
			{this.props}
		</div>
	)
}
 
export default DrawRoom;
