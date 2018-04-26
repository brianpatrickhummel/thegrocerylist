import React from "react";
import UserAccounts from "./User/UserAccounts";
import { Tabs } from "antd";
import styled from "styled-components";
import PrefBox from "./PrefBox/PrefBox";
const TabPane = Tabs.TabPane;

const Preferences = ({ match }) => {
  return (
    <div className="preferencesComponent" style={{ textAlign: "center" }}>
      <Tabs defaultActiveKey={match.params.defaultKey}>
        <TabPane tab={<SpanText>ACCOUNTS</SpanText>} key="1">
          <UserAccounts />
        </TabPane>
        <TabPane tab={<SpanText>DIET</SpanText>} key="2">
          <PrefBox prefType={"diet"} styling={diet} checkedList={{}} />
        </TabPane>
        <TabPane tab={<SpanText>CUISINES</SpanText>} key="3">
          <PrefBox prefType={"cuisines"} styling={cuisines} checkedList={{}} />
        </TabPane>
        <TabPane tab={<SpanText>INTOLERANCES</SpanText>} key="4">
          <PrefBox prefType={"intolerances"} styling={intolerances} checkedList={{}} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Preferences;

const SpanText = styled.span`
  font-weight: bold;
`;

// styling variations for the three versions of the PrefBox components
let diet = {
  CheckBoxColumn: {
    xs: { span: 15, offset: 5 },
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
    xs: { span: 12, offset: 0 },
    sm: { span: 7, offset: 1 }
  },
  CheckBoxContainer: {
    xs: { span: 22, offset: 1 },
    sm: { span: 22, offset: 1 },
    md: { span: 20, offset: 2 }
  }
};

let intolerances = {
  CheckBoxColumn: {
    xs: { span: 14, offset: 7 },
    sm: { span: 7, offset: 1 }
  },
  CheckBoxContainer: {
    xs: { span: 18, offset: 3 },
    sm: { span: 22, offset: 1 },
    md: { span: 20, offset: 2 }
  }
};
