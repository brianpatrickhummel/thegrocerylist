import React, { Component } from "react";
import { Button, DatePicker } from "antd";
import styled from "styled-components";
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: white;
`;

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Title>Welcome & Login Page</Title>
        <Button type="primary">
          <a href="/auth/google">LogIn With Google</a>
        </Button>
        <div>
          <br />
          <RangePicker onChange={onChange} />
          <br />
        </div>
      </div>
    );
  }
}

export default Landing;
