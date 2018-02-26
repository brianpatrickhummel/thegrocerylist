import React, { Component } from "react";
import { connect } from "react-redux";
import UserAccounts from "./User/UserAccounts";
import { Tabs } from "antd";
import styled from "styled-components";
import Diet from "./Diet/Diet";
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class Preferences extends Component {
  render() {
    return (
      <TabContainer>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab={<span>ACCOUNTS</span>} key="1">
            <UserAccounts />
          </TabPane>
          <TabPane tab={<span>DIET</span>} key="2">
            <Diet />
          </TabPane>
          <TabPane tab={<span>INTOLERANCES</span>} key="3">
            List of food allergy types
          </TabPane>
          <TabPane tab={<span>CUISINES</span>} key="4">
            List of Optional Cusines
          </TabPane>
        </Tabs>
      </TabContainer>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Preferences);

const TabContainer = styled.div`
  text-align: center;
`;
