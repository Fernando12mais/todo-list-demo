import { useState } from "react";

import styles from "./App.module.css";
import Button from "./components/button";

import Input from "./components/input";
import Card from "./components/card";
import Todo from "./components/todo";

import { useForm, useFieldArray } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { appSchema } from "./validation";
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    resetField,
    reset,
    watch,
  } = useForm({ resolver: zodResolver(appSchema) });

  const {
    fields: todos,
    prepend,
    remove,
    update,
  } = useFieldArray({ name: "todos", control });

  const onCreateTodo = handleSubmit((data) => {
    if (!data.newTodo.text.length) return;
    prepend(data.newTodo);
    reset();
  });

  const onDeleteTodo = (index) => remove(index);

  const onEditTodo = (index, updatedTodo) => {
    console.log(updatedTodo, index);
    update(index, updatedTodo);
  };

  const toggleEditMode = (index) => {
    update(index, { ...todos[index], editing: !todos[index].editing });
  };

  const onDoneChange = (index) => {
    update(index, { ...todos[index], done: !todos[index].done });
  };

  const newTodo = watch("newTodo");

  console.log(newTodo);

  return (
    <main className={styles.app}>
      <Card>
        <h1>Lista de tarefas</h1>
        <form onSubmit={onCreateTodo} className={styles.container}>
          <Input
            {...register("newTodo.text")}
            error={errors.newTodo?.text?.message}
          />
          <Button disabled={!newTodo?.text}>Criar tarefa</Button>
        </form>

        <ul className={styles.list}>
          {!todos.length && <h4>Crie novas tarefas no botão acima ;)</h4>}
          {todos.map((todo, index) => (
            <Todo
              {...{
                ...todo,
                onDeleteTodo,
                onEditTodo,
                toggleEditMode,
                index,
                register,
                handleSubmit,
                onDoneChange,
                errors,
              }}
              key={todo.id}
              error={errors.todos?.[index]?.message}
            />
          ))}
        </ul>
      </Card>
    </main>
  );
}

export default App;
