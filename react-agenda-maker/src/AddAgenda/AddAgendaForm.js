import React from "react";
import AgendaTopics from "./AgendaTopics";

class AddAgendaForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      topic: "",
      topics: [],
      errors: {
        title: null,
        description: null,
        topic: null,
      },
      isFormValid: false
    };

    this.titleHandler = this.titleHandler.bind(this);
    this.descriptionHandler = this.descriptionHandler.bind(this);
    this.topicHandler = this.topicHandler.bind(this);
    this.addTopic = this.addTopic.bind(this);
    this.checkFormValidity = this.checkFormValidity.bind(this);
    this.submitAgendaHandler = this.submitAgendaHandler.bind(this);
  }

  titleHandler(event) {
    let title = event.target.value;
    let msg;

    title.trim().length === 0 ? (msg = "Title is required") : (msg = "");

    this.setState((prevState) => {
      return {
        title: title,
        errors: {
          ...prevState.errors,
          title: msg
        }
      };
    }, () => {
        this.checkFormValidity();
    });
  }

  descriptionHandler(event) {
    let description = event.target.value;
    let msg;

    description.trim().length === 0 ? (msg = "Description is required") : (msg = "");

    this.setState((prevState) => {
      return {
        description: description,
        errors: {
          ...prevState.errors,
          description: msg,
        },
      };
    }, () => {
        this.checkFormValidity();
    });
  }

  topicHandler(event) {
    let topic = event.target.value;
    let msg;

    topic.trim().length === 0 ? (msg = "Topic is required") : (msg = "");

    this.setState((prevState) => {
      return {
        topic: topic,
        errors: {
          ...prevState.errors,
          topic: msg,
        },
      };
    }, () => {
        this.checkFormValidity();
    });

    this.checkFormValidity();
  }

  addTopic() {
    this.setState(prevState => { 
        return {
            topic: "" ,
            topics: [...prevState.topics, prevState.topic]
        }
    }, () => {
      this.checkFormValidity();
    });
  }

  checkFormValidity() {
    let errors = this.state.errors;
    for (let key in errors) {
      if (errors[key] === null || errors[key] !== "") {
        this.setState({ isFormValid: false });
        return;
      }
    }
    if(this.state.topics.length !== 0)
      this.setState({ isFormValid: true });
  }

  submitAgendaHandler(event) {
    console.log(event);
    event.preventDefault();

    let agenda = {
      title: this.state.title,
      description: this.state.description,
      topics: [...this.state.topics],
    };
    this.props.onAgendaAdded(agenda);

    this.setState({
        title: "",
        description: "",
        topic: "",
        topics: []
    });
  }

  render() {
    return (
      <div>
        <form className="mt-3 clearfix">
          <div className="my-2">
            <label>
              <strong>Title</strong>
            </label>
            <input
              type="text"
              name="title"
              className="form-control mt-2"
              value={this.state.title}
              onChange={this.titleHandler}
            />
            <span className="text-danger">{this.state.errors.title}</span>
          </div>
          <div className="my-2">
            <label>
              <strong>Description</strong>
            </label>
            <input
              type="text"
              name="description"
              className="form-control mt-2"
              value={this.state.description}
              onChange={this.descriptionHandler}
            />
            <span className="text-danger">{this.state.errors.description}</span>
          </div>
          <div className="my-2">
            <label>
              <strong>Topic</strong>
            </label>
            <input
              type="text"
              name="topic"
              className="form-control mt-2"
              value={this.state.topic}
              onChange={this.topicHandler}
            />
            <span className="text-danger">{this.state.errors.topic}</span>
          </div>
          <div className="mt-3 float-end">
            <button
              type="button"
              className="btn btn-success mx-2"
              onClick={this.addTopic}
              disabled={this.state.topic.trim().length === 0}
            >
              Add Topic
            </button>
            <button
              type="submit"
              className="btn btn-success mx-2"
              disabled={!this.state.isFormValid}
              onClick={this.submitAgendaHandler}
            >
              Submit
            </button>
          </div>
        </form>
        {this.state.topics.length === 0 ? (
          <div className="text-danger">No Topics Added</div>
        ) : (
          <AgendaTopics topics={this.state.topics} />
        )}
      </div>
    );
  }
}

export default AddAgendaForm;
