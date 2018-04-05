import React from "react";
// import { connect } from "react-redux";
// import { Col } from "antd";
import styled from "styled-components";

export default ({ cuisine, data }) => {
  const renderContent = data => {
    if (data.length) {
      let content = [];
      for (let item of data) {
        let imgsrc = `https://spoonacular.com/recipeImages/${item.image}`;
        content.push(
          <div>
            <p id={item.id} key={item.id}>
              {item.title}
            </p>
            <img src={imgsrc} alt="" />
          </div>
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
