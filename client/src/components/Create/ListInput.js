import React, { Component } from "react";
// import { connect } from "react-redux";
import { Row, Col, Checkbox, Input, Button, Select, Icon } from "antd";
// import Spinner from "../Misc/Spinner";
import styled from "styled-components";
import NoResults from "../Misc/NoResults";
// import axios from "axios";
const Option = Select.Option;

class ListInput extends Component {
  state = {
    cuisines: [],
    title: "",
    days: null,
    submitted: false
  };

  renderDayOptions(auth) {
    const children = [];
    // Dropdown will offer whichever is less:
    // 7 or # of saved recipes
    let limit = auth.savedRecipesCount < 7 ? auth.savedRecipesCount : 7;
    for (let i = 1; i <= limit; i++) {
      children.push(<Option key={i}>{i}</Option>);
    }
    return children;
  }

  renderCuisinesContent(auth) {
    if (auth) {
      // once auth is loaded from redux, then set the initial state by assigning
      // values to checkedList
      let content = [];
      let objectpath = Object.keys(auth.preferences["cuisines"]).filter(key => auth.preferences["cuisines"][key]);
      for (let key of objectpath.sort()) {
        content.push(
          <CheckBoxColumn
            className="ListInputCheckBoxCol"
            xs={{ span: 16, offset: 5 }}
            md={{ span: 12, offset: 0 }}
            key={key}
          >
            <CheckBox onChange={e => this.onChange(e)} value={key}>
              {key.toUpperCase()}
            </CheckBox>
          </CheckBoxColumn>
        );
      }
      return content;
    }
  }

  // User enters Title for List
  handleChange = e => {
    console.log(e.target.value);
    this.setState(
      {
        title: e.target.value
      },
      () => console.log("new state title: ", this.state.title)
    );
  };

  // User selects number of days for List
  handleDays = value => {
    console.log(`number of days = ${value}`);
    this.setState({ days: value }, () => console.log("new state days: ", this.state.days));
  };

  // User selects Cuisine Types for List
  onChange = e => {
    // If adding cuisine
    if (e.target.checked) {
      let addCuisine = this.state.cuisines.concat(e.target.value);
      this.setState({ cuisines: addCuisine }, () => console.log("new state cuisine: ", this.state.cuisines));
    }
    // If removing a cuisine
    else {
      let addCuisine = this.state.cuisines.filter(item => item !== e.target.value);
      this.setState({ cuisines: addCuisine }, () => console.log("new state cuisine: ", this.state.cuisines));
    }
  };

  handleClick = () => {
    this.setState({ submitted: true }, () =>
      console.log(`this.state.submitted: ${this.state.submitted} and this.state.days: ${this.state.days}`)
    );
    console.log("clicked");

    console.log(
      `Cusines are ${this.state.cuisines.map(item => item)} and the list name is ${this.state.title} and will include ${
        this.state.days
      } recipes`
    );
  };

  render() {
    let { auth } = this.props;

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
              <TestInput
                submitted={this.state.submitted}
                title={this.state.title}
                placeholder="ENTER NAME FOR YOUR LIST"
                onChange={this.handleChange}
              />
            </Col>
          </NameRow>
          <DaysRow className="DaysRow" gutter={10}>
            <Col xs={{ span: 3, offset: 4 }} sm={{ span: 2, offset: 7 }} md={{ span: 2, offset: 8 }}>
              <TextP>FOR</TextP>
            </Col>

            <Col xs={{ span: 10 }} sm={{ span: 6 }} md={{ span: 4 }}>
              <DaySelect
                submitted={this.state.submitted}
                days={this.state.days}
                onChange={this.handleDays}
                placeholder="HOW MANY ?"
                showArrow={false}
                dropdownMatchSelectWidth={false}
              >
                {this.renderDayOptions(auth)}
              </DaySelect>
            </Col>

            <Col xs={{ span: 3 }} sm={{ span: 2 }}>
              <TextP>DAYS</TextP>
            </Col>
          </DaysRow>
          <CuisinesRow className="CuisinesRow">
            <Col xs={{ span: 22, offset: 1 }} style={{ textAlign: "center" }}>
              <TextP>USING RECIPES THAT YOU HAVE SAVED FROM THE FOLLOWING CUISINES </TextP>
            </Col>

            <CheckBoxContainer
              xs={{ span: 18, offset: 3 }}
              sm={{ span: 14, offset: 5 }}
              md={{ span: 10, offset: 7 }}
              className="checkBoxContainer"
            >
              <CheckBoxRow type="flex" justify="start">
                {this.renderCuisinesContent(auth)}
              </CheckBoxRow>
            </CheckBoxContainer>
          </CuisinesRow>
          <Row style={{ textAlign: "center" }}>
            <SelectButton onClick={this.handleClick}>
              CREATE<Icon type="file-add" style={{ fontSize: "16px", fontWeight: "bold" }} />
            </SelectButton>
          </Row>
        </ContainerRow>
      </div>
    );
  }
}

export default ListInput;

const CheckBoxContainer = styled(Col)`
  background: rgba(127, 103, 103, 0.2);
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
  margin: 34px 0;
`;

const TextP = styled.p`
  color: rgba(255, 255, 255, 0.75);
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(1, 1, 1, 0.1);
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

const SelectButton = styled(Button)`
  height: 40px;
  color: rgba(255, 255, 255, 0.8) !important;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(1, 1, 1, 0.1);
  font-size: 16px !important;
  cursor: default;
  letter-spacing: 0.13em;
  text-indent: 0.1em;
  border: 5px solid rgba(255, 255, 255, 0.5) !important;
  border-radius: 20px !important;
  background-color: rgba(255, 255, 255, 0.04) !important;
  box-shadow: 0px 0px 85px 0px rgba(1, 1, 1, 0.1);
`;

const TextSpan = styled.span`
  color: rgba(255, 255, 255, 0.75);
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(1, 1, 1, 0.1);
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

const TestInput = styled(Input)`
  text-align: center;
  color: rgba(0, 0, 0, 0.65);

  &::placeholder {
    color: ;
  }
  border: ${props => props.submitted && props.title === "" && "2px red solid !important"};
`;

const DaySelect = styled(Select)`
  text-align: center;
  width: 100%;
  border: ${props => props.submitted && props.days === null && "2px red solid"};
`;
