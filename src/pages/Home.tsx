import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let lastId: number;
    tasks.forEach((task) => (lastId = task.id + 1));
    setTasks((oldState) => [
      ...oldState,
      {
        id: lastId ? lastId : 0,
        title: newTaskTitle,
        done: false,
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const tasksList = [...tasks];
    tasksList[id].done = !tasksList[id].done;

    setTasks([...tasksList]);
  }

  function handleRemoveTask(id: number) {
    const tasksList = tasks.filter((task) => task.id !== id);

    setTasks([...tasksList]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
