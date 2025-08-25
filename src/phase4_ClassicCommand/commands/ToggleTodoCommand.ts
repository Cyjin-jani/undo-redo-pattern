import React from 'react';
import type { Todo } from '../../common/types';
import type { Command } from './Command';

export class ToggleTodoCommand implements Command {
  private todoId: string;
  private setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  constructor(
    todoId: string,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) {
    this.todoId = todoId;
    this.setTodos = setTodos;
  }

  execute(): void {
    this.setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === this.todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }

  undo(): void {
    this.execute();
  }
}
