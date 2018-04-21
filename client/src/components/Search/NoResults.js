import React from "react";
import { Col, Icon } from "antd";
import styled from "styled-components";

export default () => {
  return (
    <Column
      className="noResultsColumn"
      xs={{ span: 20, offset: 2 }}
      sm={{ span: 18, offset: 3 }}
      lg={{ span: 16, offset: 4 }}
    >
      <Header>
        <Icon type="frown-o" /> NO RECIPES FOUND
      </Header>
      <Text>TRY SEARCHING ANOTHER CUISINE OR MAKING ADJUSTMENTS TO YOUR PREFERENCES</Text>
    </Column>
  );
};

const Column = styled(Col)`
  text-align: center;
  margin-top: 8px;
  margin-bottom: 15px;
  border: 1px solid rgba(104, 67, 69, 0.05);
  border-radius: 2px;
  padding: 10px 5px 20px 5px;
  background-color: rgba(104, 67, 69, 0.1);
`;

const Header = styled.p`
  color: rgba(89, 57, 59, 0.9);
  font-size: 16px;

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-weight: bolder;
  }
`;

const Text = styled.p`
  font-size: 10px;
  letter-spacing: 0.1em;
  text-indent: 0.05em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0 !important;
`;
