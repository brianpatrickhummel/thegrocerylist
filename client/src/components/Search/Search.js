import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon, Row, Col, Button, message } from "antd";
import Spinner from "../Spinner";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import axios from "axios";

class Search extends Component {
  // Local State will store recipe results
  state = {
    loading: false,
    data: [],
    cuisine: "",
    offset: 0,
    searched: false,
    error: ""
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

  // DropDown menu selection initializes HTTP request to Spoonacular API
  async getRecipes(cuisines, direction = "Next") {
    this.setState({ loading: true });
    try {
      let result = await axios.get(`/recipe/search/${cuisines.toLowerCase()}/${direction}/${this.state.offset}`);
      // Store results of Axios query in local state
      this.state.data.push(...result.data);
      // Disable Loading Spinner
      this.setState({ loading: false });
    } catch (e) {
      console.log("search.js query error:", e);
      if (e.response.status && e.response.status === 404 && e.response.statusText === "No recipes found") {
        this.setState({ data: [], loading: false });
        this.displayError(e.response.statusText);
      } else {
        this.displayError(e);
        this.setState({ data: [], loading: false, error: e });
      }
    }
    console.log("after query, this.state: ", this.state);
  }

  displayError(errorMessage) {
    message.config({
      top: "30%",
      duration: 2.5
    });
    message.error(` ${errorMessage}, Please Try Again`);
    this.setState({ error: "" });
  }

  // If user saves a recipe, remove that recipe from state data array
  removeSavedRecipe(recipeId) {
    let newData = this.state.data.filter(recipe => recipe.id !== recipeId);
    this.setState({ data: newData }, () => {
      if (!this.state.data.length) this.getRecipes(this.state.cuisine, "Next");
    });
  }

  // Paging Buttons, call API query with page offset parameters
  nextPage(direction) {
    this.setState(
      {
        data: [],
        offset: direction === "Prev" ? this.state.offset - 3 : this.state.offset + 3
      },
      () => {
        this.getRecipes(this.state.cuisine, direction);
      }
    );
  }

  render() {
    let { auth } = this.props;
    let { data, loading, cuisine, offset, searched, error } = this.state;

    // Ant Design Drop-Down Menu Component
    const menu = (
      <Menu
        onClick={({ key }) => {
          // Reset local state
          this.setState({
            cuisine: key,
            data: [],
            searched: true
          });
          // Initialize Axios req to Spoonacular API
          this.getRecipes(key);
        }}
      >
        {/* Call fn To Render Drop-Down Menu Items */}
        {this.renderFields(auth)}
      </Menu>
    );

    return (
      // Auth loaded but user HAS NOT set any Cuisines in Prefs, render reminder
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
      ) : // Auth loaded && user HAS set Cuisines in Prefs, render DropDown Menu
      auth ? (
        <div className="searchComponent">
          <Row className="DropDownRow">
            <Column xs={{ span: 20, offset: 2 }}>
              <Dropdown overlay={menu} trigger={["click"]} ref="dropdown">
                <Anchor className="ant-dropdown-link" href="">
                  SELECT A CUISINE <Icon type="down-circle" />
                </Anchor>
              </Dropdown>
            </Column>
          </Row>
          {/* Placeholder Bar to match Bar on SearchResults component */}
          {!data.length && <Header>.</Header>}
          {/*  User clicks option, show loading spinner until Axios request completes */}
          {loading ? (
            <SpinColumn xs={{ span: 8, offset: 8 }}>
              <Spinner />
            </SpinColumn>
          ) : // Only render SearchResults if state data has length
          searched && !error ? (
            <SearchResults
              data={data}
              cuisine={cuisine}
              removeSavedRecipe={recipeId => this.removeSavedRecipe(recipeId)}
            />
          ) : null}
          {!loading &&
            !error &&
            data.length > 0 && (
              <PageButtonRow className="pageButtonDiv">
                <PageButtonCol xs={{ span: 6, offset: 4 }} sm={{ span: 4, offset: 8 }}>
                  {(data.length > 0 || searched) &&
                    offset > 0 && (
                      <Button id={"Prev"} onClick={e => this.nextPage(e.target.id)}>
                        Prev
                      </Button>
                    )}
                </PageButtonCol>

                <PageButtonCol xs={{ span: 6, offset: 4 }} sm={{ span: 4, offset: 0 }}>
                  {(data.length > 0 || searched) && (
                    <Button id={"Next"} onClick={e => this.nextPage(e.target.id)}>
                      Next
                    </Button>
                  )}
                </PageButtonCol>
              </PageButtonRow>
            )}
          {/* --- Recipe Search Error, Display Error Message --- */}
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

const Header = styled.h1`
  color: rgba(255, 255, 255, 0);
  text-align: center;
  margin-top: 0.5em;
  letter-spacing: 0.1em;
  background-color: rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    font-size: 22px;
  }
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

const PageButtonRow = styled(Row)`
  clear: both;
  margin: 15px 0 40px 0;
`;

const PageButtonCol = styled(Col)`
  text-align: center;
`;
