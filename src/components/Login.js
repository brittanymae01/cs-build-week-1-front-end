import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Dimmer,
  Loader
} from "semantic-ui-react";

export default function Login(props) {
  const [loader, setLoader] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  });

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.id]: event.target.value
    }));
    console.log(inputs);
  };

  const handleLogin = event => {
    event.preventDefault();
    setLoader(active => !active);
    axios
      .post("https://lambda-mud-test.herokuapp.com/api/login/", inputs)
      .then(response => {
        localStorage.setItem("csbuildweek1", response.data.key);
        setInputs({
          username: "",
          password: ""
        });
        setLoader(active => !active);
        props.history.push("/game");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1>Hello,</h1>
      <h2>Welcome to our game!</h2>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            {loader ? (
              <Segment>
                <Dimmer active={loader}>
                  <Loader />
                </Dimmer>
              </Segment>
            ) : (
              <Form onSubmit={handleLogin}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Username"
                  placeholder="Username"
                  id="username"
                  onChange={handleInputChange}
                  value={inputs.username}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                  value={inputs.password}
                />

                <Button content="Login" primary />
              </Form>
            )}
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button content="Register!" icon="signup" size="big" />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      <p>CS Build week 1</p>
      <p>Hector - Artin - Jacob - Christian</p>
    </div>
  );
}
