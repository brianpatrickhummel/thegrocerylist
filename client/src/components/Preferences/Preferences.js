import React, { Component } from "react";
import { connect } from "react-redux";
import UserAccounts from "./User/UserAccounts";
import { fetchUser } from "../../actions";
import { Tabs } from "antd";
import styled from "styled-components";
import PrefBox from "./PrefBox/PrefBox";
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
            <PrefBox prefType={"diet"} styling={dietAndIntolerances} />
          </TabPane>
          <TabPane tab={<SpanText>CUISINES</SpanText>} key="4">
            <PrefBox prefType={"cuisines"} styling={cuisines} />
          </TabPane>
          <TabPane tab={<SpanText>INTOLERANCES</SpanText>} key="3">
            <PrefBox prefType={"intolerances"} styling={dietAndIntolerances} />
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

// styling variations for the three versions of the PrefBox components
let dietAndIntolerances = {
  CheckBoxColumn: {
    xs: { span: 16, offset: 2 },
    sm: { span: 7, offset: 1 }
  },
  CheckBoxContainer: {
    xs: { span: 18, offset: 3 },
    sm: { span: 22, offset: 1 },
    md: { span: 20, offset: 2 }
  }
};

let cuisines = {
  CheckBoxColumn: {
    xs: { span: 12 },
    sm: { span: 7, offset: 1 }
  },
  CheckBoxContainer: {
    xs: { span: 22, offset: 1 },
    sm: { span: 22, offset: 1 },
    md: { span: 20, offset: 2 }
  }
};
