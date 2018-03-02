import React, { Component } from "react";
import { connect } from "react-redux";
import UserAccounts from "./User/UserAccounts";
import { Tabs } from "antd";
import styled from "styled-components";
import Diet from "./Diet/Diet";
import Cuisines from "./Cuisines/Cuisines";
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class Preferences extends Component {
  render() {
    return (
      <TabContainer>
        <Tabs defaultActiveKey="4" onChange={callback}>
          <TabPane tab={<SpanText>ACCOUNTS</SpanText>} key="1">
            <UserAccounts />
          </TabPane>
          <TabPane tab={<SpanText>DIET</SpanText>} key="2">
            <Diet />
          </TabPane>
          <TabPane tab={<SpanText>INTOLERANCES</SpanText>} key="3">
            List of food allergy types
          </TabPane>
          <TabPane tab={<SpanText>CUISINES</SpanText>} key="4">
            <Cuisines />
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

const SpanText = styled.span`
  font-weight: bold;
`;
