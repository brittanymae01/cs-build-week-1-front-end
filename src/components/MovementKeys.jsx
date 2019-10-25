import React, { Component } from 'react';


// Conditionally renders movement keys if there is a room to the corrosponding direction
function MovementKeys() {
	return class extends Component {
		constructor(props) {
			super(props);
		}
 
		render() {
			<div className="movement_keys" style={{ marginBottom: "40px" }}>
            <h1>Make a move!</h1>

            {initialData.error_msg.length > 0 && (
              <Message negative>
                <Message.Header>
                  We're sorry! {initialData.error_msg}
                </Message.Header>
                <p>Looks like you can't move there, please try a diffrent room</p>
              </Message>
            )}

            <Button onClick={() => handleMove("w")} content="West" icon="angle double left" size="big" color="green" />
            <Button onClick={() => handleMove("n")} content="North" icon="angle double up" size="big" color="teal" />
            <Button onClick={() => handleMove("e")} content="East" icon="angle double right" size="big" color="green" />
            <Button onClick={() => handleMove("s")} content="South" icon="angle double down" size="big" color="blue" />
            
          </div>
		}
	}
}

export default MovementKeys;
