import { Modal, Button, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { unlinkAccount } from "../../actions";
import "../index.css";
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
      <div>
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
`;

const ModalBodyText = styled.p`
  font-size: 17px !important;
`;
