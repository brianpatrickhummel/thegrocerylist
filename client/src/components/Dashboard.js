import React, { Component } from "react";
import styled from "styled-components";
import { message, Collapse, Row, Col } from "antd";
import { connect } from "react-redux";
const Panel = Collapse.Panel;
const FontAwesome = require("react-fontawesome");

class Dashboard extends Component {
  state = {
    modalIsOpen: false,
    count: 0
  };

  componentDidMount() {
    // Display welcome modal when user first logs in
    if (!this.state.modalIsOpen && this.state.count === 0) {
      this.setState({ modalIsOpen: true, count: 1 });
    }
  }

  componentDidUpdate() {
    if (this.props.auth && this.state.modalIsOpen) {
      this.success();
    }
  }

  success() {
    message.config({ top: "5%" });
    const hide = message.loading(
      `WELCOME BACK, 
      ${this.props.auth.primaryDisplayName.toUpperCase()}`
    );
    // Dismiss manually and asynchronously
    setTimeout(hide, 1000);
  }

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

  render() {
    return (
      <div className="dashboardContainer">
        <h1>Dashboard</h1>
        {this.renderPrimaryAcct()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Dashboard);

const PanelContainer = styled(Collapse)`
  // margin: 50px !important;
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
