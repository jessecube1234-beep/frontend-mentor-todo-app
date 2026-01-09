import { useState } from "react";


const NewTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      setError("Task title cannot be empty.");
      return;
    }

    if (trimmed.length > 80) {
      setError("Task title cannot exceed 80 characters.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await onAddTask(trimmed);
      setTitle("");
    } catch {
      setError("Failed to add a task.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 px-4 py-4 min-h-[64px] bg-card rounded-md shadow-lg"
      >
        {/* Fake checkbox (visual only) */}
        <span className="w-5 h-5 rounded-full border border-border flex-shrink-0" />

        <label htmlFor="task-title" className="sr-only">
          Task title
        </label>

        <input
          id="task-title"
          type="text"
          placeholder="Create a new todo…"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={submitting}
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />
      </form>

      {error && (
        <p className="px-4 pb-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </>
  );
};

export default NewTaskForm;