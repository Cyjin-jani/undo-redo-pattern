interface HeaderProps {
  version: string;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export function Header({ version, onUndo, onRedo, canUndo, canRedo }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 text-white bg-gray-800">
      <h1 className="text-2xl font-bold">Todo App - {version}</h1>
      <div className="flex gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="px-4 py-2 bg-blue-500 rounded disabled:bg-gray-500"
        >
          Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="px-4 py-2 bg-green-500 rounded disabled:bg-gray-500"
        >
          Redo
        </button>
      </div>
    </header>
  );
}

