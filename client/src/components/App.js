import React, { Component } from "react";
import { Row, Col, Icon, Button } from "antd";
import "antd/dist/antd.css";

class App extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Welcome & Login Page</h1>
        <Button type="primary" ghost>
          <a href="/auth/google">LogIn With Google</a>
        </Button>
      </div>
    );
  }
}

export default App;
