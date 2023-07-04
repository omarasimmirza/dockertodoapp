// import "./home.sass"
import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoView from "../components/TodoListView";

function Home() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  var newList = [];

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/todo")
      .then((res) => {
        console.log(res);
        setTodoList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //post a todo item
  const addTodo = () => {
    if(todoList.some((item) => item.title === title)) {
    axios
      .put(`http://localhost:8000/api/todo/${title}/`, {
        title: title,
        description: desc,
      })
      .then((res) => {
        console.log(res);
        newList = todoList.filter((item) => item.title!== title);
        setTodoList([...newList, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      axios
      .post("http://localhost:8000/api/todo/", {
          title: title,
          description: desc,
        })
      .then((res) => {
          console.log(res);
          setTodoList([...todoList, res.data]);
        })
      .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Task Manager
          </a>
          <span className="navbar-text">FASTAPI - React - MongoDB</span>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="card h-100 mb-4">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">Add Your Task</h5>
                <input
                  className="mb-2 form-control"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
                <input
                  className="mb-2 form-control"
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Description"
                />
                <div className="text-center mt-auto">
                  <button
                    className="btn btn-outline-primary my-2 mx-2"
                    style={{ borderRadius: "50px", width: "100px" }}
                    onClick={addTodo}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100 mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Your Tasks</h5>
                <TodoView todoList={todoList} setTodoList={setTodoList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
