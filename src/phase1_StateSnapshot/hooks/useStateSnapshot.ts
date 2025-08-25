import { useState, useCallback } from 'react';
import type { Todo } from '../../common/types';

interface StateSnapshotHistory {
  snapshots: Todo[][];
  currentIndex: number;
}

interface UseStateSnapshotOptions {
  initialState: Todo[];
  onStateChange: (newState: Todo[]) => void;
}

export function useStateSnapshot({ initialState, onStateChange }: UseStateSnapshotOptions) {
  const [history, setHistory] = useState<StateSnapshotHistory>({
    snapshots: [initialState],
    currentIndex: 0,
  });

  const saveSnapshot = useCallback((newTodos: Todo[]) => {
    setHistory(prevHistory => {
      const newSnapshots = prevHistory.snapshots.slice(0, prevHistory.currentIndex + 1);
      newSnapshots.push([...newTodos]);
      
      return {
        snapshots: newSnapshots,
        currentIndex: newSnapshots.length - 1,
      };
    });
    onStateChange(newTodos);
  }, [onStateChange]);

  const undo = useCallback(() => {
    if (history.currentIndex > 0) {
      const newIndex = history.currentIndex - 1;
      const previousSnapshot = [...history.snapshots[newIndex]];
      
      setHistory(prev => ({
        ...prev,
        currentIndex: newIndex,
      }));
      onStateChange(previousSnapshot);
    }
  }, [history.currentIndex, history.snapshots, onStateChange]);

  const redo = useCallback(() => {
    if (history.currentIndex < history.snapshots.length - 1) {
      const newIndex = history.currentIndex + 1;
      const nextSnapshot = [...history.snapshots[newIndex]];
      
      setHistory(prev => ({
        ...prev,
        currentIndex: newIndex,
      }));
      onStateChange(nextSnapshot);
    }
  }, [history.currentIndex, history.snapshots, onStateChange]);

  const canUndo = history.currentIndex > 0;
  const canRedo = history.currentIndex < history.snapshots.length - 1;

  return {
    saveSnapshot,
    undo,
    redo,
    canUndo,
    canRedo,
    historyInfo: {
      current: history.currentIndex + 1,
      total: history.snapshots.length,
    },
  };
}
