import { useState } from 'react';
import type { Todo } from '../common/types';
import { TodoManager } from '../common/components/TodoManager';
import { useTodoHistory } from './hooks/useTodoHistory';
import { AddTodoCommand } from './commands/AddTodoCommand';
import { DeleteTodoCommand } from './commands/DeleteTodoCommand';
import { ToggleTodoCommand } from './commands/ToggleTodoCommand';
import { UpdateTodoCommand } from './commands/UpdateTodoCommand';

export default function ClassicCommand() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { execute, undo, redo, canUndo, canRedo, stackInfo } = useTodoHistory();

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    
    const command = new AddTodoCommand(newTodo, setTodos);
    execute(command);
  };

  const handleDeleteTodo = (id: string) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const todoToDelete = todos[todoIndex];
    
    if (todoToDelete) {
      const command = new DeleteTodoCommand(todoToDelete, todoIndex, setTodos);
      execute(command);
    }
  };

  const handleToggleTodo = (id: string) => {
    const command = new ToggleTodoCommand(id, setTodos);
    execute(command);
  };

  const handleUpdateTodo = (id: string, text: string) => {
    const currentTodo = todos.find(todo => todo.id === id);
    if (!currentTodo || currentTodo.text === text) return;

    const command = new UpdateTodoCommand(id, text, currentTodo.text, setTodos);
    execute(command);
  };

  
  return (
    <TodoManager
      todos={todos}
      onAddTodo={handleAddTodo}
      onDeleteTodo={handleDeleteTodo}
      onToggleTodo={handleToggleTodo}
      onUpdateTodo={handleUpdateTodo}
      onUndo={undo}
      onRedo={redo}
      canUndo={canUndo}
      canRedo={canRedo}
      statusInfo={`History: ${stackInfo.undoLength} undo • ${stackInfo.redoLength} redo`}
    />
  );
}
