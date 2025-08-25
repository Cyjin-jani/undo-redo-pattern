import { useState } from 'react';
import type { Todo } from '../common/types';
import { TodoManager } from '../common/components/TodoManager';
import { useStateSnapshot } from './hooks/useStateSnapshot';

export default function StateSnapshot() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const {
    saveSnapshot,
    undo,
    redo,
    canUndo,
    canRedo,
    historyInfo,
  } = useStateSnapshot({
    initialState: todos,
    onStateChange: setTodos,
  });

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    saveSnapshot(newTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    saveSnapshot(newTodos);
  };

  const handleToggleTodo = (id: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveSnapshot(newTodos);
  };

  const handleUpdateTodo = (id: string, text: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    );
    saveSnapshot(newTodos);
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
      statusInfo={`Snapshot: ${historyInfo.current} / ${historyInfo.total}`}
    />
  );
}
