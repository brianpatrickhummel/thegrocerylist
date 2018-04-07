import React from "react";
// import { connect } from "react-redux";
import { Col, Row } from "antd";
import styled from "styled-components";

export default ({ cuisine, data }) => {
  const renderContent = data => {
    if (data.length) {
      let content = [];
      for (let item of data) {
        content.push(
          <Column key={item.id} xs={{ offset: 2, span: 20 }} sm={{ offset: 3, span: 18 }} lg={{ offset: 4, span: 16 }}>
            <Row>
              <RecipeTitle id={item.id}>{item.title.toUpperCase()}</RecipeTitle>
            </Row>
            <Row>
              <Image src={item.image} alt="" />
            </Row>
            {/* <a href={item.sourceUrl} target="_blank">
              Read Here
            </a> */}
          </Column>
        );
      }
      return content;
    } else return null;
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
const Column = styled(Col)`
  text-align: center;
  margin: 8px 0 35px 0;
  border: 1px solid rgba(104, 67, 69, 0.2);
  padding: 10px 5px 20px 5px;
  background-color: rgba(104, 67, 69, 0.3);
`;

const Image = styled.img`
  opacity: 0.7;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    max-width: 300px;
  }

  @media (max-width: 628px) {
    max-width: 270px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
  }
`;

const RecipeTitle = styled.p`
  color: #684345;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
