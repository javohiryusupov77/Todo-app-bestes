import React, { useReducer, useState } from "react";
import sound from "./assets/audio/done.wav";
import soundDelete from "./assets/audio/delete.wav";

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_DONE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, done: !task.done } : task
      );
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [newTask, setNewTask] = useState("");
  const [deletingTask, setDeletingTask] = useState(null);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = (event) => {
    event.preventDefault();

    if (newTask.trim() !== "") {
      const TASK = {
        id: Date.now(),
        taskName: newTask,
        done: false,
      };

      dispatch({ type: "ADD_TASK", payload: TASK });
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    deleteButtonVoice();
    setDeletingTask(id);
    setTimeout(() => {
      dispatch({ type: "DELETE_TASK", payload: id });
      setDeletingTask(null);
    }, 500);
  };

  const deleteButtonVoice = () => {
    new Audio(soundDelete).play();
  };

  const toggleDone = (id) => {
    playSound();
    dispatch({ type: "TOGGLE_DONE", payload: id });
  };

  const playSound = () => {
    new Audio(sound).play();
  };

  const pendingTasks = todos.filter((task) => !task.done);
  const completedTasks = todos.filter((task) => task.done);

  return (
    <div className="min-h-screen bg-bcg p-10">
      <div className="max-w-xl mx-auto bg-container rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Todo App
        </h1>
        <h2 className="text-xl mb-4 text-center text-white">
          Tasks: {todos.length}
        </h2>
        <form onSubmit={addTask} className="mb-4">
          <input
            onChange={handleInputChange}
            value={newTask}
            type="text"
            placeholder="Enter a task"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Add
          </button>
        </form>
        <div className="task-lists">
          <div className="pending-tasks mb-6">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Completing Tasks
            </h3>
            <ul className="list-disc space-y-2">
              {pendingTasks.map((t, index) => (
                <li
                  key={t.id}
                  className={`flex justify-between items-center p-2 bg-gray-200 rounded transition duration-500 ${
                    deletingTask === t.id ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span>
                    {index + 1}. {t.taskName}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleDone(t.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="completed-tasks">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Completed Tasks
            </h3>
            <ul className="list-disc space-y-2">
              {completedTasks.map((t, index) => (
                <li
                  key={t.id}
                  className={`flex justify-between items-center p-2 bg-gray-200 rounded transition duration-500 ${
                    deletingTask === t.id ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="line-through text-gray-500">
                    {index + 1}. {t.taskName}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleDone(t.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Undone
                    </button>
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
