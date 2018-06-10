import React, { Component } from "react";
import styled from "styled-components";
import { Collapse, Row, Col, Button, Tooltip, message } from "antd";
import { connect } from "react-redux";
import { setPrimary, connectAccount } from "../../../actions";
import UnlinkModal from "./UnlinkModal";
const Panel = Collapse.Panel;
const FontAwesome = require("react-fontawesome");

class UserAccounts extends Component {
  renderModal(accountType) {
    // calls the showModal method from child UnlinkModal component via react-redux Connect's getWrappedInstance
    this.refs.UnlinkModal.getWrappedInstance().showModal(accountType, this.success);
  }

  // Message to display when primary account or unlink features are executed
  success(text) {
    message.config({
      top: "25%",
      duration: 1.3
    });
    message.success(text);
  }

  renderContent(auth) {
    return (
      this.props.auth && (
        <Row className="userAccountsComponent">
          {/* Primary Account */}
          <Col
            xs={{ span: 22, offset: 1 }}
            md={{ span: 20, offset: 2 }}
            lg={{ span: 18, offset: 3 }}
            xl={{ span: 16, offset: 4 }}
          >
            <PanelContainer bordered={true} defaultActiveKey={"1"}>
              <Panel header="PRIMARY ACCOUNT INFORMATION" key="1" showArrow={false}>
                <Row type="flex" align="middle">
                  <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 2, offset: 0 }}>
                    <FontAwesome className="share-icon" size="2x" name={auth.primaryAccount} />
                  </InfoTextContainerCol>
                  <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 7, offset: 0 }}>
                    <InfoTextCol xs={{ span: 18, push: 3 }} sm={{ span: 24, push: 0 }}>
                      <InfoText> {auth.primaryDisplayName}</InfoText>
                    </InfoTextCol>
                    <InfoTextCol xs={{ span: 3, pull: 18 }} sm={{ span: 24, pull: 0 }}>
                      <InfoTextType>NAME</InfoTextType>
                    </InfoTextCol>
                  </InfoTextContainerCol>
                  <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 11, offset: 0 }}>
                    <InfoTextCol xs={{ span: 18, push: 3 }} sm={{ span: 24, push: 0 }}>
                      <InfoText>{auth.primaryEmail}</InfoText>
                    </InfoTextCol>
                    <InfoTextCol xs={{ span: 3, pull: 18 }} sm={{ span: 24, pull: 0 }}>
                      <InfoTextType>EMAIL</InfoTextType>
                    </InfoTextCol>
                  </InfoTextContainerCol>
                </Row>
              </Panel>
            </PanelContainer>
          </Col>
          {/* Secondary Accounts */}
          <Col
            xs={{ span: 22, offset: 1 }}
            md={{ span: 20, offset: 2 }}
            lg={{ span: 18, offset: 3 }}
            xl={{ span: 16, offset: 4 }}
          >
            <PanelContainer bordered={true}>
              <Panel header="MANAGE LINKED ACCOUNTS" key="2" showArrow={false}>
                {this.renderLinkedAccounts(auth)}
              </Panel>
            </PanelContainer>
          </Col>
        </Row>
      )
    );
  }

  renderLinkedAccounts(auth) {
    let rowsArray = [];
    Object.keys(auth.authProviders).forEach((key, i) => {
      let acctObject = auth.authProviders[key];
      if (acctObject.isPrimary === false) {
        let newArray = [
          <AccountRows key={i}>
            <InfoTextContainerCol xs={{ span: 22, offset: 1 }} sm={{ span: 2, offset: 0 }}>
              <FontAwesome className="share-icon" size="2x" name={key} />
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
                    <Tooltip
                      trigger="hover"
                      arrowPointAtCenter
                      placement="top"
                      title={<ToolText>MAKE PRIMARY</ToolText>}
                    >
                      <SecondaryButtons
                        size="small"
                        type="primary"
                        data-account={key}
                        onClick={() => {
                          this.props.setPrimary(key);
                          this.success(`YOUR ${key.toUpperCase()} ACCOUNT HAS BEEN SET AS PRIMARY`);
                        }}
                      >
                        <ButtonSpanLarge>P</ButtonSpanLarge>
                        <ButtonSpanSmall>PRIMARY</ButtonSpanSmall>
                      </SecondaryButtons>
                    </Tooltip>
                  </ButtonColumns>

                  <ButtonColumns xs={{ span: 8, offset: 4 }} sm={{ span: 8, offset: 4 }}>
                    <Tooltip
                      trigger="hover"
                      arrowPointAtCenter
                      placement="top"
                      title={<ToolText>UNLINK ACCOUNT</ToolText>}
                    >
                      <SecondaryButtons
                        size="small"
                        type="primary"
                        data-account={key}
                        onClick={() => {
                          this.renderModal(key);
                        }}
                      >
                        <ButtonSpanLarge>U</ButtonSpanLarge>
                        <ButtonSpanSmall>UNLINK</ButtonSpanSmall>
                      </SecondaryButtons>
                    </Tooltip>
                  </ButtonColumns>
                </Col>
              </div>
            ) : (
              /* no acct info, display Connect Buttons */
              <UnlinkedAccountsContainer xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 0 }}>
                <UnlinkedButton size="small" type="primary" data-account={key} href={`/connect/${key}`}>
                  <UnlinkedButtonText>CONNECT {key.toUpperCase()}</UnlinkedButtonText>
                </UnlinkedButton>
              </UnlinkedAccountsContainer>
            )}
          </AccountRows>
        ];
        // Logic to display Linked Accounts above Unlinked Accounts on page
        acctObject.Id ? rowsArray.unshift(newArray) : rowsArray.push(newArray);
      }
    });
    return <div>{rowsArray}</div>;
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="userAccountsComponent">
        {this.renderContent(auth)}
        <UnlinkModal ref="UnlinkModal" success={this.success} />
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  { setPrimary, connectAccount }
)(UserAccounts);

