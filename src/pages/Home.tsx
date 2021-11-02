import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TaskEdit, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task = tasks.find(
      (task) => task.title.toLocaleLowerCase() === newTaskTitle.toLowerCase()
    );

    if (task) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

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
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const tasksList = tasks.filter((task) => task.id !== id);
            setTasks([...tasksList]);
          },
        },
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: TaskEdit) {
    const tasksList = [...tasks];
    tasksList[taskId].title = taskNewTitle;

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
        editTask={handleEditTask}
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
