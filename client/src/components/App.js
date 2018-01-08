import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import styled from "styled-components";
import "./index.css";
import { Layout } from "antd";

import Landing from "./Landing";
import Dashboard from "./Dashboard";
import HeaderBar from "./HeaderBar";
const Create = () => <h2>Create a new list</h2>;
const ViewOneList = () => <h2>Here's your list</h2>;
const Preferences = () => <h2>Preferences Page</h2>;
const SavedRecipes = () => <h2>Saved Recipes</h2>;
const Favorites = () => <h2>Favorites</h2>;
const MyGroceryLists = () => <h2>My Grocery Lists</h2>;
const SearchForRecipes = () => <h2>SearchForRecipes</h2>;

class App extends Component {
  componentDidMount() {
    // when app launches call the fetchUser action creator
    this.props.fetchUser();
  }

  render() {
    const Wrapper = styled.div`
      font-family: "Futura";
    `;

    return (
      <div>
        <BrowserRouter>
          <Wrapper>
            <Route path="/" render={props => props.location.pathname !== "/" && <HeaderBar />} />
            <Route exact path="/" component={Landing} />
            <Layout className="layout">
              <Route path="/dashboard" component={Dashboard} />
              <Route exact path="/create" component={Create} />
              <Route path="/lists" component={MyGroceryLists} />
              <Route path="/viewonelist/:listid" component={ViewOneList} />
              <Route path="/preferences" component={Preferences} />
              <Route path="/saved" component={SavedRecipes} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/search" component={SearchForRecipes} />
            </Layout>
          </Wrapper>
        </BrowserRouter>
      </div>
    );
  }
}

// pass all of our action creators to mapDispatchToProps
export default connect(null, actions)(App);
