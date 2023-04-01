import { Fragment, useRef } from "react";
import "./Card.css";

const Card = (props) => {
  const ratingRef = useRef("");
  const enrollForCourse = () => {
    props.onApply(props.course._id);
  }

  const dropFromCourse = () => {
    props.onDrop(props.course._id);
  }

  const addRating = () => {
    props.onAddRating(props.course._id, ratingRef.current.value);
  }

  const actionBtn = props.course.isApplied ? (
    <button className="course-drop-btn" onClick={dropFromCourse}>Drop</button>
  ) : (
    <button className="apply-btn" onClick={enrollForCourse}>Apply</button>
  );

  const ratingContent = (props.course.isApplied && !props.course.isRated) ? (
    <Fragment>
      Rate: 
      <select className="rating-dropdown" ref={ratingRef}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <button type="button" onClick={addRating}>Add</button>
    </Fragment>
  ): '';

  return (
      <div className="card">
        <ul>
          <li>{props.course.courseName}</li>
          <li>{props.course.courseDept}</li>
          <li>{props.course.description}</li>
          <li>{ratingContent}{actionBtn}</li>
        </ul>
        <footer>
          {props.course.duration}hrs . {props.course.noOfRatings} Ratings .{" "}
          {props.course.rating}/5
        </footer>
      </div>
  );
};

export default Card;
