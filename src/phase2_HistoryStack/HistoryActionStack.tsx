import { useState } from 'react';
import type { Todo } from '../common/types';
import { TodoManager } from '../common/components/TodoManager';
import { useTodoHistory, type Action } from './hooks/useTodoHistory';

export default function HistoryActionStack() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { recordAction, undo, redo, canUndo, canRedo, stackInfo } = useTodoHistory({
    onStateChange: setTodos,
  });

  const execute = (action: Action, newTodos: Todo[]) => {
    recordAction(action);
    setTodos(newTodos);
  };

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    // ❗️"추가했다"는 행위(action)를 객체로 정의
    const action: Action = { type: 'ADD', payload: newTodo };
    execute(action, [...todos, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (!todoToDelete) return;

    const action: Action = { type: 'DELETE', payload: todoToDelete };
    execute(action, todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;

    const action: Action = { 
      type: 'TOGGLE', 
      payload: { id, oldCompleted: todo.completed, newCompleted: !todo.completed } 
    };
    execute(action, todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleUpdateTodo = (id: string, text: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo || todo.text === text) return;

    const action: Action = { 
      type: 'UPDATE', 
      payload: { id, oldText: todo.text, newText: text } 
    };
    execute(action, todos.map(t =>
      t.id === id ? { ...t, text } : t
    ));
  };

  const handleUndo = () => {
    undo(todos);
  };

  const handleRedo = () => {
    redo(todos);
  };

  return (
    <TodoManager
      todos={todos}
      onAddTodo={handleAddTodo}
      onDeleteTodo={handleDeleteTodo}
      onToggleTodo={handleToggleTodo}
      onUpdateTodo={handleUpdateTodo}
      onUndo={handleUndo}
      onRedo={handleRedo}
      canUndo={canUndo}
      canRedo={canRedo}
      statusInfo={`Stack: ${stackInfo.undoLength} undo • ${stackInfo.redoLength} redo`}
    />
  );
}
