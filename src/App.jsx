import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  let handelAdd = () => {
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
    setTodo(" ");
    saveToLS();
  };

  let handelEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);

    saveToLS();
  };

  let handelDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);

    saveToLS();
  };

  let handleChange = (e) => {
    setTodo(e.target.value);
  };

  let handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLS();
  };

  return (
    <>
      <Navbar />

      <div className="container sm:mt-4 mx-auto w-screen">
        <div className="section-2 bg-slate-900 text-white p-4">
          <h2 className="my-2 sm:text-lg text-base font-bold">Add Todo</h2>
          <div className="addTodo flex items-center gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="sm:w-1/2 w-3/4 text-black outline-none p-1 text-sm"
            />
            <button
              onClick={handelAdd}
              disabled={todo.length <= 2}
              className="bg-gray-300 px-3 py-1 text-sm rounded-md text-black disabled:bg-gray-100"
            >
              Add
            </button>
          </div>
        </div>

        <div className="section-1 bg-slate-800 text-white p-4 border-b-[1px] border-gray-700">
          <h2 className="my-2 sm:text-lg text-base font-bold">Your Todos</h2>
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            name=""
            id=""
          />{" "}
          Show Finished
        </div>

        <div className="section-1 bg-slate-800 text-white p-4 sm:h-[50vh] h-[67vh] overflow-y-scroll">
          {todos.length === 0 && (
            <div className="text-gray-400 font-light pl-2">
              No Todos to display...
            </div>
          )}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todos flex items-center sm:gap-4 gap-2 my-3 "
                >
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    name={item.id}
                    checked={item.isCompleted}
                    id="checkbox"
                  />
                  <div
                    className={
                      item.isCompleted ? "line-through w-2/3 mr-3 " : "  w-2/3 mr-3 "
                    }
                  >
                    {item.todo}
                  </div>
                  <button
                    onClick={(e) => {
                      handelEdit(e, item.id);
                    }}
                    className="bg-gray-300 sm:px-3 px-1 py-1 rounded-md text-black"
                  >
                   <img src="\edit.svg" alt="delete" srcset="" />
                  </button>
                  <button
                    onClick={(e) => {
                      handelDelete(e, item.id);
                    }}
                    className="bg-gray-300 sm:px-3 px-1 py-1 rounded-md text-black"
                  >
                    <img src="\delete.svg" alt="delete" srcset="" />
                  </button>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
