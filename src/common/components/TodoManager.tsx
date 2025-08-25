import type { Todo } from '../types';
import { TodoInput } from './TodoInput';
import { TodoItemUI } from './TodoItemUI';

interface TodoManagerProps {
  todos: Todo[];
  onAddTodo: (text: string) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onUpdateTodo: (id: string, text: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  statusInfo: string;
}

export function TodoManager({
  todos,
  onAddTodo,
  onDeleteTodo,
  onToggleTodo,
  onUpdateTodo,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  statusInfo,
}: TodoManagerProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="p-8 bg-orange-50 rounded-2xl shadow-lg border border-orange-100 min-h-[422px]">
        <header className="flex justify-center items-center mb-8">
          <div className="flex gap-2 p-1 bg-white rounded-lg border border-gray-200 shadow-sm">
            <button
              onClick={onUndo}
              disabled={!canUndo}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md transition-all duration-200 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Undo
            </button>
            <button
              onClick={onRedo}
              disabled={!canRedo}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md transition-all duration-200 hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              Redo
            </button>
          </div>
        </header>

        <main className="space-y-4">
          <TodoInput onAdd={onAddTodo} />
          
          <div className="space-y-2">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItemUI
                  key={todo.id}
                  todo={todo}
                  onDelete={onDeleteTodo}
                  onToggle={onToggleTodo}
                  onUpdate={onUpdateTodo}
                />
              ))
            ) : (
              <div className="py-12 text-center text-gray-400">
                <div className="mb-4 text-4xl">📝</div>
                <p className="text-lg">No tasks yet</p>
                <p className="mt-1 text-sm">Add one above to get started</p>
              </div>
            )}
          </div>

          {todos.length > 0 && (
            <div className="flex justify-center pt-4 border-t border-orange-200">
              <div className="px-3 py-1 text-xs text-gray-500 rounded-full bg-white/80">
                {statusInfo}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
