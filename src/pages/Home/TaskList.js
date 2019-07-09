import React from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import styled from "@emotion/styled";

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
`;

class TaskList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Table dataSource={this.props.task.data}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Due Date" dataIndex="dueDate" key="dueDate" />
          <Column title="Creator" dataIndex="creator.name" key="creator.name" />
          <Column
            title="Assigned To"
            dataIndex="asignedTo.name"
            key="asignedTo.name"
          />
          <Column
            title=""
            dataIndex="_id"
            key="_id"
            render={(t, r, i) => (
              <div className="text-right">
                <DetailButton primary>Detail</DetailButton>
                <DetailButton>
                  <i className="fa fa-pencil" />
                </DetailButton>
                <DetailButton danger>
                  <i className="fa fa-trash" />
                </DetailButton>
              </div>
            )}
          />
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  task: state.task
});

export default connect(mapStateToProps)(TaskList);
