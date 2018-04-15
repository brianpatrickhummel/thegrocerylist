// Will mount on a new DOM Node as a child of SearchResults component
// Using React16's Portal feature

import React from "react";
import styled from "styled-components";
import { Card, Icon, Spin } from "antd";
const { Meta } = Card;

const SearchResultsSingle = props => {
  let { goBack, dataElement, saveRecipe, saveLoader, showSaveLoader } = props;

  // Ant Design Spinner
  const antIcon = <Icon type="loading" style={{ fontSize: 80 }} spin />;

  console.log("dataElement at SRS Comp: ", dataElement);
  console.log("dataElement.id: ", dataElement.id);
  return (
    <ModalContainer>
      {!saveLoader && (
        <RecipeCard
          cover={<img alt="example" src={dataElement.image} />}
          actions={[
            <Icon type="arrow-left" onClick={goBack} />,
            <Icon
              type="like"
              onClick={() => {
                showSaveLoader();
                saveRecipe(dataElement.id, dataElement);
              }}
            />,
            <a href={dataElement.sourceUrl} target="about_blank">
              <Icon type="link" />
            </a>
          ]}
        >
          <MetaSection title={dataElement.title} description={dataElement.instructions} />
        </RecipeCard>
      )}

      {saveLoader && (
        <SpinnerCard bordered={false}>
          <Spin indicator={antIcon} />
        </SpinnerCard>
      )}
    </ModalContainer>
  );
};

export default SearchResultsSingle;

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

const MetaSection = styled(Meta)`
  text-align: center;
`;

const RecipeCard = styled(Card)`
  width: 40%;
  @media (max-width: 992px) {
    width: 70%;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
`;

const SpinnerCard = styled(Card)`
  width: 90%;
  height: 92%;
  background: rgba(0, 0, 0, 0) !important;
  text-align: center !important;
  padding: 45% 0 !important;
`;
