import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Col, Progress } from "antd";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import axios from "axios";

class Search extends Component {
  state = {
    loading: false,
    data: [],
    cuisine: ""
  };

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

  async getRecipes(key) {
    let result = await axios.get(`/recipe/search/${key}`);
    for (let obj of result.data.results) {
      this.state.data.push(obj);
    }
    console.log("state: ", this.state);
  }

  render() {
    let { auth } = this.props;
    const menu = (
      <Menu
        onClick={({ key }) => {
          this.setState({ cuisine: key });
          this.getRecipes(key);
        }}
      >
        {this.renderFields(auth)}
      </Menu>
    );

    return (
      auth && (
        <div>
          <Column xs={{ span: 20, offset: 2 }}>
            <Dropdown overlay={menu} trigger={["click"]} ref="dropdown">
              <Anchor className="ant-dropdown-link" href="">
                SELECT A CUISINE <Icon type="down-circle" />
              </Anchor>
            </Dropdown>
          </Column>
          {this.state.loading ? (
            <Progress percent={30} status="active" />
          ) : (
            <SearchResults data={this.state.data} cuisine={this.state.cuisine} />
          )}
        </div>
      )
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Search);

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
