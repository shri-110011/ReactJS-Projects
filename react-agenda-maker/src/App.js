import React from "react";
import AddAgenda from "./AddAgenda/AddAgenda";
import "./App.css";
import ViewAgenda from "./ViewAgenda/ViewAgenda";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agendas: [
        {
          title: "Angular",
          description: "Some description about the Angular",
          topics: [
            "Introduction",
            "TypeScript",
            "Why Angular?",
            "Understanding Versions",
            "Fundamentals",
          ],
        },
        {
          title: "Vue",
          description: "Some description about the Vue",
          topics: [
            "Introduction",
            "JavaScript",
            "Why Vue?",
            "Vue Bindings",
            "Component Interaction",
          ],
        },
      ],
      showAddAgenda: true,
    };

    this.changeViewHandler = this.changeViewHandler.bind(this);
    this.agendaAddedHandler = this.agendaAddedHandler.bind(this);
  }

  changeViewHandler(viewName) {
    if (viewName === "add-agenda") {
      this.setState({
        showAddAgenda: true,
      });
    } else if (viewName === "view-agenda") {
      this.setState({
        showAddAgenda: false
      });
    }
  }

  agendaAddedHandler(agenda) {
    this.setState(prevState => (
      {
        agendas: [...prevState.agendas, agenda]
      }
    ));
  }

  render() {
    return (
      <div className="container mt-3">
        <h3>Agenda Maker</h3>
        {
          this.state.showAddAgenda ? 
          <AddAgenda onAgendaAdded={this.agendaAddedHandler} onChangeView={this.changeViewHandler} /> : 
          <ViewAgenda agendas={this.state.agendas} onChangeView={this.changeViewHandler} />
        }
      </div>
    );
  }
}

export default App;
