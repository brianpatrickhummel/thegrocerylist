import React, { Component } from "react";
import styled from "styled-components";
import { Collapse, Row, Col, Button, Tooltip } from "antd";
import { connect } from "react-redux";
const Panel = Collapse.Panel;
const FontAwesome = require("react-fontawesome");

class UserAccounts extends Component {
  state = {
    activePanelIsPrimary: false
  };

  renderContent() {
    return (
      this.props.auth && (
        // Primary Account

        <div className="preferencesContainer">
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }}>
            <PanelContainer bordered={true} /*defaultActiveKey={this.state.activePanelIsPrimary && ["1"]}*/>
              <PanelHeader header="PRIMARY ACCOUNT INFORMATION" key="1" showArrow={false}>
                <PanelBody>
                  <Row type="flex" align="middle">
                    <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 2, offset: 0 }}>
                      <FontAwesome className="share-icon" size="2x" name={this.props.auth.primaryAccount} />
                    </InfoTextContainerCol>
                    <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 7, offset: 0 }}>
                      <InfoTextCol xs={{ span: 18, push: 3 }} sm={{ span: 24, push: 0 }}>
                        <InfoText> {this.props.auth.primaryDisplayName}</InfoText>
                      </InfoTextCol>
                      <InfoTextCol xs={{ span: 3, pull: 18 }} sm={{ span: 24, pull: 0 }}>
                        <InfoTextType>NAME</InfoTextType>
                      </InfoTextCol>
                    </InfoTextContainerCol>
                    <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 11, offset: 0 }}>
                      <InfoTextCol xs={{ span: 18, push: 3 }} sm={{ span: 24, push: 0 }}>
                        <InfoText>{this.props.auth.primaryEmail}</InfoText>
                      </InfoTextCol>
                      <InfoTextCol xs={{ span: 3, pull: 18 }} sm={{ span: 24, pull: 0 }}>
                        <InfoTextType>EMAIL</InfoTextType>
                      </InfoTextCol>
                    </InfoTextContainerCol>
                  </Row>
                </PanelBody>
              </PanelHeader>
            </PanelContainer>
          </Col>
          {/* Secondary Account */}
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 22, offset: 1 }}>
            <PanelContainer bordered={true} /*defaultActiveKey={!this.state.activePanelIsPrimary && ["2"]}*/>
              <PanelHeader header="MANAGE LINKED ACCOUNTS" key="2" showArrow={false}>
                <PanelBody>{this.renderLinkedAccounts()}</PanelBody>
              </PanelHeader>
            </PanelContainer>
          </Col>
        </div>
      )
    );
  }

  renderLinkedAccounts() {
    let rowsArray = [];
    var keys = Object.keys(this.props.auth.authProviders);
    for (let i = 0; i < keys.length; i++) {
      let acctObject = this.props.auth.authProviders[keys[i]];
      if (acctObject.isPrimary === false) {
        let newArray = [
          <AccountRows key={i}>
            <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 2, offset: 0 }}>
              <FontAwesome className="share-icon" size="2x" name={keys[i]} />
            </InfoTextContainerCol>
            {/* if acct info, display acct info otherwise display Connect Button */}
            {acctObject.Id ? (
              <div className="linkedAccountsContainer">
                <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 7, offset: 0 }}>
                  <InfoTextCol xs={{ span: 18, push: 3 }} sm={{ span: 24, push: 0 }}>
                    <InfoText> {acctObject.DisplayName}</InfoText>
                  </InfoTextCol>
                  <InfoTextCol xs={{ span: 3, pull: 18 }} sm={{ span: 24, pull: 0 }}>
                    <InfoTextType>NAME</InfoTextType>
                  </InfoTextCol>
                </InfoTextContainerCol>
                <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 11, offset: 0 }}>
                  <InfoTextCol xs={{ span: 18, push: 3 }} sm={{ span: 24, push: 0 }}>
                    <InfoText>{acctObject.Email}</InfoText>
                  </InfoTextCol>
                  <InfoTextCol xs={{ span: 3, pull: 18 }} sm={{ span: 24, pull: 0 }}>
                    <InfoTextType>EMAIL</InfoTextType>
                  </InfoTextCol>
                </InfoTextContainerCol>
                <Col xs={{ span: 16, offset: 4 }} sm={{ span: 3, offset: 0 }}>
                  <ButtonColumns xs={{ span: 8, offset: 2 }} sm={{ span: 8, offset: 0 }}>
                    <Tooltip arrowPointAtCenter placement="topRight" title={<ToolText>MAKE PRIMARY</ToolText>}>
                      <SecondaryButtons
                        size="small"
                        type="primary"
                        href={`/api/setPrimary/${keys[i]}`}
                        data-account={keys[i]}
                      >
                        <ButtonSpanLarge>P</ButtonSpanLarge>
                        <ButtonSpanSmall>PRIMARY</ButtonSpanSmall>
                      </SecondaryButtons>
                    </Tooltip>
                  </ButtonColumns>

                  <ButtonColumns xs={{ span: 8, offset: 4 }} sm={{ span: 8, offset: 4 }}>
                    <Tooltip arrowPointAtCenter placement="topRight" title={<ToolText>UNLINK ACCOUNT</ToolText>}>
                      <SecondaryButtons size="small" type="primary" href={`/unlink/${keys[i]}`} data-account={keys[i]}>
                        <ButtonSpanLarge>U</ButtonSpanLarge>
                        <ButtonSpanSmall>UNLINK</ButtonSpanSmall>
                      </SecondaryButtons>
                    </Tooltip>
                  </ButtonColumns>
                </Col>
              </div>
            ) : (
              /* no acct info, there display Connect Buttons */
              <div className="unlinkedAccountsContainer">
                <span> add options for connecting social media account</span>
              </div>
            )}
          </AccountRows>
        ];
        // Logic to display Linked Accounts above Unlinked Accounts on page
        acctObject.Id ? rowsArray.unshift(newArray) : rowsArray.push(newArray);
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

const InfoTextContainerCol = styled(Col)`
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
  font-size: 12px;
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

const InfoTextCol = styled(Col)`
  display: block;
  overflow: scroll;

  @media (max-width: 768px) {
    display: inline;
  }
`;

const AccountRows = styled(Row)`
  padding: 20px 0;
  border-radius: 10px;
  margin: 10px 0;
  background-color: rgba(63, 23, 24, 0.02);
`;

const SecondaryButtons = styled(Button)`
  border-radius: 50% !important;
  width: 26px !important;
  height: 26px !important;
  margin-top: 10px;
  text-align: center;

  @media (max-width: 575px) {
    width: 100% !important;
    height: 100% !important;
    border-radius: 5px !important;
  }

  &:hover {
    background-color: #6d5151 !important;
    border-color: #6d5151 !important;
  }
`;

const ButtonColumns = styled(Col)`
  text-align: center;
  display: block;
  margin: 0 0 0 5px;

  @media (max-width: 628px) {
    margin-bottom: 5px !important;
  }

  @media (max-width: 575px) {
    margin-top: 15px !important;
  }
`;

const ToolText = styled.span`
  font-size: 10px;
`;

const ButtonSpanLarge = styled.span`
  @media (max-width: 575px) {
    display: none;
  }
`;

const ButtonSpanSmall = styled.span`
  font-size: 9px;
  letter-spacing: 0.05em;
  @media (min-width: 576px) {
    display: none;
  }
`;
