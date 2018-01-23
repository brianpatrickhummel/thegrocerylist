import React, { Component } from "react";
import styled from "styled-components";
import { Layout, Menu } from "antd";
import "./index.css";
const { Header } = Layout;

class HeaderBar extends Component {
  render() {
    return (
      <Header style={{ textAlign: "center" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]}>
          <Menu.Item key="1">
            <LinkAnchor href="/create">
              <LinkImage src={require("../images/CreateList.svg")} alt="" />
              <LinkText>CREATE LIST</LinkText>
            </LinkAnchor>
          </Menu.Item>
          <Menu.Item key="2">
            <LinkAnchor href="/preferences">
              <LinkImage src={require("../images/Prefs.svg")} alt="" />
              <LinkText>PREFERENCES</LinkText>
            </LinkAnchor>
          </Menu.Item>
          <Menu.Item key="3">
            <LinkAnchor href="/saved">
              <LinkImage src={require("../images/Database.svg")} alt="" />
              <LinkText>MY RECIPES</LinkText>
            </LinkAnchor>
          </Menu.Item>
          <Menu.Item key="4">
            <LinkAnchor href="/favorites">
              <LinkImage src={require("../images/Favorites.svg")} alt="" />
              <LinkText>FAVORITES</LinkText>
            </LinkAnchor>
          </Menu.Item>
          <Menu.Item key="5">
            <LinkAnchor href="/lists">
              <LinkImage src={require("../images/List.svg")} alt="" />
              <LinkText>MY LISTS</LinkText>
            </LinkAnchor>
          </Menu.Item>
          <Menu.Item key="6">
            <LinkAnchor href="/search">
              <LinkImage src={require("../images/Search.svg")} alt="" />
              <LinkText>RECIPE SEARCH</LinkText>
            </LinkAnchor>
          </Menu.Item>
          <Menu.Item key="7">
            <LinkAnchor href="/api/logout">
              <LinkImage src={require("../images/Logout.svg")} alt="" />
              <LinkText>LOGOUT</LinkText>
            </LinkAnchor>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default HeaderBar;

const LinkAnchor = styled.a`
  margin-top: 20px;
`;

const LinkImage = styled.img`
  height: 75px;
  max-width: 80px;
  margin-bottom: -10px;
`;

const LinkText = styled.h5`
  color: #362222;
  font-weight: bold;
`;
