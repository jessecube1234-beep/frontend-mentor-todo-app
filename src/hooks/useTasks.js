/**
 * Custom hook for handling all task logic
 * (fetching, adding, updating, deleting tasks)
 */
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function useTasks() {
  // stores all tasks from the database
  const [tasks, setTasks] = useState([]);

  // tracks loading state
  const [loading, setLoading] = useState(true);

  // stores any error messages
  const [error, setError] = useState(null);

  /**
   * Gets all tasks from Supabase
   */
  const loadTasks = useCallback(async () => {
    try {
      setError(null);

      const { data, error: queryError } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (queryError) {
        setError("Error loading tasks: " + queryError.message);
        return;
      }

      setTasks(data ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Adds a new task
   */
  const addTask = useCallback(async (title) => {
    const { data, error: insertError } = await supabase
      .from("tasks")
      .insert([{ title, is_complete: false }])
      .select();

    if (insertError) {
      console.error(insertError);
      throw insertError;
    }

    // add the new task to the list
    const inserted = data?.[0];
    if (inserted) {
      setTasks((prev) => [inserted, ...prev]);
    }
  }, []);

  /**
   * Marks a task as complete or incomplete
   */
  const toggleTask = useCallback(async (id, isComplete) => {
    const { error: updateError } = await supabase
      .from("tasks")
      .update({ is_complete: isComplete })
      .eq("id", id);

    if (updateError) {
      console.error(updateError);
      throw updateError;
    }

    // update task in local state
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, is_complete: isComplete } : task
      )
    );
  }, []);

  /**
   * Deletes a task
   */
  const deleteTask = useCallback(async (id) => {
    const { error: deleteError } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error(deleteError);
      throw deleteError;
    }

    // remove task from state
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  //Clears completed tasks
  const clearCompleted = useCallback(async () => {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("is_complete", true);

    if (error) {
      console.error(error);
      throw error;
    }

    // Update local state
    setTasks((prev) => prev.filter((task) => !task.is_complete));
  }, []);

  // load tasks when the hook runs
  useEffect(() => {
    const fetchTasks = async () => {
      await loadTasks();
    };

    fetchTasks();
  }, [loadTasks]);

  /**
   * Realtime updates (keeps tasks in sync across tabs)
   */
  useEffect(() => {
    const channel = supabase
      .channel("public:tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tasks" },
        (payload) => {
          setTasks((prev) => {
            if (payload.eventType === "INSERT") {
              const newTask = payload.new;
              const exists = prev.some((task) => task.id === newTask.id);
              if (exists) return prev;
              return [newTask, ...prev];
            }

            if (payload.eventType === "UPDATE") {
              const updated = payload.new;
              return prev.map((task) =>
                task.id === updated.id ? updated : task
              );
            }

            if (payload.eventType === "DELETE") {
              const removed = payload.old;
              return prev.filter((task) => task.id !== removed.id);
            }

            return prev;
          });
        }
      )
      .subscribe();

    // cleanup when component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // expose state and functions
  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  };
}

export { useTasks };