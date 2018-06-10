import { Modal, Button, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { unlinkAccount } from "../../../actions";
import "../../index.css";
import styled from "styled-components";
const FontAwesome = require("react-fontawesome");

class UnlinkModal extends Component {
  state = {
    loading: false,
    visible: false,
    account: ""
  };

  showModal = accountType => {
    this.setState({
      visible: true,
      account: accountType
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    this.props.unlinkAccount(this.state.account);
    this.props.success(`YOUR ${this.state.account.toUpperCase()} HAS BEEN SUCCESSFULLY UNLINKED !`);
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 0);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div className="unlinkModalComponent">
        <Modal
          visible={visible}
          wrapClassName="unlinkModal"
          title={[<Icon key={1} type="question-circle-o" />, ` UNLINK ${this.state.account.toUpperCase()} ACCOUNT `]}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskStyle={{ background: "rgba(28,9,9,0.9)" }}
          footer={[
            <ModalButton key="back" onClick={this.handleCancel}>
              NO, CANCEL
            </ModalButton>,
            <ModalButton key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              YES, UNLINK
            </ModalButton>
          ]}
        >
          <FontAwesome className="share-icon" style={{ color: "#b82933" }} size="2x" name={this.state.account} />
          <ModalBodyText>{`Are you sure that you want to unlink your ${this.state.account.charAt(0).toUpperCase() +
            this.state.account.slice(1)} account ?`}</ModalBodyText>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { unlinkAccount }, null, { withRef: true })(UnlinkModal);

const ModalButton = styled(Button)`
  font-size: 11px !important;

  color: rgba(108, 76, 76, 0.87) !important;
  cursor: default;
  letter-spacing: 0.13em;
  text-indent: 0.1em;
  border: 1px solid rgba(209, 205, 205, 0.6) !important;
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 1) !important;

  &:hover {
    background-color: rgba(109, 81, 81, 0.65) !important;
    border-color: rgba(109, 81, 81, 0.75) !important;
  }
`;

const ModalBodyText = styled.p`
  font-size: 16px !important;
  color: #b82933 !important;
  margin-top: 10px;
`;
