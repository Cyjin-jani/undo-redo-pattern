import { useRef } from 'react';
import type { Command } from '../commands/Command';

export function useTodoHistory() {
  const undoStack = useRef<Command[]>([]);
  const redoStack = useRef<Command[]>([]);

  const execute = (command: Command) => {
    command.execute();
    undoStack.current.push(command);
    redoStack.current = [];
  };

  const undo = () => {
    const command = undoStack.current.pop();
    if (command) {
      command.undo();
      redoStack.current.push(command);
    }
  };

  const redo = () => {
    const command = redoStack.current.pop();
    if (command) {
      command.execute();
      undoStack.current.push(command);
    }
  };

  const canUndo = undoStack.current.length > 0;
  const canRedo = redoStack.current.length > 0;

  return {
    execute,
    undo,
    redo,
    canUndo,
    canRedo,
    stackInfo: {
      undoLength: undoStack.current.length,
      redoLength: redoStack.current.length,
    },
  };
}
