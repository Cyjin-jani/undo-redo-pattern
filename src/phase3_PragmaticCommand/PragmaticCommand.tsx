import { useState } from 'react';
import type { Todo } from '../common/types';
import { TodoManager } from '../common/components/TodoManager';
import { useTodoHistory, type Action } from './hooks/useTodoHistory';

// 실행자 (Receiver): 실제 상태를 변경하는 컴포넌트
export default function PragmaticCommand() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { execute, undo, redo, canUndo, canRedo, stackInfo } = useTodoHistory();

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    const action: Action = { type: 'ADD', payload: { id: newTodo.id, todo: newTodo } };
    
    // 관리자에게 액션 기록을 맡김
    execute(action);
    // 실제 상태 변경 실행
    setTodos(prev => [...prev, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (!todoToDelete) return;

    const action: Action = { type: 'DELETE', payload: { id, todo: todoToDelete } };
    execute(action);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;

    const action: Action = { 
      type: 'TOGGLE', 
      payload: { id, oldCompleted: todo.completed, newCompleted: !todo.completed } 
    };
    execute(action);
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleUpdateTodo = (id: string, text: string) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo || todo.text === text) return;

    const action: Action = { 
      type: 'UPDATE', 
      payload: { id, text, oldText: todo.text } 
    };
    execute(action);
    setTodos(prev => prev.map(t =>
      t.id === id ? { ...t, text } : t
    ));
  };

  const handleUndo = () => {
    const actionToUndo = undo();
    if (!actionToUndo) return;

    // ❗️switch 문이 컴포넌트로 이동함. 관리자에게 받은 액션을 해석해서 직접 실행
    switch (actionToUndo.type) {
      case 'ADD':
        setTodos(prev => prev.filter(t => t.id !== actionToUndo.payload.id));
        break;
      case 'DELETE':
        setTodos(prev => [...prev, actionToUndo.payload.todo]);
        break;
      case 'TOGGLE':
        setTodos(prev => prev.map(t =>
          t.id === actionToUndo.payload.id
            ? { ...t, completed: actionToUndo.payload.oldCompleted }
            : t
        ));
        break;
      case 'UPDATE':
        setTodos(prev => prev.map(t =>
          t.id === actionToUndo.payload.id
            ? { ...t, text: actionToUndo.payload.oldText }
            : t
        ));
        break;
    }
  };

  const handleRedo = () => {
    const actionToRedo = redo();
    if (!actionToRedo) return;

    switch (actionToRedo.type) {
      case 'ADD':
        setTodos(prev => [...prev, actionToRedo.payload.todo]);
        break;
      case 'DELETE':
        setTodos(prev => prev.filter(t => t.id !== actionToRedo.payload.id));
        break;
      case 'TOGGLE':
        setTodos(prev => prev.map(t =>
          t.id === actionToRedo.payload.id
            ? { ...t, completed: actionToRedo.payload.newCompleted }
            : t
        ));
        break;
      case 'UPDATE':
        setTodos(prev => prev.map(t =>
          t.id === actionToRedo.payload.id
            ? { ...t, text: actionToRedo.payload.text }
            : t
        ));
        break;
    }
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
      statusInfo={`Commands: ${stackInfo.undoLength} undo • ${stackInfo.redoLength} redo`}
    />
  );
}