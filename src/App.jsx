import { useState } from "react";
import Image from "./images/bg.jpg";
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

  return (
    <>
      <div
        className="flex justify-center items-center h-screen bg-bottom relative"
        style={{ backgroundImage: `url(${Image})` }}
      >
        {/* Pulsante per mostrare/nascondere la to-do list */}
        <button
          className="cursor-pointer font-semibold overflow-hidden relative top-70 z-100 border border-green-500 group px-8 py-2"
          onClick={handleToggleTodos}
        >
          <span className="relative z-10 text-green-500 group-hover:text-white text-xl duration-500"></span>
          <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          {showTodos ? "Nascondi To do List" : "Mostra To do List"}
        </button>

        {/* Contenitore per la to-do list */}
        {showTodos && (
          <div className="flex flex-col gap-5 border border-gray-400 rounded p-5 shadow-lg absolute top-96 left-50 bg-white font-serif todolist">
            <div className="card">
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
                <p className="m-4">
                  Nessun todo da visualizzare
                  <span className="text-2xl animate-spin"> 🤷</span>
                </p>
              ) : (
                <ul className="todos">
                  {todos.map((todo, index) => (
                    <li
                      className="todo flex gap-5 justify-start items-center m-4"
                      key={index}
                    >
                      {editIndex === index ? (
                        <>
                          <input
                            type="text"
                            value={editedTodo}
                            onChange={(e) => setEditedTodo(e.target.value)}
                            className="border border-2 px-2 py-1"
                          />
                          <button className="button save flex justify-center">
                            <i
                              className="fa-regular fa-bookmark fa-xl"
                              onClick={(e) => handleSaveEdit(index, e)}
                            ></i>
                          </button>
                          {/* <button
                            className="bg-lime-950 text-lime-400 border border-lime-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                            onClick={(e) => handleSaveEdit(index, e)}
                          >
                            <span className="bg-lime-400 shadow-lime-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                            Save
                          </button> */}
                        </>
                      ) : (
                        <>
                          <div className="todolist flex justify-between">
                            <div className="flex gap-10">
                              <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                              <p className="items-center mt-1">{todo.text}</p>
                            </div>
                            <div className="flex gap-5">
                              <button className="button edit flex justify-center">
                                <i
                                  className="fa-regular fa-pen-to-square"
                                  onClick={(e) => handleEditTodo(index, e)}
                                ></i>
                              </button>
                              <button className="button delete flex justify-center">
                                <i
                                  className="fa-regular fa-trash-can"
                                  onClick={(e) => handleTodoDelete(index, e)}
                                ></i>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
