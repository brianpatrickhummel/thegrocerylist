import React, { Component } from "react";
import { connect } from "react-redux";
import UserAccounts from "./User/UserAccounts";
import { fetchUser } from "../../actions";
import { Tabs } from "antd";
import styled from "styled-components";
import Diet from "./Diet/Diet";
import Cuisines from "./Cuisines/Cuisines";
import Intolerances from "./Intolerances/Intolerances";
const TabPane = Tabs.TabPane;

class Preferences extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  callback(key) {
    this.setState({
      defaultActiveKey: key
    });
  }

  render() {
    return (
      <TabContainer>
        <Tabs defaultActiveKey={""} onChange={this.callback.bind(this)}>
          <TabPane tab={<SpanText>ACCOUNTS</SpanText>} key="1">
            <UserAccounts />
          </TabPane>
          <TabPane tab={<SpanText>DIET</SpanText>} key="2">
            <Diet />
          </TabPane>
          <TabPane tab={<SpanText>CUISINES</SpanText>} key="4">
            <Cuisines />
          </TabPane>
          <TabPane tab={<SpanText>INTOLERANCES</SpanText>} key="3">
            <Intolerances />
          </TabPane>
        </Tabs>
      </TabContainer>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(Preferences);

const TabContainer = styled.div`
  text-align: center;
`;

const SpanText = styled.span`
  font-weight: bold;
`;
