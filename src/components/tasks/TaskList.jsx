import { useState, useMemo } from "react";
import TaskItem from "./TaskItem.jsx";
import { useTasks } from "../../hooks/useTasks.js";
import TaskForm from "./TaskForm.jsx";


/**
 * TaskList (Day 4):
 *  - Uses the custom useTasks hook for all Supabase interactions.
 *  - Manages filter state (All / Active / Completed).
 *  - Delegates add / toggle / delete actions to the hook.
 *  - Displays loading, error and summary information.
 */
export default function TaskList() {
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  const {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted
  } = useTasks();

  /**
   * Adds a new task by inserting it into Supabase and updating local state.
   *
   * @param {string} title - Title of the new task.
   */
  const handleAddTask = async (title) => {
    addTask(title);
  };

  /**
   * Toggles the is_complete flag of a task both in Supabase and local state.
   *
   * @param {number} id - Task ID.
   * @param {boolean} isComplete - Desired completion state.
   */
  const handleToggleComplete = async (id, isComplete) => {
    toggleTask(id, isComplete);
  };

  /**
   * Deletes a task by id from Supabase and local state.
   *
   * @param {number} id - Task ID.
   */
  const handleDeleteTask = async (id) => {
    deleteTask(id);
  };

  // Derived summary information based on current tasks.
  // useMemo is for values
  // useCallback is for functions
  const totalTasks = useMemo(() => tasks.length, [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.is_complete).length, [tasks]);

  // Derived filtered list based on current filter state.
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    if (filter === "active") return !task.is_complete;
    if (filter === "completed") return task.is_complete;
    return true;
  }), [tasks, filter]);

  return (
    <>
      <section className="bg-card text-card-foreground rounded-md shadow-lg mb-6">
        {/* TODO */}
        <div className="border-b border-border">
          <TaskForm onAddTask={handleAddTask} />
        </div>
      </section>

      {/* Content */}
      <section className="bg-card text-card-foreground rounded-md shadow-lg overflow-hidden">
        {error && (
          <p className="p-4 text-sm text-destructive">
            {error}
          </p>
        )}

        {!loading && !error && tasks.length === 0 && (
          <p className="p-4 text-sm text-muted-foreground">
            No tasks yet.
          </p>
        )}

        {loading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Loading...
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        )}

        {totalTasks > 0 && (
          <div className="grid grid-cols-3 items-center px-4 py-3 text-sm text-muted-foreground">
            {/* Left */}
            <span className="justify-self-start">
              {totalTasks - completedTasks} items left
            </span>

            {/* Center */}
            <div className="flex justify-center gap-4 font-semibold">
              <button
                onClick={() => setFilter("all")}
                className={filter === "all" ? "text-primary" : ""}
              >
                All
              </button>
              <button
                onClick={() => setFilter("active")}
                className={filter === "active" ? "text-primary" : ""}
              >
                Active
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "text-primary" : ""}
              >
                Completed
              </button>
            </div>

            {/* Right */}
            <button
              onClick={clearCompleted}
              disabled={completedTasks === 0}
              className={`justify-self-end transition
        ${completedTasks === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:text-foreground"
                }
      `}
            >
              Clear Completed
            </button>
          </div>
        )}
    </section >
    </>
  );
}