import React from "react";
import { Button, Divider, Form, Grid, Segment } from "semantic-ui-react";

function App() {
  return (
    <div>
      <h1>Hello,</h1>
      <h2>Welcome to our game!</h2>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <Form>
              <Form.Input
                icon="user"
                iconPosition="left"
                label="Username"
                placeholder="Username"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                label="Password"
                type="password"
              />

              <Button content="Login" primary />
            </Form>
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

export default App;
