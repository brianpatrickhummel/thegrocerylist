import React, { Component } from "react";
import { Button } from "antd";
import styled from "styled-components";
const FontAwesome = require("react-fontawesome");

class Landing extends Component {
  renderGooeyButton() {
    return (
      <div className="share" style={{ textAlign: "center" }}>
        <button className="share-toggle-button">
          <FontAwesome className="share-icon" name="user-circle-o" size="2x" />
        </button>
        <ul className="share-items">
          <li className="share-item">
            <a href="#" className="share-button">
              <FontAwesome className="share-icon" name="facebook" />
            </a>
          </li>
          <li className="share-item">
            <a href="#" className="share-button">
              <FontAwesome className="share-icon" name="twitter" />
            </a>
          </li>
          <li className="share-item">
            <a href="/auth/google" className="share-button">
              <FontAwesome className="share-icon" name="google" />
            </a>
          </li>
          <li className="share-item">
            <a href="#" className="share-button">
              <FontAwesome className="share-icon" name="pinterest" />
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      <Wrapper>
        <TitleHeader style={{ marginTop: "120px" }}>GROCERY</TitleHeader>
        <TitleHeader style={{ marginBottom: "20px" }}>LIST</TitleHeader>
        <div>
          <ShoppingCartIcon src={require("../images/ShoppingCartIcon.svg")} />
          <ListIcon src={require("../images/ListIcon.svg")} />
          <SilverWareIcon src={require("../images/SilverWareIcon.svg")} />
        </div>
        <br />
        {/* <Button
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
        </Button> */}
        {this.renderGooeyButton()}
      </Wrapper>
    );
  }
}

export default Landing;

const Wrapper = styled.div`
  text-align: center;
  min-height: 100vh;
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

  @media (max-width: 576px) {
    font-size: 80px;
  }

  @media (max-width: 492px) {
    font-size: 70px;
  }

  @media (max-width: 400px) {
    font-size: 60px;
    line-height: 60px;
  }
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
