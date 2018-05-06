import React, { Component } from "react";
import Portal from "./Portal";
import { Col, Row, Card, message } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { retrieveRecipe, resetDeleteRecipe } from "../../actions";

class SavedResults extends Component {
  state = {
    showPortal: false
  };

  componentDidMount() {
    console.log("SavedResults.js mounted");
    window.scrollTo(0, 0);
  }

  // Display Each Saved Recipe
  renderContent(data, showPortal, retrieveRecipe) {
    // console.log(typeof retrieveRecipe);
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
                  retrieveRecipe(data[i].id);
                  this.setState({
                    showPortal: !showPortal
                  });
                }}
              />
            </Row>
          </Column>
        );
      }
      return content;
    }
  }

  goBack() {
    this.setState({
      showPortal: false
    });
  }

  displaySuccess() {
    console.log("SRS delete displaySuccess called");
    this.props.resetDeleteRecipe();
    message.config({
      top: "40%",
      duration: 1
    });
    message.success("Recipe Successfully Deleted");
  }

  displayError(errorMessage) {
    console.log("SRS displayError called");
    // console.log("error message", errorMessage);
    message.config({
      top: "40%",
      duration: 3.3
    });
    message.error(` ${errorMessage}, Please Try Again`);
  }

  render() {
    let {
      cuisine,
      data,
      retrieveRecipe,
      removeSavedRecipe,
      deletedRecipe: { recipe: delRecipe, error: delError, loading: delLoading },
      retrievedRecipe: { recipe, error, loading }
      // } = this.props;
    } = this.props;

    let { showPortal } = this.state;

    return (
      <div className="savedResultsComponent">
        <Header>{cuisine.toUpperCase()}</Header>
        {/* --- Recipe Save is Processing, Display Loader --- */}
        {loading ||
          (delLoading && (
            <SpinnerCard bordered={false} className="retrieveRecipeLoadingDiv">
              <Spinner />
            </SpinnerCard>
          ))}
        {!loading &&
          data.length > 0 && (
            <Row className="savedResultsRow">{this.renderContent(data, showPortal, retrieveRecipe)}</Row>
          )}
        {/* Mount SavedResultsSingle component via React Portal */}
        {!loading &&
          showPortal && (
            <Portal
              open={showPortal}
              dataElement={recipe}
              cuisine={cuisine}
              goBack={() => this.goBack()}
              removeSavedRecipe={removeSavedRecipe}
            />
          )}
        {/* --- Recipe Retrieve Error, Display Error Message --- */}
        {error ||
          (delError && (
            <ErrorCard bordered={false} className="retrieveRecipeErrorDiv">
              <Text>{this.displayError(error)}</Text>
            </ErrorCard>
          ))}
        {/* --- Recipe Deleted, Display Success Message --- */}
        {Object.keys(delRecipe).length > 0 && (
          <SuccessCard bordered={false} className="deleteRecipeSuccessDiv">
            <Text>{this.displaySuccess()}</Text>
          </SuccessCard>
        )}
      </div>
    );
  }
}

function mapStateToProps({ retrievedRecipe, deletedRecipe }) {
  return { retrievedRecipe, deletedRecipe };
}

export default connect(mapStateToProps, { retrieveRecipe, resetDeleteRecipe })(SavedResults);

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
  box-shadow: 0px 0px 105px rgba(255,255,255,0.15);
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

const SpinnerCard = styled(Card)`
  width: 90%;
  height: 92%;
  margin-left: 8px !important;
  background: rgba(0, 0, 0, 0) !important;
  text-align: center !important;
  margin-top: 10em;
`;

const ErrorCard = styled(Card)`
  width: 90%;
  height: 92%;
  background-color: rgba(0, 0, 0, 0.95);
  text-align: center !important;
  margin-top: 10em;
`;

const Text = styled.p`
  font-size: 8px;
  letter-spacing: 0.1em;
  text-indent: 0.05em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0 !important;
`;

const SuccessCard = styled(Card)`
  width: 90%;
  height: 92%;
  background: black;
  text-align: center !important;
  padding: 45% 0 !important;
`;
