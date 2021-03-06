import React, { Component } from "react";
import styled from "styled-components";
const FontAwesome = require("react-fontawesome");

class Landing extends Component {
  renderGooeyButton() {
    let acctTypes = ["facebook", "twitter", "google", "github"];
    let menuList = [];
    //render 4 Social Media Account login buttons
    for (let acct of acctTypes) {
      menuList.push(
        <li key={acct} className="share-item">
          <a href={`/auth/${acct}`} className="share-button" id={acct}>
            <FontAwesome className="share-icon" name={acct} />
          </a>
        </li>
      );
    }
    return (
      <div className="share">
        <button className="share-toggle-button">
          <FontAwesome className="share-icon" name="user-circle-o" size="2x" />
        </button>
        <ul className="share-items">{menuList}</ul>
      </div>
    );
  }

  render() {
    return (
      <Wrapper>
        <TitleHeader style={{ marginTop: "120px" }}>GROCERY</TitleHeader>
        <TitleHeader style={{ marginBottom: "20px" }}>LIST</TitleHeader>
        <ImageContainer>
          <ShoppingCartIcon src={require("../images/ShoppingCartIconDark.svg")} />
          <ListIcon src={require("../images/ListDark.svg")} />
          <SilverWareIcon src={require("../images/SilverWareIconDark.svg")} />
        </ImageContainer>
        <br />
        {this.renderGooeyButton()}
      </Wrapper>
    );
  }
}

export default Landing;

const Wrapper = styled.div`
  text-align: center;
`;

const ImageContainer = styled.div`
  margin-right: 9px;
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
