import React, { Component } from "react";
import { Button } from "antd";
import styled from "styled-components";

class Landing extends Component {
  render() {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <Title>WELCOME & LOGIN PAGE</Title>
        <Button size="large" type="primary" href="/auth/google">
          LogIn With Google
        </Button>
        <div>
          <br />
        </div>
      </Wrapper>
    );
  }
}

export default Landing;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
  font-family: Futura;
`;

const Wrapper = styled.div`
  margin-top: 50px;
`;