const PanelContainer = styled(Collapse)`
  margin: 10px 0 !important;

  @media (max-width: 480px) {
    margin: 15px 0 !important;
  }
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

  font-size: 12px !important;
  color: rgba(108, 76, 76, 0.87) !important;
  cursor: default;
  letter-spacing: 0.13em;
  text-indent: 0.1em;
  border: 1px solid rgba(209, 205, 205, 0.6) !important;
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 1) !important;

  @media (max-width: 575px) {
    width: 100% !important;
    height: 100% !important;
    font-size: 12px !important;
    color: rgba(108, 76, 76, 0.87) !important;

    cursor: default;
    letter-spacing: 0.13em;
    text-indent: 0.1em;
    border: 1px solid rgba(209, 205, 205, 0.6) !important;
    border-radius: 20px !important;
    background-color: rgba(255, 255, 255, 1) !important;
  }

  &:hover {
    background-color: rgba(109, 81, 81, 0.65) !important;
    border-color: rgba(109, 81, 81, 0.75) !important;
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
    margin-top: 10px !important;
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
  padding-bottom: 2px !important;
  @media (min-width: 576px) {
    display: none;
  }
`;

const UnlinkedAccountsContainer = styled(Col)`
  text-align: center;
`;

const UnlinkedButton = styled(Button)`
  font-size: 12px !important;
  color: rgba(108, 76, 76, 0.87) !important;
  cursor: default;
  letter-spacing: 0.13em;
  text-indent: 0.1em;
  border: 1px solid rgba(209, 205, 205, 0.6) !important;
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 1) !important;

  @media (max-width: 575px) {
    margin-top: 10px !important;
  }

  &:hover {
    background-color: rgba(122, 77, 78, 0.4) !important;
    border-color: rgba(122, 77, 78, 0.5) !important;
  }
`;

const UnlinkedButtonText = styled.span`
  padding: 7px;
`;
