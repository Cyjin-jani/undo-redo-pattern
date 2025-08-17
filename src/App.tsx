import { useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Placeholder functions
  const handleAddTodo = (text: string) => {
    console.log('Add:', text);
    // Logic will be implemented in each version branch
  };
  const handleDeleteTodo = (id: string) => {
    console.log('Delete:', id);
  };
  const handleToggleTodo = (id: string) => {
    console.log('Toggle:', id);
  };
  const handleUpdateTodo = (id: string, text: string) => {
    console.log('Update:', id, text);
  };
  const handleUndo = () => {
    console.log('Undo');
  };
  const handleRedo = () => {
    console.log('Redo');
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white bg-gray-900">
      <Header
        version="UI-Only"
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={false}
        canRedo={false}
      />
      <main className="flex justify-center p-4 w-full">
        <TodoList
          todos={todos}
          onAdd={handleAddTodo}
          onDelete={handleDeleteTodo}
          onToggle={handleToggleTodo}
          onUpdate={handleUpdateTodo}
        />
      </main>
    </div>
  );
}

export default App;
