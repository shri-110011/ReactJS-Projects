import { Component } from "react";

import "./App.css";
// import Card from "./components/Card/Card";
import Header from "./components/Header/Header";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rating: 1,
      courses: [],
    };
  }

  // {
  //   _id: 101,
  //   courseName: "Node.js",
  //   courseDept: "WD",
  //   description: "Node.js is used to create back-end services.",
  //   duration: 10,
  //   isRated: false,
  //   isApplied: true,
  //   noOfRatings: 15,
  //   rating: 4.5
  // },
  // {
  //   _id: 102,
  //   courseName: "React.js",
  //   courseDept: "WD",
  //   description: "React.js is used to create front-end services.",
  //   duration: 14,
  //   isRated: true,
  //   isApplied: true,
  //   noOfRatings: 145,
  //   rating: 4.3
  // },
  // {
  //   _id: 103,
  //   courseName: "Angular",
  //   courseDept: "WD",
  //   description: "Angular is used to create front-end services.",
  //   duration: 18,
  //   isRated: false,
  //   isApplied: false,
  //   noOfRatings: 10,
  //   rating: 4.1
  // },
  // {
  //   _id: 104,
  //   courseName: "Machine Learning",
  //   courseDept: "AI",
  //   description: "ML is used in AI.",
  //   duration: 20,
  //   isRated: false,
  //   isApplied: true,
  //   noOfRatings: 18,
  //   rating: 4.6
  // },
  // {
  //   _id: 105,
  //   courseName: "Springboot",
  //   courseDept: "WD",
  //   description: "Springboot is used to create back-end services.",
  //   duration: 12,
  //   isRated: false,
  //   isApplied: true,
  //   noOfRatings: 6,
  //   rating: 4.4
  // }

  componentDidMount() {
    this.handleGetData();
  }

  handleGetData() {
    fetch("http://localhost:3001/courses/get")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ courses: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleApply(id) {
    console.log("Enroll for course with id: " + id);
    fetch("http://localhost:3001/courses/enroll/" + id, {
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.confirm(data.message);
        this.handleGetData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async handleRating(e) {
   this.setState({rating: e.target.value});
  }

  async handleAddRating(id) {
    const requestBody = {
      rating: this.state.rating,
    };
    const response = await fetch("http://localhost:3001/courses/rating/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
 
    console.log(data);
    window.confirm(data.message);
    this.handleGetData();
  }

  handleDrop(id) {
    console.log("Drop for course with id: " + id);
    fetch("http://localhost:3001/courses/drop/" + id, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.confirm(data.message);
        this.handleGetData();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="card-container">
          {this.state.courses.map((course) => (
            <div className="card" key={course._id}>
              <ul>
                <li>{course.courseName}</li>
                <li>{course.courseDept}</li>
                <li>{course.description}</li>
                {course.isApplied && !course.isRated && (
                  <li>
                    Rate:
                    <select className="rating-dropdown" onChange={this.handleRating.bind(this)}>
                      <option >1</option>
                      <option >2</option>
                      <option >3</option>
                      <option >4</option>
                      <option >5</option>
                    </select>
                    <button type="button" onClick={this.handleAddRating.bind(this, course._id, 5)}>
                      Add
                    </button>
                  </li>
                )}
                <li>
                  {course.isApplied ? (
                    <button
                      className="course-drop-btn"
                      onClick={this.handleDrop.bind(this, course._id)}
                    >
                      Drop
                    </button>
                  ) : (
                    <button className="apply-btn" onClick={this.handleApply.bind(this, course._id)}>
                      Apply
                    </button>
                  )}
                </li>
              </ul>
              <footer>
                <li>
                  {` ${course.duration} hrs . ${course.noOfRatings} Ratings . 
              ${course.rating}/5`}
                </li>
              </footer>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

// {this.state.courses.map((course) => (
//   <Card
//     onApply={this.handleApply.bind(this)}
//     onDrop={this.handleDrop.bind(this)}
//     onAddRating={this.handleAddRating.bind(this)}
//     course={course}
//     key={course._id}
//   />
// ))}
