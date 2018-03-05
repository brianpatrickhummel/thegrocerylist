import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Checkbox, Button, message } from "antd";
import { connect } from "react-redux";
import { updatePrefs } from "../../../actions";

let checkedList = {};

const success = () => {
  message.config({
    top: "25%",
    duration: 1.3
  });
  message.success(" DIET TYPES SUCCESSFULLY UPDATED !");
};

class Diet extends Component {
  state = {
    checkedList: checkedList,
    showButtons: false
  };

  componentWillMount() {
    // reset unsaved changes to checkboxes if user leaves component and returns without a re-render
    checkedList = {};
    this.setState({
      checkedList: checkedList
    });
  }

  setDefaultChecked() {
    // will only run once, if the checkedList has not been assigned values from the auth object in redux store
    if (!Object.keys(checkedList).length) {
      for (let key in this.props.auth.preferences.dietTypes) {
        checkedList[key] = this.props.auth.preferences.dietTypes[key];
      }
    }
  }

  // when checkbox is clicked, cance/save buttons will render and state will be updated with new "checked" value
  onChange = e => {
    checkedList[e.target.value] = e.target.checked;
    this.setState({
      checkedList: checkedList,
      showButtons: true
    });
  };

  // cancel button will reset to default checkboxes and remove cancel/save buttons
  onCancel = () => {
    // clear changes to checkboxes
    checkedList = {};
    this.setState({
      checkedList: checkedList,
      showButtons: false
    });
  };

  renderContent() {
    if (this.props.auth) {
      // once auth is loaded from redux, then set the initial state by assigning values to checkedList
      this.setDefaultChecked();
      let content = [];
      let objectpath = this.props.auth.preferences.dietTypes;
      for (let key in objectpath) {
        content.push(
          <CheckBoxColumn xs={{ span: 16, offset: 2 }} sm={{ span: 7, offset: 1 }} key={key}>
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
      <CheckBoxContainer xs={{ span: 18, offset: 3 }} sm={{ span: 22, offset: 1 }} md={{ span: 20, offset: 2 }}>
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
              <Button
                onClick={() => {
                  // call action creator to update MongoDB
                  this.props.updatePrefs(checkedList, "dietTypes");
                  // reset local component display
                  this.setState({
                    checkedList: checkedList,
                    showButtons: false
                  });
                  success();
                }}
              >
                Save
              </Button>
            </Col>
          </ButtonRow>
        )}
      </CheckBoxContainer>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { updatePrefs })(Diet);

const CheckBoxContainer = styled(Col)`
  background: #fafafa;
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
  margin-top: 15px !important;

  @media (max-width: 628px) {
    margin-top: 0px !important;
  }
`;

const CheckBoxRow = styled(Row)`
  text-align: left;
  margin: 20px;
`;

const CheckBoxColumn = styled(Col)`
  margin-top: 10px !important;
  margin-bottom: 10px !important;
  @media (max-width: 480px) {
    margin-top: 9px !important;
    margin-bottom: 9px !important;
  }
`;

const ButtonRow = styled(Row)`
  margin: 25px 0 !important;
`;
