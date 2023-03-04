import React from "react";
import AddAgendaForm from "./AddAgendaForm";

class AddAgenda extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      topics: [],
    };

    this.viewAgendaHandler = this.viewAgendaHandler.bind(this);
    this.agendaAddedHandler = this.agendaAddedHandler.bind(this);
  }

  viewAgendaHandler() {
    this.props.onChangeView("view-agenda");
  }

  agendaAddedHandler(agenda) {
    this.props.onAgendaAdded(agenda);
  }

  render() {
    return (
      <div>
        <button 
            type="button" 
            className="btn btn-success btn-sm mt-3"
            onClick={this.viewAgendaHandler}>
          Click to View Agenda
        </button>
        <AddAgendaForm onAgendaAdded={this.agendaAddedHandler} />
      </div>
    );
  }
}

export default AddAgenda;
