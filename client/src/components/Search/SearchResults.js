import React from "react";
// import { connect } from "react-redux";
// import { Col } from "antd";
import styled from "styled-components";

export default ({ cuisine, data }) => {
  const renderContent = data => {
    return data.results ? <h1>{JSON.stringify(data)}</h1> : null;
  };

  return (
    <div>
      <Header>{cuisine}</Header>
      {renderContent(data)}
    </div>
  );
};

const Header = styled.h1`
  color: #2e3539;
  text-align: center;
  margin-top: 58px;
  letter-spacing: 0.1em;
  background-color: rgba(255, 255, 255, 0.5);

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
