import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id:string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItem({ todo, onDelete, onToggle, onUpdate }: TodoItemProps) {
  return (
    <li className="flex gap-2 items-center p-2 bg-gray-700 rounded">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5"
      />
      <input
        type="text"
        value={todo.text}
        onChange={(e) => onUpdate(todo.id, e.target.value)}
        className={`flex-grow bg-transparent outline-none ${todo.completed ? 'line-through text-gray-400' : ''}`}
      />
      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 text-sm bg-red-500 rounded"
      >
        Delete
      </button>
    </li>
  );
}

