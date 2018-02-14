import React, { Component } from "react";
import styled from "styled-components";
import { Collapse, Row, Col, Button } from "antd";
import { connect } from "react-redux";
const Panel = Collapse.Panel;
const FontAwesome = require("react-fontawesome");

class Preferences extends Component {
  renderPrimaryAcct() {
    return this.props.auth ? (
      <Col xs={{ span: 20, offset: 2 }} sm={{ span: 22, offset: 1 }}>
        <PanelContainer bordered={true} defaultActiveKey={["1"]}>
          <PanelHeader header="PRIMARY ACCOUNT INFORMATION" key="1" showArrow={false}>
            <PanelBody>
              <Row type="flex" align="middle">
                <InfoTextContainer xs={{ span: 22, offset: 1 }} sm={{ span: 2, offset: 0 }}>
                  <FontAwesome
                    className="share-icon"
                    size="2x"
                    name={this.props.auth.primaryAccount}
                    style={{ color: "#1E2529" }}
                  />
                </InfoTextContainer>
                <InfoTextContainer xs={{ span: 22, offset: 1 }} sm={{ span: 10, offset: 1 }}>
                  <InfoTextColumns xs={{ span: 20, push: 3 }} sm={{ span: 24, push: 0 }}>
                    <InfoText> {this.props.auth.primaryDisplayName}</InfoText>
                  </InfoTextColumns>
                  <InfoTextColumns xs={{ span: 3, pull: 20 }} sm={{ span: 24, pull: 0 }}>
                    <InfoTextType>NAME</InfoTextType>
                  </InfoTextColumns>
                </InfoTextContainer>
                <InfoTextContainer xs={{ span: 22, offset: 1 }} sm={{ span: 10, offset: 1 }}>
                  <InfoTextColumns xs={{ span: 20, push: 3 }} sm={{ span: 24, push: 0 }}>
                    <InfoText>{this.props.auth.primaryEmail}</InfoText>
                  </InfoTextColumns>
                  <InfoTextColumns xs={{ span: 3, pull: 20 }} sm={{ span: 24, pull: 0 }}>
                    <InfoTextType>EMAIL</InfoTextType>
                  </InfoTextColumns>
                </InfoTextContainer>
              </Row>
            </PanelBody>
          </PanelHeader>
        </PanelContainer>
      </Col>
    ) : null;
  }

  renderSecondaryAccts() {
    return (
      this.props.auth && (
        <Col xs={{ span: 20, offset: 2 }} sm={{ span: 22, offset: 1 }}>
          <PanelContainer bordered={true} defaultActiveKey={[""]}>
            <PanelHeader header="MANAGE LINKED ACCOUNTS" key="1" showArrow={false}>
              <PanelBody>
                {Object.keys(this.props.auth.authProviders).length > 1 ? this.renderRows() : "this is it"}
              </PanelBody>
            </PanelHeader>
          </PanelContainer>
        </Col>
      )
    );
  }

  renderRows() {
    let rowsArray = [];
    var keys = Object.keys(this.props.auth.authProviders);
    for (let i = 0; i < keys.length; i++) {
      let acctObject = this.props.auth.authProviders[keys[i]];
      if (acctObject.isPrimary === "NO") {
        rowsArray.push([]);
      }
    }
    return <div>{rowsArray}</div>;
  }

  render() {
    return (
      <div className="preferencesContainer">
        <div className="primaryAccount">{this.renderPrimaryAcct()}</div>
        <div className="secondaryAccounts">{this.renderSecondaryAccts()}</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Preferences);

// = = = = = = CSS = = = = = = = = = = = = = = = = = = = = =
const PanelContainer = styled(Collapse)`
  margin-top: 25px !important;
`;

const PanelHeader = styled(Panel)`
  &:hover {
  }
`;

const PanelBody = styled.div`
  // margin: 15px 20px !important;
`;

const InfoTextContainer = styled(Col)`
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

const InfoTextType = styled.span`
  font-size: 12px;
  color: red;

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 628px) {
    font-size: 8px;
  }
`;

const InfoText = styled.span`
  font-size: 16px;
  margin: 0px 0px;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 628px) {
    font-size: 10px;
  }
`;

const InfoTextColumns = styled(Col)`
  display: block;

  @media (max-width: 768px) {
    display: inline;
  }
`;

const AccountRows = styled(Row)`
  padding: 10px 0;
`;

const SecondaryButtons = styled(Button)`
  border-radius: 50% !important;
  width: 26px !important;
  height: 26px !important;
  margin-top: 20px !important;

  @media (max-width: 480px) {
  }
`;
