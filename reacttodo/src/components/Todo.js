import axios from "axios";
import React from "react";

function TodoItem({ todo, setTodoList }) {
  const deleteTodoHandler = (title) => {
    axios
      .delete(`http://localhost:8000/api/todo/${title}`)
      .then((res) => {
        console.log(res);
        setTodoList((newList) =>
          newList.filter((item) => item.title !== title)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <span style={{ fontweight: "bold, underline" }}>{todo.title} : </span>{" "}
        {todo.description}
          <button
            onClick={() => deleteTodoHandler(todo.title)}
            className="btn btn-outline-danger mx-2 my-2"
            style={{ borderRadius: "50px" }}
          >
            Delete
          </button>
        <hr></hr>
      </div>
    </div>
  );
}

export default TodoItem;
