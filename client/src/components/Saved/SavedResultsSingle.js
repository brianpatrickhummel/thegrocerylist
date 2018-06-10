// Will mount on a new DOM Node as a child of SearchResults component Using
// React16's Portal feature

import React, { Component } from "react";
import styled from "styled-components";
import { Card, Icon, Col, Row } from "antd";
import { connect } from "react-redux";
import DeleteModal from "./DeleteModal";
import { deleteRecipe } from "../../actions";

class SavedResultsSingle extends Component {
  componentDidMount() {
    console.log("SavedResultsSingle.js mounted");
  }

  renderIngredients = dataElement => {
    let content = [];
    // Satisfying React's unique key policy with a generic counter Some Spoonacular
    // Ingredients Lists have identical fields/object
    let keyGenerator = 0;
    for (let item of dataElement.extendedIngredients) {
      content.push(
        <Row key={keyGenerator}>
          <Col
            xs={{
              span: 24,
              offset: 0
            }}
            sm={{
              span: 21,
              offset: 1
            }}
          >
            <Ingredient>
              <span>{item.original.toUpperCase()}</span>
            </Ingredient>
          </Col>
        </Row>
      );
      keyGenerator++;
    }
    return content;
  };

  renderInstructions = dataElement => {
    let content = [];
    for (let item of dataElement.analyzedInstructions[0].steps) {
      content.push(
        <Row key={item.number}>
          <Col
            xs={{
              span: 24,
              offset: 0
            }}
            sm={{
              span: 21,
              offset: 1
            }}
          >
            <Instruction>
              <span>
                {item.number}. {item.step.toUpperCase()}
              </span>
            </Instruction>
          </Col>
        </Row>
      );
    }
    return content;
  };

  renderDeleteModal() {
    // calls the showModal method from child UnlinkModal component via react-redux
    // Connect's getWrappedInstance
    this.refs.DeleteModal.getWrappedInstance().showModal();
  }

  render() {
    let { goBack, dataElement, cuisine, deleteRecipe, removeSavedRecipe } = this.props;

    return (
      <ModalContainer className="savedResultsSingleComponent">
        {/* --- Display Recipe Details --- */}
        {
          <RecipeCard
            actions={[
              <Icon type="arrow-left" onClick={goBack}>
                {" "}
                <IconText>BACK</IconText>{" "}
              </Icon>,
              <Icon
                type="dislike"
                onClick={() => {
                  this.renderDeleteModal();
                }}
              >
                <IconText>DELETE</IconText>{" "}
              </Icon>,
              <a href={dataElement.sourceUrl} target="about_blank">
                {" "}
                <Icon type="link">
                  <IconText>DETAILS</IconText>
                </Icon>{" "}
              </a>
            ]}
          >
            <Title>{dataElement.title.toUpperCase()}</Title>{" "}
            <TimeRow
              style={{
                textAlign: "center"
              }}
            >
              <TimeCol
                xs={{
                  span: 8
                }}
              >
                <Row>
                  <Text>PREP TIME:</Text>
                </Row>
                <Row>
                  <Text>
                    {dataElement.preparationMinutes}
                    Minutes
                  </Text>
                </Row>
              </TimeCol>
              <TimeCol
                xs={{
                  span: 8
                }}
              >
                <Row>
                  <Text>COOK TIME:</Text>
                </Row>
                <Row>
                  <Text>
                    {dataElement.cookingMinutes}
                    Minutes
                  </Text>
                </Row>
              </TimeCol>
              <TimeCol
                xs={{
                  span: 8
                }}
              >
                <Row>
                  <Text>TOTAL TIME:</Text>
                </Row>
                <Row>
                  <Text>
                    {dataElement.readyInMinutes}
                    Minutes
                  </Text>
                </Row>
              </TimeCol>
            </TimeRow>{" "}
            <Col xs={{ span: 22, offset: 1 }} sm={{ span: 18, offset: 3 }}>
              {" "}
              <IngredientsRow>{this.renderIngredients(dataElement)}</IngredientsRow>{" "}
            </Col>
            <Col xs={{ span: 24 }}>
              <InstructionsRow>{this.renderInstructions(dataElement)}</InstructionsRow>{" "}
            </Col>{" "}
          </RecipeCard>
        }

        <DeleteModal
          ref="DeleteModal"
          deleteRecipe={recipeId => deleteRecipe}
          recipeId={dataElement.id}
          recipeTitle={dataElement.title}
          cuisine={cuisine}
          goBack={goBack}
          removeSavedRecipe={removeSavedRecipe}
        />
      </ModalContainer>
    );
  }
}

export default connect(null, { deleteRecipe })(SavedResultsSingle);

const ModalContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecipeCard = styled(Card)`
  width: 75%;
  max-height: 95%;
  overflow: scroll;
  margin-left: 8px !important;
  @media (max-width: 992px) {
    width: 90%;
  }
  @media (max-width: 480px) {
    width: 95%;
  }
`;

const Title = styled.h3`
  text-align: center;
  border: 1px solid rgba(1, 1, 1, 0.5);
  padding: 10px;

  @media (max-width: 380px) {
    font-size: 10px;
    font-weight: bold;
  }
`;

const IconText = styled.p`
  font-size: 8px;
  letter-spacing: 0.1em;
  text-indent: 0.05em;
  text-align: center;
  font-weight: bold;
  margin: 7px 0;
`;

const TimeRow = styled(Row)`
  margin: 10px 0;
`;

const TimeCol = styled(Col)`
  margin: 10px 0;
`;

const IngredientsRow = styled(Row)`
  text-align: center;
  background-color: rgba(1, 1, 1, 0.02);
  box-shadow: 8px 9px 17px 0px rgba(1, 1, 1, 0.1);
  padding: 10px;
`;

const Ingredient = styled.p`
  font-size: 14px;
  margin: 2px 0 !important;
  letter-spacing: 0.1em;
  text-indent: 0.05em;
  line-height: 14px;
  font-variant: unicase;
`;

const InstructionsRow = styled(Row)`
  margin-top: 20px;
  background-color: rgba(1, 1, 1, 0.02);
  box-shadow: 8px 9px 17px 0px rgba(1, 1, 1, 0.1);
  padding: 10px;
`;

const Instruction = styled.p`
  font-size: 11px;
  margin-bottom: 0.4em !important;
`;

const Text = styled.p`
  font-size: 8px;
  letter-spacing: 0.1em;
  text-indent: 0.05em;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0 !important;
`;
