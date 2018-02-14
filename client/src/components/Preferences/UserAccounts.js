import React, { Component } from "react";
import styled from "styled-components";
import { Collapse, Row, Col, Button } from "antd";
import { connect } from "react-redux";
const Panel = Collapse.Panel;
const FontAwesome = require("react-fontawesome");

class UserAccounts extends Component {
  state = {
    activePanelIsPrimary: true
  };

  renderContent() {
    return (
      this.props.auth && (
        // Primary Account

        <div className="preferencesContainer">
          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 22, offset: 1 }}>
            <PanelContainer bordered={true} defaultActiveKey={this.state.activePanelIsPrimary && ["1"]}>
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
          {/* Secondary Account */}
          <Col xs={{ span: 20, offset: 2 }} sm={{ span: 22, offset: 1 }}>
            <PanelContainer bordered={true} defaultActiveKey={!this.state.activePanelIsPrimary && ["2"]}>
              <PanelHeader header="MANAGE LINKED ACCOUNTS" key="2" showArrow={false}>
                <PanelBody>
                  {Object.keys(this.props.auth.authProviders).length > 1 ? this.renderSecondaryRows() : "this is it"}
                </PanelBody>
              </PanelHeader>
            </PanelContainer>
          </Col>
        </div>
      )
    );
  }

  renderSecondaryRows() {
    let rowsArray = [];
    var keys = Object.keys(this.props.auth.authProviders);
    for (let i = 0; i < keys.length; i++) {
      let acctObject = this.props.auth.authProviders[keys[i]];
      if (acctObject.isPrimary === "NO") {
        rowsArray.push([
          <AccountRows key={i}>
            <InfoTextContainer xs={{ span: 22, offset: 1 }} sm={{ span: 2, offset: 0 }}>
              <FontAwesome className="share-icon" size="2x" name={keys[i]} style={{ color: "#1E2529" }} />
            </InfoTextContainer>
            <InfoTextContainer xs={{ span: 22, offset: 1 }} sm={{ span: 9, offset: 1 }}>
              <InfoTextColumns xs={{ span: 20, push: 3 }} sm={{ span: 24, push: 0 }}>
                <InfoText> {acctObject.DisplayName}</InfoText>
              </InfoTextColumns>
              <InfoTextColumns xs={{ span: 3, pull: 20 }} sm={{ span: 24, pull: 0 }}>
                <InfoTextType>NAME</InfoTextType>
              </InfoTextColumns>
            </InfoTextContainer>
            <InfoTextContainer xs={{ span: 22, offset: 1 }} sm={{ span: 9, offset: 1 }}>
              <InfoTextColumns xs={{ span: 20, push: 3 }} sm={{ span: 24, push: 0 }}>
                <InfoText>{acctObject.Email}</InfoText>
              </InfoTextColumns>
              <InfoTextColumns xs={{ span: 3, pull: 20 }} sm={{ span: 24, pull: 0 }}>
                <InfoTextType>EMAIL</InfoTextType>
              </InfoTextColumns>
            </InfoTextContainer>
            <Col xs={{ span: 10, offset: 7 }} sm={{ span: 2, offset: 0 }}>
              <ButtonColumns xs={{ span: 12 }}>
                <SecondaryButtons size="small" type="primary" href="">
                  P
                </SecondaryButtons>
              </ButtonColumns>

              <ButtonColumns xs={{ span: 12 }}>
                <SecondaryButtons size="small" type="primary" href="">
                  U
                </SecondaryButtons>
              </ButtonColumns>
            </Col>
          </AccountRows>
        ]);
      }
    }
    return <div>{rowsArray}</div>;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(UserAccounts);

// = = = = = = CSS = = = = = = = = = = = = = = = = = = = = =
const PanelContainer = styled(Collapse)`
  margin-top: 25px !important;
`;

const PanelHeader = styled(Panel)``;

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
  color: #75292c;
  font-weight: bold;

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
  color: rgba(66, 43, 44, 0.9);
  letter-spacing: 0.01em;

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
  padding: 20px 0;
  background-color: rgba(63, 23, 24, 0.02);
  border-radius: 10px;
  margin: 10px 0;
`;

const SecondaryButtons = styled(Button)`
  border-radius: 50% !important;
  width: 26px !important;
  height: 26px !important;
  margin-top: 10px;

  &:hover {
    background-color: #4f778f !important;
    border-color: #4f778f !important;
  }

  @media (max-width: 480px) {
  }
`;

const ButtonColumns = styled(Col)`
  text-align: center;
  display: block;
  margin-top: 20px !important;
`;
