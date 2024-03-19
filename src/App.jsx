import { useState } from "react";
import "./styles/App.css";

function App() {
  // Inizio useState
  // useState per memorizzare la lista dei todos
  const [todos, setTodos] = useState([]);

  // useState per memorizzare il nuovo todo inserito dall'utente
  const [newTodo, setNewTodo] = useState("");

  // useState per memorizzare l'indice del todo in modalità di modifica
  const [editIndex, setEditIndex] = useState(null);

  // useState per memorizzare il testo modificato durante la modifica di un todo
  const [editedTodo, setEditedTodo] = useState("");

  // Questa funzione definisce uno stato per gestire la visibilità della to-do list
  const [showTodos, setShowTodos] = useState(false);

  // Fine useState

  // Questa funzione gestisce il cambiamento nell'input per il nuovo todo
  const handleNewTodoChange = (e) => {
    e.preventDefault();
    setNewTodo(e.target.value);
  };

  // Questa funzione aggiunge un nuovo todo alla lista dei todos
  const handleAddTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo, done: false }]);
    setNewTodo("");
  };

  // Questa funzione elimina un todo dalla lista dei todos
  const handleTodoDelete = (index, e) => {
    e.stopPropagation();
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // Questa funzione avvia la modalità di modifica per un todo specifico
  const handleEditTodo = (index, e) => {
    e.stopPropagation();
    setEditIndex(index);
    setEditedTodo(todos[index].text);
  };

  // Questa funzione salva le modifiche apportate a un todo in modalità di modifica e le rende permanenti
  const handleSaveEdit = (index, e) => {
    e.stopPropagation();
    const newTodos = [...todos];
    newTodos[index].text = editedTodo;
    setTodos(newTodos);
    setEditIndex(null);
  };

  // Questa funzione gestisce il click sul pulsante per mostrare/nascondere la to-do list
  const handleToggleTodos = () => {
    setShowTodos(!showTodos);
  };

  // Questa funzione resetta totalmente la lista di todo al click sul pulsante 
  const handleDeleteAllTodos = () => {
    setTodos([]); 
  };

  return (
    <>
      {/* Layout iphone */}
      <div className="iphone-x">
        <div className="side">
          <div className="screen relative flex m-auto">
            {/* Qui devo strutturare tutto il codice della to do list */}
            <button className="button-2 m-auto " onClick={handleToggleTodos}>
              {showTodos ? "Nascondi To do List" : "Create To do List"}
            </button>
            {showTodos && (
              <>
                <div className="flex flex-col gap-5 border border-gray-400 rounded p-5 absolute w-48 h-1/2 overflow-scroll top-50 left-50 bg-white font-serif todolist todolist-container">
                  <div className="card">
                    <div className="flex p-2 gap-1">
                      <div className="" onClick={handleToggleTodos}>
                        <span className="bg-red-500 inline-block center w-4 h-4 rounded-full"></span>
                      </div>
                      <div className="circle">
                        <span className="bg-yellow-500 inline-block center w-4 h-4 rounded-full"></span>
                      </div>
                      <div className="circle">
                        <span className="bg-green-500 box inline-block center w-4 h-4 rounded-full"></span>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-center">Todo List</h2>
                  <form className="flex items-center justify-between">
                    <input
                      type="text"
                      placeholder="Inserisci Todo"
                      name="text"
                      value={newTodo}
                      onChange={handleNewTodoChange}
                      className="px-2 py-2 m-2 write-todo"
                    />
                    <button
                      className="button"
                      type="button"
                      onClick={handleAddTodo}
                    >
                      <span className="button__text text-center"></span>
                      <span className="button__icon">
                        <svg
                          className="svg"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="12" x2="12" y1="5" y2="19"></line>
                          <line x1="5" x2="19" y1="12" y2="12"></line>
                        </svg>
                      </span>
                    </button>
                  </form>
                  {todos.length === 0 ? (
                    <p className="flex flex-col m-auto p-4 text-7xl text-center">
                      <span className="emoji">🤓</span>
                    </p>
                  ) : (
                    <>
                      <div className="flex gap-4 items-center justify-between">
                      <span className="emoji text-center text-3xl">😱</span>
                        {/* Button reset */}
                      <button className="noselect mb-3" onClick={handleDeleteAllTodos}>
                        <span className="text mt-1">Reset</span>
                        <span className="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                          </svg>
                        </span>
                      </button>
                      {/* Fine button reset */}
                      </div>
                      <ul className="todos">
                        {todos.map((todo, index) => (
                          <li
                            className="todo flex gap-5 justify-start items-center m-2"
                            key={index}
                          >
                            {editIndex === index ? (
                              <>
                                <input
                                  type="text"
                                  value={editedTodo}
                                  onChange={(e) =>
                                    setEditedTodo(e.target.value)
                                  }
                                  className="border border-2 px-2 py-1"
                                />
                                <button className="button save flex justify-center">
                                  <i
                                    className="fa-regular fa-bookmark fa-xl"
                                    onClick={(e) => handleSaveEdit(index, e)}
                                  ></i>
                                </button>
                              </>
                            ) : (
                              <>
                                <div className="todolist flex justify-between">
                                  <div className="flex gap-10">
                                    <label className="checkbox-container">
                                      <input type="checkbox" />
                                      <span className="checkmark"></span>
                                    </label>
                                    <p className="items-center mt-1">
                                      {todo.text}
                                    </p>
                                  </div>
                                  <div className="flex gap-5">
                                    <button className="button edit flex justify-center">
                                      <i
                                        className="fa-regular fa-pen-to-square"
                                        onClick={(e) =>
                                          handleEditTodo(index, e)
                                        }
                                      ></i>
                                    </button>
                                    <button className="button delete flex justify-center">
                                      <i
                                        className="fa-regular fa-trash-can"
                                        onClick={(e) =>
                                          handleTodoDelete(index, e)
                                        }
                                      ></i>
                                    </button>
                                  </div>
                                </div>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="line"></div>
  <div className="header">
    <div className="sensor-1"></div>
    <div className="sensor-2"></div>
    <div className="sensor-3"></div>
  </div>
  <div className="volume-button"></div>
  <div className="power-button"></div>
        </div>
      </div>
    </>
  );
}

export default App;
