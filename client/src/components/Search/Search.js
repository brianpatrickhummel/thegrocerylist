import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Row, Col, Spin } from "antd";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import axios from "axios";

class Search extends Component {
  state = {
    loading: false,
    data: [],
    cuisine: ""
  };

  // Render DropDown menu fields from user's Cuisines Prefs
  renderFields(auth) {
    return (
      auth &&
      Object.keys(auth.preferences.cuisines)
        .sort()
        .map((cuisine, index) => {
          if (auth.preferences.cuisines[cuisine] === true) {
            return (
              <Menu.Item key={cuisine.toUpperCase()}>
                <a>{cuisine.toUpperCase()}</a>
              </Menu.Item>
            );
          } else return null;
        })
    );
  }

  // HTTP request to Spoonacular API, triggered when user makes a DropDown menu selection
  async getRecipes(key) {
    this.setState({ loading: true });
    let result = await axios.get(`/recipe/search/${key}`);
    console.log("result: ", result);
    // Store results of Axios query in local state, disable Loading Spinner
    for (let obj of result.data) {
      this.state.data.push(obj);
      this.setState({ loading: false });
    }
    console.log("state: ", this.state);
  }

  render() {
    let { auth } = this.props;
    let { data, loading, cuisine } = this.state;

    // Ant Design Drop-Down Menu Component
    const menu = (
      <Menu
        onClick={({ key }) => {
          // Reset local state
          this.setState({ cuisine: key, data: [] });
          // Initialize Axios req to Spoonacular API
          this.getRecipes(key);
        }}
      >
        {/* Call fn To Render Drop-Down Menu Items */}
        {this.renderFields(auth)}
      </Menu>
    );

    // Ant Design Loading Spinner Component
    const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;

    return (
      // If auth data is loaded and user has set Cuisines in Prefs, render DropDown Menu
      auth && Object.keys(auth.preferences.cuisines).every(i => !auth.preferences.cuisines[i]) ? (
        <SetCuisinesMessage
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 16, offset: 4 }}
          md={{ span: 12, offset: 6 }}
          lg={{ span: 10, offset: 7 }}
        >
          <Exclaim type="exclamation-circle" />
          <Horizontal />
          <Row>
            <Col xs={{ span: 18, offset: 3 }}>
              <MessageH3>NO CUISINES SELECTED</MessageH3>
            </Col>
          </Row>
          {/* forceUpdate so that Ant Menu selected item changes without having clicked it */}
          <CuisineLink onClick={this.forceUpdate} to={"/Preferences/4"}>
            PLEASE SET CUISINES PREFERENCES <Icon type="rollback" style={{ fontSize: 16 }} />
          </CuisineLink>
        </SetCuisinesMessage>
      ) : // If auth data is loaded, but user has not set any Cuisines in Prefs, render reminder
      auth ? (
        <div>
          <Column xs={{ span: 20, offset: 2 }}>
            <Dropdown overlay={menu} trigger={["click"]} ref="dropdown">
              <Anchor className="ant-dropdown-link" href="">
                SELECT A CUISINE <Icon type="down-circle" />
              </Anchor>
            </Dropdown>
          </Column>
          {/*  User clicks option, show loading spinner until Axios request completes */}
          {loading ? (
            <SpinColumn xs={{ span: 8, offset: 8 }}>
              <Spin indicator={antIcon} />
            </SpinColumn>
          ) : // Only render SearchResults if state data has length
          data.length ? (
            <SearchResults data={data} cuisine={cuisine} />
          ) : null}
        </div>
      ) : null
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Search);

const Exclaim = styled(Icon)`
  font-size: 22px;
  color: #b62b37;
  margin-bottom: 10px;
`;

const Anchor = styled.a`
  color: #684345 !important;
  font-size: 16px;
  cursor: default;
  &:hover {
    color: rgba(255, 255, 255, 0.8) !important;
  }
`;

const Column = styled(Col)`
  text-align: center;
  margin-top: 20px;
`;

const SpinColumn = styled(Col)`
  text-align: center;
  margin-top: 20%;
`;

const SetCuisinesMessage = styled(Col)`
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  margin-top: 35px;
  padding: 20px 10px;
`;

const CuisineLink = styled(Link)`
  color: #b62b37 !important;
  margin-top: 20px;
  &:hover {
    color: rgba(182, 43, 55, 0.5) !important;
  }
`;

const MessageH3 = styled.h3`
  font-weight: bolder;
  margin-top: 8px;
  color: rgba(104, 67, 69, 0.7);
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;

const Horizontal = styled.hr`
  border-color: rgba(255, 255, 255, 0.2);
`;
