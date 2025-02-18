import React from 'react'
import Todo from "./Todo"

const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map((todo, index) => {
        return (
          <React.Fragment key={todo.id || index}>
          <Todo 
            todo={todo} 
            onClickDelete={onClickDelete} 
            onClickComplete={onClickComplete} 
          />
          {index !== todos.length - 1 && <hr />}
        </React.Fragment>
        )
      })}
    </>
  )
}

export default TodoList
