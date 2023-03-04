import React from "react";

class Agenda extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="card my-3">
        <div className="card-header">{this.props.agenda.title}</div>
        <div className="card-body">
          <ul className="list-group">
            {
              this.props.agenda.topics.map((topic, index) => (
                <li className="list-group-item" key={index}>{topic}</li>
              ))
            }
          </ul>
        </div>
        <div className="card-footer">{this.props.agenda.description}</div>
      </div>
    );
  }
}

export default Agenda;
