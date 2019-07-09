import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal } from "antd";

import styled from "@emotion/styled";

const CreateTaskButton = styled.button`
  padding: 10px 20px;
  background-image: linear-gradient(to bottom right, #da4453, #89216b);
  color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 10px 25px 5px rgba(218, 68, 83, 0.25);
`;

const FlatButton = styled.button`
  padding: 10px 20px;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 4px;
`;

class CreateTask extends React.Component {
  state = {
    isVisible: false
  };

  render() {
    return (
      <React.Fragment>
        <CreateTaskButton
          onClick={() => {
            this.setState({
              isVisible: true
            });
          }}
        >
          + Create Task
        </CreateTaskButton>
        <img
          src="https://www.xcidic.com/static/xcidic-logo.svg"
          height="40px"
        />
        <Modal title="Create Task" visible={this.state.isVisible} footer={null}>
          <div>
            <FlatButton
              className="mr-2"
              style={{
                padding: "6px 15px"
              }}
            >
              Cancel
            </FlatButton>
            <CreateTaskButton
              style={{
                padding: "6px 15px"
              }}
              onClick={() => {
                this.setState({
                  isVisible: false
                });
              }}
            >
              Create
            </CreateTaskButton>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect()(CreateTask);
