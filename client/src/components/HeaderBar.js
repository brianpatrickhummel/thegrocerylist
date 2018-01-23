import React, { Component } from "react";
import styled from "styled-components";
import { Icon, Row, Layout, Menu } from "antd";
import "./index.css";
const { Header, Sider } = Layout;

class HeaderBar extends Component {
  state = {
    collapsed: true
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div>
        {/* Header Nav - visibility controlled by Media Queries */}
        <Header style={{ textAlign: "center" }}>
          <Row type="flex" justify="center">
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
          </Row>
        </Header>
        {/* Sidebar Nav- visibility controlled by Media Queries */}
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <Icon>
                  <LinkAnchor href="/create">
                    <LinkImage src={require("../images/CreateList.svg")} alt="" />
                  </LinkAnchor>
                </Icon>
                <span>
                  <LinkText>CREATE LIST</LinkText>
                </span>
              </Menu.Item>

              <Menu.Item key="2">
                <Icon>
                  <LinkAnchor href="/preferences">
                    <LinkImage src={require("../images/Prefs.svg")} alt="" />
                  </LinkAnchor>
                </Icon>
                <span>
                  <LinkText>PREFERENCES</LinkText>
                </span>
              </Menu.Item>

              <Menu.Item key="3">
                <Icon>
                  <LinkAnchor href="/saved">
                    <LinkImage src={require("../images/Database.svg")} alt="" />
                  </LinkAnchor>
                </Icon>
                <span>
                  <LinkText>MY RECIPES</LinkText>
                </span>
              </Menu.Item>

              <Menu.Item key="4">
                <Icon>
                  <LinkAnchor href="/favorites">
                    <LinkImage src={require("../images/Favorites.svg")} alt="" />
                  </LinkAnchor>
                </Icon>
                <span>
                  <LinkText>FAVORITES</LinkText>
                </span>
              </Menu.Item>

              <Menu.Item key="5">
                <Icon>
                  <LinkAnchor href="/lists">
                    <LinkImage src={require("../images/List.svg")} alt="" />
                  </LinkAnchor>
                </Icon>
                <span>
                  <LinkText>MY LISTS</LinkText>
                </span>
              </Menu.Item>

              <Menu.Item key="6">
                <Icon>
                  <LinkAnchor href="/search">
                    <LinkImage src={require("../images/Search.svg")} alt="" />
                  </LinkAnchor>
                </Icon>
                <span>
                  <LinkText>RECIPE SEARCH</LinkText>
                </span>
              </Menu.Item>

              <Menu.Item key="7">
                <Icon>
                  <LinkAnchor href="/api/logout">
                    <LinkImage src={require("../images/Logout.svg")} alt="" />
                  </LinkAnchor>
                </Icon>
                <span>
                  <LinkText>LOGOUT</LinkText>
                </span>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </div>
    );
  }
}

export default HeaderBar;

const LinkAnchor = styled.a`
  margin: 25px 0;

  @media (max-width: 1127px) {
    margin: 25px 0;
  }

  @media (max-width: 628px) {
    margin: 0px;
  }
`;

const LinkImage = styled.img`
  height: 75px;
  max-width: 80px;

  @media (max-width: 1127px) {
    height: 60px;
    max-width: 65px;
  }

  @media (max-width: 866px) {
    height: 55px;
    max-width: 60px;
  }

  @media (max-width: 700px) {
    height: 45px;
    max-width: 50px;
  }

  @media (max-width: 628px) {
    height: 20px;
    max-width: 25px;
  }
`;

const LinkText = styled.span`
  color: #362222;
  font-weight: bold;
  line-height: 20px;
  margin-top: 12px;
  font-size: 14px;
  display: block;

  @media (max-width: 1127px) {
    font-size: 11px;
    margin-top: 8px;
  }

  @media (max-width: 866px) {
    font-size: 9px;
  }

  @media (max-width: 700px) {
    font-size: 8px;
  }

  @media (max-width: 628px) {
    display: inline;
  }
`;
