import React from "react";

function Task({ title, section, description }) {
  return (
    <div className="task">
      <h2>{title}</h2>
      <h3>{section}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Task;
