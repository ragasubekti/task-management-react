import React from "react";
import { connect } from "react-redux";
import { Table, Modal, message, Popconfirm } from "antd";
import styled from "@emotion/styled";
import moment from "moment";
import { CreateTaskButton } from "./CreateTask";
import {
  completeTask,
  getTaskList,
  deleteTask
} from "../../modules/task/actions";
import { bindActionCreators } from "redux";

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
                    <DetailButton>
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
      deleteTask
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
