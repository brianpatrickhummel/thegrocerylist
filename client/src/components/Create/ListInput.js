import React, { Component } from "react";
// import { connect } from "react-redux";
import { Row, Col, Checkbox, Input, Menu, Dropdown, Button, Select, Icon } from "antd";
// import Spinner from "../Spinner";
import styled from "styled-components";
import NoResults from "../NoResults";
// import axios from "axios";
const Option = Select.Option;

class ListInput extends Component {
  state = {
    cuisines: []
  };

  onChange = e => {
    console.log(`checked = ${e.target.value} + ${e.target.checked}`);
  };

  renderContent(auth) {
    if (auth) {
      // once auth is loaded from redux, then set the initial state by assigning
      // values to checkedList
      let content = [];
      let objectpath = Object.keys(auth.preferences["cuisines"]).filter(key => auth.preferences["cuisines"][key]);
      for (let key of objectpath.sort()) {
        content.push(
          <CheckBoxColumn xs={{ span: 16, offset: 4 }} md={{ span: 12, offset: 0 }} key={key}>
            <CheckBox onChange={e => this.onChange(e)} value={key}>
              {key.toUpperCase()}
            </CheckBox>
          </CheckBoxColumn>
        );
      }
      return content;
    }
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  handleDays(value) {
    console.log(`number of days = ${value}`);
  }

  render() {
    let { auth } = this.props;
    const children = [];

    for (let i = 0; i < 12; i++) {
      children.push(<Option key={i}>{`Option ${i}`}</Option>);
    }

    return Object.keys(auth.savedRecipes.cuisines).filter(item => auth.savedRecipes.cuisines[item].length).length ===
      0 ? (
      <NoResults header={"YOU HAVEN'T SAVED ANY RECIPES"} text={"SEARCH FOR & SAVE SOME RECIPES"} />
    ) : (
      <div className="ListInputDiv" style={{ textAlign: "center" }}>
        <ContainerRow>
          <NameRow className="NameRow">
            <Col xs={{ span: 22, offset: 1 }}>
              <TextP>CREATE A NEW GROCERY LIST NAMED </TextP>
            </Col>
            <Col xs={{ span: 20, offset: 2 }} sm={{ span: 14, offset: 5 }} lg={{ span: 10, offset: 7 }}>
              <Input style={{ textAlign: "center" }} placeholder="ENTER NAME FOR YOUR LIST" />
            </Col>
          </NameRow>
          <DaysRow className="DaysRow" gutter={10}>
            <Col xs={{ span: 3, offset: 4 }} md={{ span: 2, offset: 7 }} lg={{ span: 1, offset: 8 }}>
              <TextP>FOR</TextP>
            </Col>

            <Col xs={{ span: 10 }} md={{ span: 6 }}>
              <Select
                onChange={this.handleDays}
                placeholder="HOW MANY ?"
                style={{ textAlign: "center", width: "100%" }}
                showArrow={false}
                dropdownMatchSelectWidth={false}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
              </Select>
            </Col>

            <Col xs={{ span: 3 }} md={{ span: 2 }} lg={{ span: 1 }}>
              <TextP>DAYS</TextP>
            </Col>
          </DaysRow>
          <CuisinesRow className="CuisinesRow">
            <Col xs={{ span: 24 }} style={{ textAlign: "center" }}>
              <TextP>USING RECIPES THAT YOU HAVE SAVED FROM THE FOLLOWING CUISINES </TextP>
            </Col>

            <CheckBoxContainer
              xs={{ span: 18, offset: 3 }}
              sm={{ span: 14, offset: 5 }}
              md={{ span: 10, offset: 7 }}
              className="checkBoxContainer"
            >
              <CheckBoxRow type="flex" justify="start">
                {this.renderContent(auth)}
                {/* <Select
                style={{ width: "100%" }}
                size={"small"}
                mode="multiple"
                placeholder="SELECT CUISINES"
                onChange={this.handleChange}
              >
                {children}
              </Select> */}
              </CheckBoxRow>
            </CheckBoxContainer>
          </CuisinesRow>
        </ContainerRow>
      </div>
    );
  }
}

export default ListInput;

const CheckBoxContainer = styled(Col)`
  background: rgba(127, 103, 103, 0.4);
  text-align: center;
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

const CheckBox = styled(Checkbox)`
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 10px !important;
`;

const ContainerRow = styled(Row)``;

const NameRow = styled(Row)`
  margin: 80px 0 0 0;

  @media (max-width: 767px) {
    margin: 40px 0 0 0;
  }
`;

const DaysRow = styled(Row)`
  margin: 40px 0 0 0;
  text-align: center;
`;

const CuisinesRow = styled(Row)`
  margin: 40px 0;
`;

const TextP = styled.p`
  color: #918181;
  margin-bottom: 5px;

  @media (min-width: 1128px) {
    font-size: 28px;
  }

  @media (min-width: 992px) and (max-width: 1127px) {
    font-size: 24px;
  }

  @media (min-width: 867px) and (max-width: 991px) {
    font-size: 20px;
  }
`;
