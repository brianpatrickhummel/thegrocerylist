import React from "react";
import UserAccounts from "./User/UserAccounts";
import { Tabs } from "antd";
import styled from "styled-components";
import PrefBox from "./PrefBox/PrefBox";
const TabPane = Tabs.TabPane;

const Preferences = ({ match }) => {
  console.log(match.params.defaultKey);
  return (
    <div className="preferencesComponent" style={{ textAlign: "center" }}>
      <Tabs defaultActiveKey={match.params.defaultKey}>
        <TabPane tab={<SpanText className="hvr-shrink">ACCOUNTS</SpanText>} key="1">
          <UserAccounts />
        </TabPane>
        <TabPane tab={<SpanText className="hvr-shrink">DIET</SpanText>} key="2">
          <PrefBox prefType={"diet"} styling={diet} />
        </TabPane>
        <TabPane tab={<SpanText className="hvr-shrink">CUISINES</SpanText>} key="3">
          <PrefBox prefType={"cuisines"} styling={cuisines} />
        </TabPane>
        <TabPane tab={<SpanText className="hvr-shrink">INTOLERANCES</SpanText>} key="4">
          <PrefBox prefType={"intolerances"} styling={intolerances} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Preferences;

const SpanText = styled.span`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(1, 1, 1, 0.1);

  @media (max-width: 576px) {
    letter-spacing: 0.1em;
  }

  @media (max-width: 430px) {
    letter-spacing: 0em;
  }
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
