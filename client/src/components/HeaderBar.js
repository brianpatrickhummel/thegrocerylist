import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { Icon, Row, Layout, Menu } from "antd";
import "./index.css";
const { Header, Sider } = Layout;

class HeaderBar extends Component {
  state = {
    collapsed: true
  };

  // Control whether the SideBar Nav is collapsed
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <div>
        {/* Header Nav - visibility controlled by Media Queries */}
        <Header style={{ textAlign: "center" }}>
          <Row type="flex" justify="center">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1">
                <div className="hvr-shrink NavBar" style={{ margin: "25px 0" }}>
                  <LinkAnchor to="/create">
                    <LinkImage src={require("../images/CreateList.svg")} alt="" />
                    <LinkText>CREATE LIST</LinkText>
                  </LinkAnchor>
                </div>
              </Menu.Item>
              <Menu.Item key="2">
                <div className="hvr-shrink NavBar" style={{ margin: "25px 0" }}>
                  <LinkAnchor to="/preferences">
                    <LinkImage src={require("../images/Prefs.svg")} alt="" />
                    <LinkText>PREFERENCES</LinkText>
                  </LinkAnchor>
                </div>
              </Menu.Item>
              <Menu.Item key="3">
                <div className="hvr-shrink NavBar" style={{ margin: "25px 0" }}>
                  <LinkAnchor to="/saved">
                    <LinkImage src={require("../images/Database.svg")} alt="" />
                    <LinkText>MY RECIPES</LinkText>
                  </LinkAnchor>
                </div>
              </Menu.Item>
              <Menu.Item key="4">
                <div className="hvr-shrink NavBar" style={{ margin: "25px 0" }}>
                  <LinkAnchor to="/favorites">
                    <LinkImage src={require("../images/Favorites.svg")} alt="" />
                    <LinkText>FAVORITES</LinkText>
                  </LinkAnchor>
                </div>
              </Menu.Item>
              <Menu.Item key="5">
                <div className="hvr-shrink NavBar" style={{ margin: "25px 0" }}>
                  <LinkAnchor to="/lists">
                    <LinkImage src={require("../images/List.svg")} alt="" />
                    <LinkText>MY LISTS</LinkText>
                  </LinkAnchor>
                </div>
              </Menu.Item>
              <Menu.Item key="6">
                <div className="hvr-shrink NavBar" style={{ margin: "25px 0" }}>
                  <LinkAnchor to="/search">
                    <LinkImage src={require("../images/Search.svg")} alt="" />
                    <LinkText>RECIPE SEARCH</LinkText>
                  </LinkAnchor>
                </div>
              </Menu.Item>
              <Menu.Item key="7">
                <div className="hvr-shrink NavBar" style={{ margin: "25px 0" }}>
                  <LinkAnchor2 href="/api/logout">
                    <LinkImage src={require("../images/Logout.svg")} alt="" />
                    <LinkText>LOGOUT</LinkText>
                  </LinkAnchor2>
                </div>
              </Menu.Item>
            </Menu>
          </Row>
        </Header>
        {/* Sidebar Nav- visibility controlled by Media Queries */}
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ color: "white" }}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={[""]} mode="inline">
              <Menu.Item key="1">
                <LinkAnchor to="/create">
                  <Icon>
                    <LinkImage src={require("../images/CreateList.svg")} alt="" />
                  </Icon>
                  <LinkText>CREATE LIST</LinkText>
                </LinkAnchor>
              </Menu.Item>
              <Menu.Item key="2">
                <LinkAnchor to="/preferences">
                  <Icon>
                    <LinkImage src={require("../images/Prefs.svg")} alt="" />
                  </Icon>
                  <LinkText>PREFERENCES</LinkText>
                </LinkAnchor>
              </Menu.Item>
              <Menu.Item key="3">
                <LinkAnchor to="/saved">
                  <Icon>
                    <LinkImage src={require("../images/Database.svg")} alt="" />
                  </Icon>
                  <LinkText>MY RECIPES</LinkText>
                </LinkAnchor>
              </Menu.Item>
              <Menu.Item key="4">
                <LinkAnchor to="/favorites">
                  <Icon>
                    <LinkImage src={require("../images/Favorites.svg")} alt="" />
                  </Icon>
                  <LinkText>FAVORITES</LinkText>
                </LinkAnchor>
              </Menu.Item>
              <Menu.Item key="5">
                <LinkAnchor to="/lists">
                  <Icon>
                    <LinkImage src={require("../images/List.svg")} alt="" />
                  </Icon>
                  <LinkText>MY LISTS</LinkText>
                </LinkAnchor>
              </Menu.Item>
              <Menu.Item key="6">
                <LinkAnchor to="/search">
                  <Icon>
                    <LinkImage src={require("../images/Search.svg")} alt="" />
                  </Icon>
                  <LinkText>RECIPE SEARCH</LinkText>
                </LinkAnchor>
              </Menu.Item>
              <Menu.Item key="7">
                <LinkAnchor2 href="/api/logout">
                  <Icon>
                    <LinkImage src={require("../images/Logout.svg")} alt="" />
                  </Icon>
                  <LinkText>LOGOUT</LinkText>
                </LinkAnchor2>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(HeaderBar);

// React Router Links
const LinkAnchor = styled(Link)`
  margin: 25px 0;
  height: 100%;

  @media (max-width: 1127px) {
    margin: 25px 0;
  }

  @media (max-width: 628px) {
    margin: 0px;
  }
`;

// External/Server API Links
const LinkAnchor2 = styled.a`
  margin: 25px 0;
  height: 100%;

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
    min-width: 16px;
    max-width: 16px;
    max-height: 15px;
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
    font-size: 11px;
    padding-top: 1px;
  }
`;
