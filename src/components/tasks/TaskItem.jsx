import checkIcon from "@/assets/icon-check.svg";
/**
 * Displays a single task as a list item.
 *
 * @param {{ task: { id: number, title: string, is_complete: boolean } }} props
 * @param {(id: number, isComplete: boolean) => void} props.onToggleComplete
 * @param {(id: number) => void} props.onDelete
 */
function TaskItem({ task, onToggleComplete, onDelete }) {
  const isCompleted = task.is_complete;

  return (
    <li className="group flex items-center gap-4 px-4 py-4">
      {/* Checkbox */}
      <button
        onClick={() => onToggleComplete(task.id, !isCompleted)}
        className={`w-5 h-5 rounded-full border flex items-center justify-center
  ${isCompleted ? "bg-[#5ad1ff] border-transparent" : "border-border"}
`}
        aria-label="Toggle task completion"
      >
        {isCompleted && (
          <img src={checkIcon} alt="" className="w-3 h-3" />
        )}
      </button>



      {/* Task text */}
      <p
        className={`flex-1 text-sm
          ${isCompleted
            ? "line-through text-muted-foreground"
            : "text-foreground"
          }`}
      >
        {task.title}
      </p>

      {/* Delete button */}
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
        aria-label="Delete task"
      >
        ✕
      </button>
    </li >
  );
}

export default TaskItem;

