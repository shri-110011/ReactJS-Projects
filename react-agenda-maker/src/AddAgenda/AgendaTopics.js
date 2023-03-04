import React from "react";

class AgendaTopics extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="card my-3">
        <div className="card-header">Added Topics</div>
        <div className="card-body">
          <ul className="list-group">
            {
              this.props.topics.map((topic, index) => (
                <li className="list-group-item" key={index}>{topic}</li>
              ))
            }
          </ul>
        </div>
        <div className="card-footer">Refer the topics you added</div>
      </div>
    );
  }
}

export default AgendaTopics;
