import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Dropdown, Icon, Col, Spin } from "antd";
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
    this.setState({ loading: true });
    let result = await axios.get(`/recipe/search/${key}`);
    console.log("result: ", result);
    for (let obj of result.data) {
      this.state.data.push(obj);
      this.setState({ loading: false });
    }
    console.log("state: ", this.state);
  }

  render() {
    let { auth } = this.props;
    let { data, loading, cuisine } = this.state;

    const menu = (
      <Menu
        onClick={({ key }) => {
          this.setState({ cuisine: key, data: [] });
          this.getRecipes(key);
        }}
      >
        {this.renderFields(auth)}
      </Menu>
    );

    const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;

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
          {loading ? (
            <SpinColumn xs={{ span: 8, offset: 8 }}>
              <Spin indicator={antIcon} />
            </SpinColumn>
          ) : // only render SearchResults if state data has length
          data.length ? (
            <SearchResults data={data} cuisine={cuisine} />
          ) : null}
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

const SpinColumn = styled(Col)`
  text-align: center;
  margin-top: 20%;
`;
