import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { Icon, Row, Layout, Menu } from "antd";
import menudata from "./menudata";
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

  // render 6 Header Menu.Items by mapping through objects in menudata array
  renderMenuItems(classNames) {
    return menudata.map(({ link, image, text }, index) => {
      return (
        <Menu.Item key={index + 1}>
          {/* logic to render last index (logout) as an <a> rather than react-router <Link> */}
          {index !== 6 ? (
            <LinkAnchor to={link} className={classNames}>
              <div className="hvr-shrink">
                <Icon>
                  <LinkImage src={image} alt="menu item icon" />
                </Icon>
                <LinkText>{text}</LinkText>
              </div>
            </LinkAnchor>
          ) : (
            <LinkAnchor2 href={link} className={classNames}>
              <div className="hvr-shrink">
                <Icon>
                  <LinkImage src={image} alt="logout icon" />
                </Icon>
                <LinkText>{text}</LinkText>
              </div>
            </LinkAnchor2>
          )}
        </Menu.Item>
      );
    });
  }

  render() {
    return (
      <div>
        {/* Header Nav - visibility controlled by Media Queries */}
        <Header style={{ textAlign: "center" }}>
          <Row type="flex" justify="center">
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              {/* call render function passing in class names specific only to menu bar (not sidebar) */}
              {this.renderMenuItems("NavBar")}
            </Menu>
          </Row>
        </Header>
        {/* Sidebar Nav- visibility controlled by Media Queries */}
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={[""]} mode="inline">
              {/* call render function passing in no class names*/}
              {this.renderMenuItems()}
            </Menu>
          </Sider>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps({ auth }, ownProps) {
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

  @media (max-width: 627px) {
    display: inline;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    font-weight: lighter;
    letter-spacing: 0.08em;
    margin-left: 8px;
  }
`;
