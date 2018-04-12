import React from "react";
import styled from "styled-components";
import { Col, Card, Icon } from "antd";
const { Meta } = Card;

const SearchResultsSingle = ({ history }) => {
  return (
    <RecipeColumn xs={{ span: 22, offset: 1 }} sm={{ span: 12, offset: 6 }}>
      <Card
        style={{ width: "100%" }}
        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
        actions={[
          <Icon type="arrow-left" onClick={() => console.log("Going back in history...")} />,
          <Icon type="like" onClick={() => console.log("Clicked, Saving...")} />,
          <a href="https://www.google.com" target="about_blank">
            <Icon type="link" onClick={() => console.log("Loading webpage...")} />
          </a>
        ]}
      >
        <Meta
          title="Card title"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ex et rerum itaque ratione, corrupti explicabo cumque, eligendi non aspernatur ab alias aliquam accusamus magni! Debitis earum facere eveniet. Atque?"
        />
      </Card>
    </RecipeColumn>
  );
};

export default SearchResultsSingle;

const RecipeColumn = styled(Col)`
  margin-top: 25px;
`;
