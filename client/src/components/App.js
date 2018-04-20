import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import styled from "styled-components";
import "./index.css";
import { Layout } from "antd";

import Landing from "./Landing";
import Preferences from "./Preferences/Preferences";
import HeaderBar from "./HeaderBar";
import Search from "./Search/Search";
const Create = () => <h2>Create a new list</h2>;
const ViewOneList = () => <h2>Here's your list</h2>;
const SavedRecipes = () => <h2>Saved Recipes</h2>;
const Favorites = () => <h2>Favorites</h2>;
const MyGroceryLists = () => <h2>My Grocery Lists</h2>;

class App extends Component {
  componentDidMount() {
    // when app launches call the fetchUser action creator
    console.log("<App> fetching user action");
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Wrapper>
            <Route exact path="/" render={() => (!this.props.auth ? <Landing /> : <Redirect to="/preferences/1" />)} />
            <Route path="/" render={props => props.location.pathname !== "/" && <HeaderBar />} />
            <Route
              path="*"
              render={props =>
                props.location.pathname !== "/" && (
                  <AntLayout className="AntLayout">
                    <Switch>
                      <Route path="/preferences/:defaultKey" component={Preferences} />
                      <Route exact path="/create" component={Create} />
                      <Route path="/lists" component={MyGroceryLists} />
                      <Route path="/viewonelist/:listid" component={ViewOneList} />
                      <Route path="/saved" component={SavedRecipes} />
                      <Route path="/favorites" component={Favorites} />
                      <Route exact path="/search" component={Search} />
                    </Switch>
                  </AntLayout>
                )
              }
            />
          </Wrapper>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

// pass all of our action creators to mapDispatchToProps
export default connect(mapStateToProps, actions)(App);

const Wrapper = styled.div`
  font-family: "Futura";
`;

const AntLayout = styled(Layout)`
  overflow: scroll;
  height: 83vh;
  @media (max-width: 628px) {
    height: 100vh;
  }
`;
