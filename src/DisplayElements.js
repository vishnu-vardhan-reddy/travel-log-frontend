import React from "react";
import "./DisplayElements.css";

function DisplayElements({
  title,
  description,
  comments,
  rating,
  image,
  visitDate,
}) {
  return (
    <div className="displayElements">
      <h3>{title}</h3>
      <p>{comments}</p>
      <small>Visited On: {new Date(visitDate).toLocaleDateString()}</small>
      {image && <img className="location__image" src={image} alt={title} />}
      {description && (
        <h4>
          <b>Description:</b>
          {description}
        </h4>
      )}
      {rating && (
        <h3>
          <b> Rating :</b> {rating}
        </h3>
      )}
    </div>
  );
}

export default DisplayElements;
