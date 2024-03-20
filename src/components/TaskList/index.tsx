import React, { useState } from "react";
import Task from "../Task";

function TaskList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1",
      section: "Section A",
      description: "Description for Task 1",
    },
    {
      id: 2,
      title: "Task 2",
      section: "Section B",
      description: "Description for Task 2",
    },
    {
      id: 3,
      title: "Task 3",
      section: "Section C",
      description: "Description for Task 3",
    },
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    section: "",
    description: "",
  });

  const removeTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTask({ title: "", section: "", description: "" });
  };

  return (
    <div>
      <h1>Task List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={newTask.section}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <h2>{task.title}</h2>
            <h3>{task.section}</h3>
            <p>{task.description}</p>
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
