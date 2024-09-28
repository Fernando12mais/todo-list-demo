import { z } from "zod";

export const newTodoSchema = z.object({
  id: z.string().optional(),
  text: z.string(),
  editing: z.boolean().default(false),
  done: z.boolean().default(false),
});

const todoErrorMessage = "Uma tarefa deve ter no mínimo 4 caracteres";

const todoSchema = newTodoSchema.merge(
  z.object({
    text: z.string().min(4, todoErrorMessage),
  })
);

export const appSchema = z
  .object({
    todos: z.array(todoSchema).default([]),
    newTodo: newTodoSchema,
  })
  .refine(
    (arg) => {
      if (arg.newTodo.text.length > 0 && arg.newTodo.text.length < 4) {
        return false;
      }

      return true;
    },
    {
      message: todoErrorMessage,
      path: ["newTodo.text"],
    }
  );
