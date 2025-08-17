import { useState } from 'react';
import type { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoList({ todos, onAdd, onDelete, onToggle, onUpdate }: TodoListProps) {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAdd = () => {
    if (newTodoText.trim()) {
      onAdd(newTodoText.trim());
      setNewTodoText('');
    }
  };

  return (
    <div className="p-4 space-y-4 w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a new todo"
          className="flex-grow p-2 text-white bg-gray-800 rounded border border-gray-600"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-purple-600 rounded"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

