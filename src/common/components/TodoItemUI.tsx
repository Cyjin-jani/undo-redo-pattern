import type { Todo } from '../types';

interface TodoItemUIProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItemUI({ todo, onDelete, onToggle, onUpdate }: TodoItemUIProps) {
  return (
    <li className="group flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-all duration-200">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="sr-only"
        />
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed 
            ? 'bg-orange-400 border-orange-400' 
            : 'border-gray-300 hover:border-orange-400'
        }`}>
          {todo.completed && (
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </label>
      
      <input
        type="text"
        value={todo.text}
        onChange={(e) => onUpdate(todo.id, e.target.value)}
        className={`flex-grow bg-transparent outline-none border-none focus:outline-none text-[16px] ${
          todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
        } transition-all duration-200 placeholder-gray-400`}
      />
      
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-60 hover:opacity-100 w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-600 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}
