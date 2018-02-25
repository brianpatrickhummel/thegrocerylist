import { Modal, Button, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { unlinkAccount } from "../../actions";
import "../index.css";

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
    }, 2000);
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
          title={[<Icon type="question-circle-o" />, ` UNLINK ${this.state.account.toUpperCase()} ACCOUNT`]}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              NO, CANCEL
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              YES, UNLINK
            </Button>
          ]}
        >
          <p>{`Are you sure that you want to unlink your ${this.state.account.charAt(0).toUpperCase() +
            this.state.account.slice(1)} account ?`}</p>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { unlinkAccount }, null, { withRef: true })(UnlinkModal);
