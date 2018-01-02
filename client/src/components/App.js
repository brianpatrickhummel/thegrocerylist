import React, { Component } from "react";
import { Icon, Button, DatePicker } from "antd";
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome & Login Page</h1>
        <Icon type="step-backward" />
        <Button type="primary" ghost>
          <a href="/auth/google">LogIn With Google</a>
        </Button>
        <div>
          <DatePicker onChange={onChange} />
          <br />
          <MonthPicker onChange={onChange} placeholder="Select month" />
          <br />
          <RangePicker onChange={onChange} />
          <br />
          <WeekPicker onChange={onChange} placeholder="Select week" />
        </div>
      </div>
    );
  }
}

export default App;
