import React, { Component } from "react";
import { Button, DatePicker } from "antd";
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome & Login Page</h1>
        <Button type="primary" ghost>
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

export default App;
