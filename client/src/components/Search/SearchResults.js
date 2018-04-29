import React, { Component } from "react";
import Portal from "./Portal";
import { Col, Row } from "antd";
import styled from "styled-components";
import NoResults from "../NoResults";
import SearchResultsSingle from "./SearchResultsSingle";

class SearchResults extends Component {
  state = {
    showPortal: false,
    clickedItemId: null
  };

  // Display Each Search Result
  renderContent(data, showPortal) {
    if (data.length > 0) {
      let content = [];
      for (let i = 0; i < data.length; i++) {
        content.push(
          <Column key={i} xs={{ span: 20, offset: 2 }} sm={{ span: 18, offset: 3 }} lg={{ span: 16, offset: 4 }}>
            <Row>
              <RecipeTitle id={data[i].id}>{data[i].title.toUpperCase()}</RecipeTitle>
            </Row>
            <Row>
              <Image
                id={i}
                src={data[i].image}
                alt="recipe image"
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
    } else
      return (
        <NoResults
          header={"NO RECIPES FOUND"}
          text={"TRY SEARCHING ANOTHER CUISINE OR MAKING ADJUSTMENTS TO YOUR PREFERENCES"}
        />
      );
  }

  goBack() {
    this.setState({
      showPortal: false
    });
  }

  render() {
    let { cuisine, data, removeSavedRecipe } = this.props;
    let { showPortal, clickedItemId } = this.state;

    return (
      <div className="searchResultsComponent">
        <Header>{cuisine}</Header>

        <Row className="searchResultsRow">{this.renderContent(data)}</Row>
        {/* Mount SearchResultsSingle component via React Portal */}
        {showPortal && (
          <Portal
            open={showPortal}
            dataElement={data[clickedItemId]}
            cuisine={cuisine}
            goBack={() => this.goBack()}
            removeSavedRecipe={removeSavedRecipe}
            componentName={SearchResultsSingle}
          />
        )}
      </div>
    );
  }
}

export default SearchResults;

const Header = styled.h1`
  color: rgba(255, 255, 255, 0.5);
  text-align: center;

  letter-spacing: 0.8em;
  text-indent: 0.8em;
  background-color: rgba(255, 255, 255, 0.1);
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.35), 1px 1px 1px rgba(1, 1, 1, 0.1);

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
const Column = styled(Col)`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(104, 67, 69, 0.05);
  border-radius: 2px;
  padding: 10px 5px 20px 5px;
  background-color: rgba(1,1,1,0.05);
  box-shadow: 0px 0px 85px rgba(255,255,255,0.2);
}





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
