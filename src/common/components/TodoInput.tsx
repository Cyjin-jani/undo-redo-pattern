import { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-grow">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="What do you need to do?"
          className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-[16px]"
        />
      </div>
      <button
        onClick={handleAdd}
        disabled={!text.trim()}
        className="px-6 py-3 font-medium text-white bg-teal-500 rounded-lg transition-all duration-200 hover:bg-teal-600 active:bg-teal-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ADD
      </button>
    </div>
  );
}
