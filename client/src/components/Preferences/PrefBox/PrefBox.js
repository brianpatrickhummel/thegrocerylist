import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Checkbox, Button, message } from "antd";
import { connect } from "react-redux";
import { updatePrefs } from "../../../actions";

let checkedList = {};

class PrefBox extends Component {
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

  setDefaultChecked(prefType, auth) {
    // will only run once, if the checkedList has not been assigned values from the auth object in redux store
    if (!Object.keys(checkedList).length) {
      for (let key in auth.preferences[prefType]) {
        checkedList[key] = auth.preferences[prefType][key];
      }
    }
  }

  // Message to display when preferences are modified and saved by user
  success(prefType) {
    message.config({
      top: "25%",
      duration: 1.3
    });
    message.success(` ${prefType.toUpperCase()} SUCCESSFULLY UPDATED !`);
  }

  // when checkbox is clicked, cancel/save buttons will render and state will be updated with new "checked" value
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

  renderContent(prefType, styling, auth) {
    if (auth) {
      // once auth is loaded from redux, then set the initial state by assigning values to checkedList
      this.setDefaultChecked(prefType, auth);
      let content = [];
      let objectpath = Object.keys(auth.preferences[prefType]);
      for (let key of objectpath.sort()) {
        content.push(
          <CheckBoxColumn xs={styling.CheckBoxColumn.xs} sm={styling.CheckBoxColumn.sm} key={key}>
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
    const { prefType, styling, auth, updatePrefs } = this.props;

    return (
      <CheckBoxContainer
        className={`prefBox${prefType}Component`}
        xs={styling.CheckBoxContainer.xs}
        sm={styling.CheckBoxContainer.sm}
        md={styling.CheckBoxContainer.md}
      >
        <CheckBoxRow type="flex" justify="start">
          {this.renderContent(prefType, styling, auth)}
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
                  updatePrefs(checkedList, `${prefType}`);
                  // reset local component display
                  this.setState({
                    checkedList: checkedList,
                    showButtons: false
                  });
                  this.success(prefType);
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

export default connect(mapStateToProps, { updatePrefs })(PrefBox);

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

  @media (max-width: 380px) {
    margin: 10px;
  }
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
