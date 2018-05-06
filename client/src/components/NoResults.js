import React from "react";
import { Col, Icon } from "antd";
import styled from "styled-components";

export default ({ header, text }) => {
  return (
    <Column
      className="noResultsColumn"
      xs={{ span: 20, offset: 2 }}
      sm={{ span: 18, offset: 3 }}
      lg={{ span: 16, offset: 4 }}
    >
      <Header>
        <Icon type="frown-o" /> {header}
      </Header>
      <Text>{text}</Text>
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
  background-color: rgba(1, 1, 1, 0.014);
  box-shadow: inset 0px 0px 10px rgba(1, 1, 1, 0.02);
`;

const Header = styled.p`
  color: rgba(89, 57, 59, 0.7);
  font-size: 18px;
  margin: 10px !important;

  @media (max-width: 992px) {
    color: rgba(89, 57, 59, 0.75);
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    color: rgba(89, 57, 59, 0.8);
  }

  @media (max-width: 480px) {
    color: rgba(89, 57, 59, 0.9);
    font-weight: bolder;
  }
`;

const Text = styled.p`
  letter-spacing: 0.1em;
  text-indent: 0.05em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0 !important;
  color: rgba(255, 255, 255, 1);
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(1, 1, 1, 0.1);

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
