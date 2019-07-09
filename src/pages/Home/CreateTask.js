import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Modal, DatePicker } from "antd";

import { Formik, Form, Field, ErrorMessage } from "formik";

import styled from "@emotion/styled";
import { submitTask, getTaskList } from "../../modules/task/actions";

export const CreateTaskButton = styled.button`
  padding: 10px 20px;
  background-image: linear-gradient(to bottom right, #da4453, #89216b);
  color: #fff;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 10px 25px 5px rgba(218, 68, 83, 0.25);

  :disabled {
    background: #ccc;
    color: #666;
    box-shadow: none;
  }
`;

const FlatButton = styled.button`
  padding: 10px 20px;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 4px;
`;

const FieldWrapper = styled.div`
  margin-bottom: 10px;

  label {
    font-weight: 600;
    font-size: small;
  }
`;

const FieldStyled = styled(Field)`
  padding: 10px;
  width: 100%;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const DatePickerStyled = styled(DatePicker)`
  padding: 10px;
  width: 100%;
  display: block;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

class CreateTask extends React.Component {
  state = {
    isVisible: false
  };

  handleSubmit = values => {
    this.props.submitTask(values).then(() => {
      this.setState({
        isVisible: false
      });

      this.props.getTaskList();
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.user.isManager && (
          <CreateTaskButton
            onClick={() => {
              this.setState({
                isVisible: true
              });
            }}
          >
            + Create Task
          </CreateTaskButton>
        )}
        <img
          src="https://www.xcidic.com/static/xcidic-logo.svg"
          height="40px"
          alt="Logo"
        />
        <Modal title="Create Task" visible={this.state.isVisible} footer={null}>
          <Formik
            initialValues={{
              name: "",
              description: "",
              assignedTo: "",
              dueDate: null
            }}
            onSubmit={this.handleSubmit}
            // render=
          >
            {({ errors, setFieldValue, values }) => (
              <Form>
                <FieldWrapper>
                  <label>Name</label>
                  <FieldStyled placeholder="Name" name="name" />
                </FieldWrapper>
                <FieldWrapper>
                  <label>Description</label>
                  <FieldStyled
                    placeholder="Description"
                    name="description"
                    component="textarea"
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <label>Due Date</label>
                  <DatePicker
                    format="DD MMMM YYYY"
                    style={{
                      display: "block"
                    }}
                    onChange={(date, dateString) =>
                      setFieldValue("dueDate", date)
                    }
                    value={values.dueDate}
                  />
                </FieldWrapper>
                <div className="mt-4">
                  <FlatButton
                    className="mr-2"
                    style={{
                      padding: "6px 15px"
                    }}
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    Cancel
                  </FlatButton>
                  <CreateTaskButton
                    style={{
                      padding: "6px 15px"
                    }}
                    disabled={this.props.task.isLoading}
                  >
                    {this.props.task.isLoading ? "Please Wait..." : "Create"}
                  </CreateTaskButton>
                </div>
                {/* <Field placeholder="Name" name="name" /> */}
              </Form>
            )}
          </Formik>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task.submit,
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitTask,
      getTaskList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTask);
