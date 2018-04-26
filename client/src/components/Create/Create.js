import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
// import Spinner from "../Spinner";
import styled from "styled-components";
// import axios from "axios";
const logo = require("../../images/LogoGray.svg");

class Create extends Component {
  state = {
    clicked: false
  };

  render() {
    let { clicked } = this.state;
    return !clicked ? (
      <div className="createComponent">
        <Col className="createColumn" xs={{ span: 20, offset: 2 }} style={{ textAlign: "center" }}>
          <Row>
            <Text>CREATE GROCERY LIST</Text>
          </Row>
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
      <h6>clicked</h6>
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
  @media (max-width: 768px) {
  }
`;

const LogoImg = styled.img`
  @media (max-width: 768px) {
  }
`;

const LogoAnchor = styled.a`
  &:hover {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Text = styled.p`
  margin-top: 100px;
  color: rgba(1, 1, 1, 0.27);
  font-size: 28px;
  letter-spacing: 0.03em;
  text-indent: 0.015em;
`;
