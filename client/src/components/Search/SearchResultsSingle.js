// Will mount on a new DOM Node as a child of SearchResults component
// Using React16's Portal feature

import React from "react";
import styled from "styled-components";
import { Card, Icon } from "antd";
const { Meta } = Card;

const SearchResultsSingle = props => {
  let { goBack, dataElement, saveRecipe } = props;
  console.log("dataElement at SRS Comp: ", dataElement);
  console.log("dataElement.id: ", dataElement.id);
  return (
    <ModalContainer>
      <Card
        style={{ width: "90%" }}
        cover={<img alt="example" src={dataElement.image} />}
        actions={[
          <Icon type="arrow-left" onClick={goBack} />,
          <Icon type="like" onClick={() => saveRecipe(dataElement.id, dataElement)} />,
          <a href="https://www.google.com" target="about_blank">
            <Icon type="link" onClick={() => console.log("Loading webpage...")} />
          </a>
        ]}
      >
        <Meta
          title={dataElement.title}
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ex et rerum itaque ratione, corrupti explicabo cumque, eligendi non aspernatur ab alias aliquam accusamus magni! Debitis earum facere eveniet. Atque?"
        />
      </Card>
    </ModalContainer>
  );
};

export default SearchResultsSingle;

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
