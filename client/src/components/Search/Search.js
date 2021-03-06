import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Row, Col, Button, message } from "antd";
import Spinner from "../Misc/Spinner";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import NoCuisines from "../Misc/NoCuisines";
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
                <DropDownAnchor>{cuisine.toUpperCase()}</DropDownAnchor>
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
    console.log("search.js removing recipe: ", recipeId);
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
        <NoCuisines />
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
          {!data.length && <Header>•SEARCH•</Header>}
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

const Header = styled.h1`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  letter-spacing: 0.8em;
  text-indent: 0.8em;
  background-color: rgba(255, 255, 255, 0.1);
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.25), 1px 1px 1px rgba(1, 1, 1, 0.1);

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;

const Anchor = styled.a`
  color: rgba(108, 76, 76, 0.87) !important;
  font-size: 12px;
  cursor: default;
  letter-spacing: 0.13em;
  text-indent: 0.1em;
  padding: 5px 15px;
  border: 1px solid rgba(209, 205, 205, 0.15);
  border-radius: 20px;
  box-shadow: 3px 2px 9px rgba(1, 1, 1, 0.05);
  background-color: rgba(255, 255, 255, 0.2);
  &:hover {
    color: rgba(255, 255, 255, 0.8) !important;
  }
  &:active {
    box-shadow: inset 1px 1px 2px rgba(1, 1, 1, 0.1);
    background-color: rgba(1, 1, 1, 0.02);
  }
`;

const DropDownAnchor = styled.a`
  color: rgba(108, 76, 76, 0.87) !important;
`;

const Column = styled(Col)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const SpinColumn = styled(Col)`
  text-align: center;
  margin-top: 20%;
`;

const PageButtonRow = styled(Row)`
  clear: both;
  margin: 15px 0 40px 0;
`;

const PageButtonCol = styled(Col)`
  text-align: center;
`;
