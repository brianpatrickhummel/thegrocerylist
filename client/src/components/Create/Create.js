import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
// import Spinner from "../Spinner";
import styled from "styled-components";
import ListInput from "./ListInput";
// import axios from "axios";
const logo = require("../../images/LogoGray.svg");

class Create extends Component {
  state = {
    clicked: false
  };

  render() {
    let { clicked } = this.state;
    let { auth } = this.props;
    return !clicked ? (
      <div className="createComponent">
        <Col className="createColumn" xs={{ span: 20, offset: 2 }} style={{ textAlign: "center" }}>
          <TextRow>
            <Text>CREATE GROCERY LIST</Text>
          </TextRow>
          <Row>
            <LogoAnchor onClick={() => this.setState({ clicked: true })}>
              <LogoDiv className="hvr-shrink">
                <LogoImg src={logo} alt="" />
              </LogoDiv>
            </LogoAnchor>
          </Row>
        </Col>
      </div>
    ) : (
      <ListInput auth={auth} />
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Create);

const LogoDiv = styled(Col)`
  background-color: #cbc5c5;
  text-align: center;
  padding: 30px 70px;
  border: 20px solid #b4afaf;
  border-radius: 100px;
  max-width: 400px;
  box-shadow: 0px 0px 85px rgba(255, 255, 255, 0.2);

  @media (max-width: 700px) {
    padding: 28px 60px;
    border: 17px solid #b4afaf;
  }

  @media (max-width: 628px) {
    padding: 24px 50px;
    border: 14px solid #b4afaf;
  }

  @media (max-width: 480px) {
    padding: 20px 40px;
    border: 14px solid #b4afaf;
  }

  @media (max-width: 380px) {
    padding: 15px 35px;
    border: 10px solid #b4afaf;
  }
`;

const LogoImg = styled.img`
  @media (max-width: 480px) {
    max-width: 150px;
  }

  @media (max-width: 380px) {
    max-width: 150px;
  }
`;

const LogoAnchor = styled.a`
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextRow = styled(Row)`
  margin-top: 57px;
  margin-bottom: 57px;
`;

const Text = styled(Col)`
  font-size: 34px;
  letter-spacing: 0.3em;
  text-indent: 0.3em;

  color: rgba(255, 255, 255, 0.5);
  text-align: center;

  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(1, 1, 1, 0.1);

  @media (max-width: 700px) {
    font-size: 30px;
    letter-spacing: 0.2em;
  }

  @media (max-width: 628px) {
    font-size: 24px;
    letter-spacing: 0.15em;
  }

  @media (max-width: 480px) {
    font-size: 21px;
    letter-spacing: 0.1em;
  }

  @media (max-width: 380px) {
    letter-spacing: 0.1em;
    font-size: 20px;
  }
`;
