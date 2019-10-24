import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Message,
  Loader
} from "semantic-ui-react";

export default function Login(props) {
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      .post("https://intense-woodland-40601.herokuapp.com/api/login/", inputs)
      .then(response => {
        setErrorMessage("");
        localStorage.setItem("csbuildweek1", response.data.key);
        setInputs({
          username: "",
          password: ""
        });
        setLoader(active => !active);
        props.history.push("/game");
      })
      .catch(err => {
        setLoader(active => !active);
        setErrorMessage("Unable to login. Please try again.");
        setInputs({
          username: "",
          password: ""
        });
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1>Please login to continue:</h1>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            {loader ? (
              <Loader active={loader} size="massive" />
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

                {errorMessage.length > 0 && (
                  <Message negative>
                    <Message.Header>{errorMessage}</Message.Header>
                  </Message>
                )}

                <Button content="Login" primary />
              </Form>
            )}
          </Grid.Column>

          <Grid.Column verticalAlign="middle">
            <Button
              href="/register"
              content="Register!"
              icon="signup"
              size="big"
            />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      <p>CS Build week 1</p>
      <p>Hector - Artin - Jacob - Christian</p>
    </div>
  );
}
