import React, { Component } from 'react';

/* Plan --
the DrawRoom component would take in the parameters for each individual room,
draw a box for the center of the room
draw some little circles on each exit "n","e","s","w"
*/

function DrawRoom(props) {
	return <h1> Im an individual room, i have exits to the {props.exit_n} {props.exit_e} {props.exit_s} {props.exit_w}</h1>
}
 
export default DrawRoom;
