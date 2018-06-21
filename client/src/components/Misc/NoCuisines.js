import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon, Row, Col } from "antd";

export default ({ header, text }) => {
  return (
    <SetCuisinesMessage
      xs={{
        span: 22,
        offset: 1
      }}
      sm={{
        span: 16,
        offset: 4
      }}
      md={{
        span: 12,
        offset: 6
      }}
      lg={{
        span: 10,
        offset: 7
      }}
    >
      <Exclaim type="exclamation-circle" />
      <Horizontal />
      <Row>
        <Col
          xs={{
            span: 18,
            offset: 3
          }}
        >
          <MessageH3>NO CUISINES SELECTED</MessageH3>
        </Col>
      </Row>
      {/* forceUpdate so that Ant Menu selected item changes without having clicked it */}
      <CuisineLink to={"/preferences/3"}>
        PLEASE SET CUISINES PREFERENCES{" "}
        <Icon
          type="rollback"
          style={{
            fontSize: 16
          }}
        />
      </CuisineLink>
    </SetCuisinesMessage>
  );
};

const SetCuisinesMessage = styled(Col)`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  margin-top: 35px;
  padding: 20px 10px;
`;

const CuisineLink = styled(Link)`
  color: #b62b37 !important;
  margin-top: 20px;
  &:hover {
    color: rgba(182, 43, 55, 0.5) !important;
  }
`;

const MessageH3 = styled.h3`
  font-weight: bolder;
  margin-top: 8px;
  color: rgba(104, 67, 69, 0.7);
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;

const Horizontal = styled.hr`
  border-color: rgba(255, 255, 255, 0.2);
`;

const Exclaim = styled(Icon)`
  font-size: 22px;
  color: #b62b37;
  margin-bottom: 10px;
`;
