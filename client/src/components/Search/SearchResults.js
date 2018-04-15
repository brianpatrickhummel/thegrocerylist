import React, { Component } from "react";
import Portal from "./Portal";
import { saveRecipe } from "../../actions";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import styled from "styled-components";

class SearchResults extends Component {
  state = {
    showPortal: false,
    clickedItemId: null,
    saveLoader: false
  };

  componentDidMount() {
    console.log("Mount Props: ", this.props);
  }

  renderContent(data, showPortal) {
    if (data.length) {
      let content = [];
      console.log("search results data: ", data);
      console.log(("analyzed instructions: ", data[0].analyzedInstructions));

      for (let i = 0; i < data.length; i++) {
        content.push(
          <Column key={i} xs={{ offset: 2, span: 20 }} sm={{ offset: 3, span: 18 }} lg={{ offset: 4, span: 16 }}>
            <Row>
              <RecipeTitle id={data[i].id}>{data[i].title.toUpperCase()}</RecipeTitle>
            </Row>
            <Row>
              <Image
                id={i}
                src={data[i].image}
                alt=""
                onClick={e => {
                  this.setState({
                    clickedItemId: e.target.id,
                    showPortal: !showPortal
                  });
                }}
              />
            </Row>
          </Column>
        );
      }
      return content;
    } else return null;
  }

  goBack() {
    this.setState({
      showPortal: false
    });
  }

  showSaveLoader() {
    console.log("child clicked save recipe");
    this.setState({
      saveLoader: true
    });
  }

  render() {
    let { cuisine, data } = this.props;
    let { showPortal, clickedItemId } = this.state;
    return (
      <div>
        <Header>{cuisine}</Header>
        {this.renderContent(data)}
        {/* Mount SearchResultsSingle component via React Portal */}
        {/* arrow fn in callback prop to bind this to context of component */}
        {showPortal && (
          <Portal
            open={showPortal}
            dataElement={data[clickedItemId]}
            saveRecipe={this.props.saveRecipe}
            goBack={() => this.goBack()}
            showSaveLoader={() => this.showSaveLoader()}
            saveLoader={this.state.saveLoader}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { saveRecipe })(SearchResults);

const Header = styled.h1`
  color: #2e3539;
  text-align: center;
  margin-top: 58px;
  letter-spacing: 0.1em;
  background-color: rgba(255, 255, 255, 0.5);

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
const Column = styled(Col)`
  text-align: center;
  margin: 8px 0 15px 0;
  border: 1px solid rgba(104, 67, 69, 0.05);
  border-radius: 2px;
  padding: 10px 5px 20px 5px;
  background-color: rgba(104, 67, 69, 0.1);
`;

const Image = styled.img`
  opacity: 0.7;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    max-width: 300px;
  }

  @media (max-width: 628px) {
    max-width: 270px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
  }
`;

const RecipeTitle = styled.p`
  color: rgba(89, 57, 59, 0.9);
  font-size: 16px;

  @media (max-width: 992px) {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-weight: bolder;
  }
`;
