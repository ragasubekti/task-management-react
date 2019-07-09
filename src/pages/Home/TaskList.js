import React from "react";
import { connect } from "react-redux";
import { Table } from "antd";

const { Column } = Table;

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
                <button className="btn btn-primary">Detail</button>
                <button>
                  <i className="fa fa-pencil" />
                </button>
                <button>
                  <i className="fa fa-trash" />
                </button>
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
