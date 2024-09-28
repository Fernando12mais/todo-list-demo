import styles from "./todo.module.css";
import Input from "../input";
import Button from "../button";
import classNames from "classnames";

export default function Todo({
  id,
  text,
  editing,
  onEditTodo,
  onDeleteTodo,
  toggleEditMode,
  index,
  register,
  handleSubmit,
  onDoneChange,
  errors,
  done,
}) {
  const onEdit = handleSubmit((data) =>
    onEditTodo(index, { ...data.todos[index], editing: false })
  );

  return (
    <li className={styles.todo} title={text}>
      <form
        className={classNames(styles.form, { [styles.done]: done })}
        onSubmit={onEdit}
      >
        <Input
          autoFocus
          onClick={() => !editing && toggleEditMode(index)}
          {...register(`todos[${index}].text`)}
          defaultValue={text}
          readOnly={!editing}
          error={errors.todos?.[index]?.text?.message}
        />
        {editing && <Button>Salvar</Button>}
      </form>
      {!editing && (
        <>
          <Button variant="success" onClick={() => onDoneChange(index)}>
            Pronto
          </Button>
          <Button onClick={() => toggleEditMode(index)}>Editar</Button>
          <Button onClick={() => onDeleteTodo(index)} variant={"delete"}>
            Deletar
          </Button>
        </>
      )}
    </li>
  );
}
