import { For } from "solid-js";
import { createStore } from "solid-js/store";

function App() {
  const [taskList, setTaskList] = createStore([]);
  const [error, setError] = createStore({ message: "" });

  const addTask = (e) => {
    e.preventDefault();

    const taskInput = document.querySelector("#taskInput");

    if (!taskInput.value.trim()) {
      setError({ message: "Task cannot be empty" });
      return;
    }

    const newTask = {
      id: Math.random().toString(36).substring(2),
      text: taskInput.value.trim(),
      completed: false,
    };

    setTaskList([newTask, ...taskList]);
    setError({ message: "" });
    taskInput.value = "";
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const toggleStatus = (taskId) => {
    setTaskList(
      taskList.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : { ...task },
      ),
    );
  };

  return (
    <div class="flex items-center mt-36 h-screen flex-col gap-4 p-4 overflow-auto">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        My Task Tracker
      </h1>

      <form class="flex justify-around w-full max-w-xl" onSubmit={addTask}>
        <input
          id="taskInput"
          type="text"
          class="p-1 w-80 border border-gray-500 rounded flex-grow"
          placeholder="Add task here ..."
          required
        />
        <button
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4  border border-blue-500 hover:border-transparent rounded"
          type="submit"
        >
          Add Task
        </button>
      </form>
      {error.message && <div class="text-red-500 mt-2">{error.message}</div>}

      <h4 class="mt-4 text-3xl font-semibold leading-none tracking-tight text-gray-900">
        Tasks
      </h4>

      <div class="w-full max-w-xl overflow-auto">
        <For each={taskList}>
          {(task) => (
            <div class="flex justify-between border border-gray-200 py-1 px-4 rounded mb-2">
              <input
                type="checkbox"
                checked={task.completed}
                role="button"
                class="w-4"
                onClick={() => toggleStatus(task.id)}
              />
              <div
                class={`p-2 mx-2 flex-grow ${task.completed && "line-through"}`}
              >
                {task.text}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                class="bg-transparent hover:bg-red-500 text-red-700 font-bold hover:text-white px-3 rounded"
              >
                X
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default App;
