import React, { Component } from "react";
import { Button } from "antd";
import styled from "styled-components";

class Landing extends Component {
  render() {
    return (
      <Wrapper style={{ textAlign: "center" }}>
        <TitleHeader style={{ marginTop: "120px" }}>GROCERY</TitleHeader>
        <TitleHeader style={{ marginBottom: "20px" }}>LIST</TitleHeader>
        <ShoppingCartIcon src={require("../images/ShoppingCartIcon.svg")} />
        <ListIcon src={require("../images/ListIcon.svg")} />
        <SilverWareIcon src={require("../images/SilverWareIcon.svg")} />
        <br />
        <Button
          style={{
            marginTop: "50px",
            letterSpacing: "0.1em",
            wordSpacing: ".4em",
            color: "rgba(255,255,255,0.7)"
          }}
          size="large"
          type="primary"
          href="/auth/google"
        >
          LOGIN WITH GOOGLE
        </Button>
        <div>
          <br />
        </div>
      </Wrapper>
    );
  }
}

export default Landing;

const Wrapper = styled.div`
  margin-top: 50px;
  height: 100vh;
`;

const TitleHeader = styled.h1`
  font-family: futura;
  font-size: 90px;
  color: #3f1718;
  font-weight: bolder;
  margin-bottom: 20px;
  line-height: 90px;
  text-shadow: 1px 1px 6px rgba(1, 1, 1, 0.1), -1px -1px 6px rgba(1, 1, 1, 0.1);
  letter-spacing: 0.08em;
  text-indent: 0.075em;
`;

const ListIcon = styled.img`
  height: 110px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const SilverWareIcon = styled.img`
  height: 44px;
  margin: 20px;
  margin-top: 35px;
`;

const ShoppingCartIcon = styled.img`
  height: 45px;
  margin: 20px;
  margin-top: 37px;
`;
