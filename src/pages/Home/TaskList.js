import React from "react";
import styled from "@emotion/styled";
import moment from "moment";

import { connect } from "react-redux";
import { Table, Modal, message, Popconfirm, DatePicker } from "antd";

import {
  completeTask,
  getTaskList,
  deleteTask,
  updateTask
} from "../../modules/task/actions";

import { bindActionCreators } from "redux";
import { Formik, Form } from "formik";
import {
  CreateTaskButton,
  FieldWrapper,
  FieldStyled,
  FlatButton
} from "./CreateTask";

const { Column } = Table;

const DetailButton = styled.button`
  border-radius: 2.5px;
  margin: 2px;
  border: none;
  color: #fff;
  background: ${props =>
    props.primary
      ? `linear-gradient(to bottom right, #9CECFB, #0052D4)`
      : props.danger
      ? `linear-gradient(to bottom right, #da4453, #89216b);`
      : `linear-gradient(to bottom right, #f46b45, #eea849)`};

  :disabled {
    color: #333;
    background: #ccc;
  }
`;

class TaskList extends React.Component {
  state = {
    isDetailVisible: false,
    isEditVisible: false,
    selectedDetail: {}
  };

  render() {
    return (
      <React.Fragment>
        <Table
          dataSource={this.props.task.list.data}
          loading={
            this.props.task.list.isLoading || this.props.task.complete.isLoading
          }
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Due Date"
            dataIndex="dueDate"
            key="dueDate"
            render={(dueDate, r) => (
              <React.Fragment>
                {moment(dueDate).diff(moment()) < 0 && !r.isCompleted ? (
                  <span style={{ color: "red" }}>
                    <span>{moment(dueDate).format("DD MMMM YYYY")}</span> -{" "}
                    <b>OVERDUE</b>
                  </span>
                ) : (
                  moment(dueDate).format("DD MMMM YYYY")
                )}
              </React.Fragment>
            )}
          />
          <Column
            title="Completed"
            dataIndex="isCompleted"
            key="isCompleted"
            render={t => (t ? "Yes" : "No")}
          />
          {!this.props.user.isManager && (
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />
          )}
          {this.props.user.isManager && (
            <Column
              title="Creator"
              dataIndex="creator.name"
              key="creator.name"
            />
          )}

          <Column
            title=""
            dataIndex="_id"
            key="_id"
            render={(t, r, i) => (
              <div className="text-right">
                {this.props.user.isManager ? (
                  <DetailButton
                    primary
                    onClick={() => {
                      this.setState({
                        isDetailVisible: true,
                        selectedDetail: r
                      });
                    }}
                  >
                    Detail
                  </DetailButton>
                ) : !r.isCompleted ? (
                  <Popconfirm
                    title="Are you sure want to complete this task?"
                    onConfirm={() => {
                      this.props.completeTask(r._id).then(() => {
                        message.success("Successfully Completed Task");
                        this.props.getTaskList();
                      });
                    }}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DetailButton
                      primary
                      onClick={() => {}}
                      disabled={this.props.task.complete.isLoading}
                    >
                      Complete
                    </DetailButton>
                  </Popconfirm>
                ) : (
                  ""
                )}
                {!this.props.user.isManager && (
                  <React.Fragment>
                    <DetailButton
                      onClick={() => {
                        this.setState({
                          isEditVisible: true,
                          selectedDetail: r
                        });
                      }}
                    >
                      <i className="fa fa-pencil" />
                    </DetailButton>
                    <Popconfirm
                      title="Are you sure want to delete this task?"
                      onConfirm={() => {
                        this.props.deleteTask(r._id).then(() => {
                          message.success("Successfully Deleted Task");
                          this.props.getTaskList();
                        });
                      }}
                      // onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DetailButton danger>
                        <i className="fa fa-trash" />
                      </DetailButton>
                    </Popconfirm>
                  </React.Fragment>
                )}
              </div>
            )}
          />
        </Table>

        <Modal
          visible={this.state.isDetailVisible}
          title="Task Detail"
          footer={[
            <CreateTaskButton
              onClick={() => {
                this.setState({
                  isDetailVisible: false
                });
              }}
            >
              Confirm
            </CreateTaskButton>
          ]}
        >
          <table className="table">
            <tr>
              <th>Name</th>
              <td>{this.state.selectedDetail.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{this.state.selectedDetail.description}</td>
            </tr>
            <tr>
              <th>Creator</th>
              <td>
                {this.state.selectedDetail.creator &&
                  this.state.selectedDetail.creator.name}
              </td>
            </tr>
            <tr>
              <th>Due Date</th>
              <td>
                {moment(this.state.selectedDetail.dueDate).format(
                  "DD MMMM YYYY"
                )}{" "}
                {moment(this.state.selectedDetail.dueDate).diff(moment()) < 0 &&
                !this.state.selectedDetail.isCompleted ? (
                  <span>
                    - <b style={{ color: "red" }}>OVERDUE</b>
                  </span>
                ) : (
                  ""
                )}
              </td>
            </tr>
            <tr>
              <th>Completed</th>
              <td>{this.state.selectedDetail.isCompleted ? "Yes" : "No"}</td>
            </tr>
          </table>
        </Modal>

        <Modal
          title="Edit Task"
          visible={this.state.isEditVisible}
          footer={null}
        >
          <Formik
            initialValues={{
              ...this.state.selectedDetail,
              dueDate: moment(this.state.selectedDetail.dueDate)
            }}
            enableReinitialize
            onSubmit={val => {
              this.props
                .updateTask(this.state.selectedDetail._id, val)
                .then(() => {
                  message.success("Successfully Updated Task");
                  this.setState({
                    isEditVisible: false
                  });
                  this.props.getTaskList();
                })
                .catch(() => {
                  message.error(
                    this.props.task.update.errorMessage ||
                      "Unknown Error has Occured"
                  );
                });
            }}
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
                      this.setState({
                        isEditVisible: false
                      });
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
                    {this.props.task.isLoading ? "Please Wait..." : "Update"}
                  </CreateTaskButton>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task,
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      completeTask,
      getTaskList,
      deleteTask,
      updateTask
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
