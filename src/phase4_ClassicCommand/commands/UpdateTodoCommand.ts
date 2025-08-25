import React from 'react';
import type { Todo } from '../../common/types';
import type { Command } from './Command';

export class UpdateTodoCommand implements Command {
  private todoId: string;
  private newText: string;
  private oldText: string;
  private setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  constructor(
    todoId: string,
    newText: string,
    oldText: string,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) {
    this.todoId = todoId;
    this.newText = newText;
    this.oldText = oldText;
    this.setTodos = setTodos;
  }

  execute(): void {
    this.setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === this.todoId
        ? { ...todo, text: this.newText }
        : todo
    ));
  }

  undo(): void {
    this.setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === this.todoId
        ? { ...todo, text: this.oldText }
        : todo
    ));
  }
}
