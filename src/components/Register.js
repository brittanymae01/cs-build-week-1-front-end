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
    password1: "",
    password2: ""
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
      .post("https://intense-woodland-40601.herokuapp.com/api/registration/", inputs)
      .then(response => {
        localStorage.setItem("csbuildweek1", response.data.key);
        setErrorMessage("");
        setInputs({
          username: "",
          password1: "",
          password2: ""
        });
        setLoader(active => !active);
        props.history.push("/game");
      })
      .catch(err => {
        setLoader(active => !active);
        setErrorMessage("Unable to register. Please try again.");
        setInputs({
          username: "",
          password: ""
        });
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1>Please register to continue:</h1>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column verticalAlign="middle">
            <p style={{ textAlign: "center" }}>Already a user?</p>
            <Button href="/login" content="Login!" icon="sign-in" size="big" />
          </Grid.Column>

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
                  id="password1"
                  onChange={handleInputChange}
                  value={inputs.password1}
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Re-enter Password"
                  type="password"
                  id="password2"
                  onChange={handleInputChange}
                  value={inputs.password2}
                />

                {errorMessage.length > 0 && (
                  <Message negative>
                    <Message.Header>{errorMessage}</Message.Header>
                  </Message>
                )}

                <Button content="Register Now" primary />
              </Form>
            )}
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
      <p>CS Build week 1</p>
      <p>Hector - Artin - Jacob - Christian</p>
    </div>
  );
}
