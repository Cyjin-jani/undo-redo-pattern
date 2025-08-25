import React from 'react';
import type { Todo } from '../../common/types';
import type { Command } from './Command';

export class DeleteTodoCommand implements Command {
  private todoToDelete: Todo;
  private originalIndex: number;
  private setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  constructor(
    todoToDelete: Todo,
    originalIndex: number,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  ) {
    this.todoToDelete = todoToDelete;
    this.originalIndex = originalIndex;
    this.setTodos = setTodos;
  }

  execute(): void {
    this.setTodos(prevTodos => prevTodos.filter(todo => todo.id !== this.todoToDelete.id));
  }

  undo(): void {
    this.setTodos(prevTodos => {
      const newTodos = [...prevTodos];
      newTodos.splice(this.originalIndex, 0, this.todoToDelete);
      return newTodos;
    });
  }
}
