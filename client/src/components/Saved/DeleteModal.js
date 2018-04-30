import { Modal, Button, Icon } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
// import "../index.css";
import styled from "styled-components";
import { deleteRecipe } from "../../actions";
const FontAwesome = require("react-fontawesome");

class DeleteModal extends Component {
  state = {
    visible: false,
    recipeId: "",
    recipeTitle: ""
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = (recipeId, cuisine, deleteRecipe) => {
    console.log("running handleOk");
    deleteRecipe(recipeId, cuisine);
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { recipeTitle, recipeId, cuisine, deleteRecipe } = this.props;

    return (
      <div className="deleteRecipeModalComponent">
        <Modal
          visible={visible}
          wrapClassName="unlinkModal"
          title={[<Icon key={1} type="question-circle-o" />, ` DELETE SAVED RECIPE `]}
          maskStyle={{ background: "rgba(28,9,9,0.9)" }}
          footer={[
            <ModalButton key="back" onClick={this.handleCancel}>
              NO, CANCEL
            </ModalButton>,
            <ModalButton key="submit" type="primary" onClick={() => this.handleOk(recipeId, cuisine, deleteRecipe)}>
              YES, DELETE
            </ModalButton>
          ]}
        >
          <FontAwesome className="share-icon" style={{ color: "#b82933" }} size="2x" name={recipeId.toString()} />
          <ModalBodyText>{"DELETE THIS RECIPE ?"}</ModalBodyText>
          <ModalBodyText2>{recipeTitle.toUpperCase()}</ModalBodyText2>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { deleteRecipe }, null, { withRef: true })(DeleteModal);

const ModalButton = styled(Button)`
  font-size: 11px !important;
`;

const ModalBodyText = styled.p`
  font-size: 18px !important;
  color: #b82933 !important;
`;

const ModalBodyText2 = styled.p`
  font-size: 14px !important;
  color: rgba(1, 1, 1, 0.85) !important;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, 0.35), 1px 1px 1px rgba(1, 1, 1, 0.1);
`;
