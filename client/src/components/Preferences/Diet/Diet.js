import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Checkbox, Button } from "antd";
import { connect } from "react-redux";

let defaultCheckedList = {};

class Diet extends Component {
  state = {
    checkedList: defaultCheckedList,
    showButtons: false
  };

  setDefaultChecked() {
    // will only run once, if the defaultCheckedList has not been assigned values from the auth object in redux store
    if (!Object.keys(defaultCheckedList).length) {
      for (let key in this.props.auth.preferences.dietTypes) {
        defaultCheckedList[key] = this.props.auth.preferences.dietTypes[key];
      }
    }
  }

  // when checkbox is clicked, cance/save buttons will render and state will be updated with new "checked" value
  onChange = e => {
    defaultCheckedList[e.target.value] = e.target.checked;
    this.setState({
      checkedList: defaultCheckedList,
      showButtons: true
    });
  };

  // cancel button will reset to default checkboxes and remove cancel/save buttons
  onCancel = () => {
    console.log("ran onCancel");
    defaultCheckedList = {};
    this.setState({
      checkedList: defaultCheckedList,
      showButtons: false
    });
  };

  renderContent() {
    if (this.props.auth) {
      // once auth is loaded from redux, then set the initial state by assigning values to defaultCheckedList
      this.setDefaultChecked();
      let content = [];
      let objectpath = this.props.auth.preferences.dietTypes;
      for (let key in objectpath) {
        content.push(
          <CheckBoxColumn xs={{ span: 16, offset: 4 }} sm={{ span: 7, offset: 1 }} key={key}>
            <Checkbox checked={this.state.checkedList[key]} onChange={this.onChange} value={key}>
              {key.toUpperCase()}
            </Checkbox>
          </CheckBoxColumn>
        );
      }
      return content;
    }
  }

  render() {
    return (
      <DietContainer xs={{ span: 18, offset: 3 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
        <CheckBoxRow type="flex" justify="center">
          {this.renderContent()}
        </CheckBoxRow>
        {/* if user clicks any checkbox, these buttons will render  */}
        {this.state.showButtons && (
          <ButtonRow>
            <Col xs={{ span: 10, offset: 2 }} sm={{ span: 4, offset: 8 }}>
              <Button onClick={this.onCancel}>Cancel</Button>
            </Col>
            <Col xs={{ span: 10 }} sm={{ span: 4 }}>
              <Button onClick={() => console.log(defaultCheckedList)}>Save</Button>
            </Col>
          </ButtonRow>
        )}
      </DietContainer>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Diet);

const DietContainer = styled(Col)`
  background: #fafafa;
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
  margin-top: 25px !important;
`;

const CheckBoxRow = styled(Row)`
  text-align: left;
  margin: 20px;
`;

const CheckBoxColumn = styled(Col)`
  margin: 10px 0 !important;
  @media (max-width: 480px) {
    margin: 9px 0 !important;
  }
`;

const ButtonRow = styled(Row)`
  margin: 25px 0 !important;
`;
