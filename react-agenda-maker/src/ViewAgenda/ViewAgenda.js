import React from "react";
import Agenda from "./Agenda";

class ViewAgenda extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.addAgendaHandler = this.addAgendaHandler.bind(this);
  }

  addAgendaHandler() {
    this.props.onChangeView("add-agenda")
  }

  render() {
    return (
      <div className="my-3">
        <button 
          className="btn btn-success btn-sm mb-3"
          onClick={this.addAgendaHandler}>
        Click to Add Agenda</button>
        {
          this.props.agendas.map((agenda, index) => (
            <Agenda key={index} agenda={agenda} />
          ))
        }
      </div>
    );
  }
}

export default ViewAgenda;
