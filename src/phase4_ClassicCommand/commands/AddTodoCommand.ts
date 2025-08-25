import React from 'react';
import type { Todo } from '../../common/types';
import type { Command } from './Command';

export class AddTodoCommand implements Command {
  private newTodo: Todo;
  private setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  constructor(
    newTodo: Todo,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) {
    this.newTodo = newTodo;
    this.setTodos = setTodos;
  }

  execute(): void {
    this.setTodos(prevTodos => [...prevTodos, this.newTodo]);
  }

  undo(): void {
    this.setTodos(prevTodos => prevTodos.filter(todo => todo.id !== this.newTodo.id));
  }
}
