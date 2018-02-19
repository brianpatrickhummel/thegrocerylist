import { Modal, Button } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { unlinkAccount } from "../../actions";

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
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { unlinkAccount }, null, { withRef: true })(UnlinkModal);
