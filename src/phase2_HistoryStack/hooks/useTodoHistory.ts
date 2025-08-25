import { useRef } from 'react';
import type { Todo } from '../../common/types';

export interface Action {
  type: 'ADD' | 'DELETE' | 'TOGGLE' | 'UPDATE';
  payload: any;
}

interface UseTodoHistoryOptions {
  onStateChange: (newTodos: Todo[]) => void;
}

export function useTodoHistory({ onStateChange }: UseTodoHistoryOptions) {
  const undoStack = useRef<Action[]>([]);
  const redoStack = useRef<Action[]>([]);

  // 액션을 히스토리 스택에 기록하는 함수
  const recordAction = (action: Action) => {
    // '행위'를 undoStack에 기록
    undoStack.current.push(action);
    // 새로운 작업이므로 redoStack은 비움
    redoStack.current = [];
  };

  // ❗️거대한 switch문이 여기에 집중됨. 새로운 기능이 추가될 때마다 case를 계속해서 추가해야 함
  const undo = (currentTodos: Todo[]) => {
    const lastAction = undoStack.current.pop();
    if (!lastAction) return;

    redoStack.current.push(lastAction);

    let newTodos: Todo[];
    switch (lastAction.type) {
      case 'ADD':
        newTodos = currentTodos.filter(t => t.id !== lastAction.payload.id);
        break;

      case 'DELETE':
        newTodos = [...currentTodos, lastAction.payload];
        break;

      case 'TOGGLE':
        newTodos = currentTodos.map(t =>
          t.id === lastAction.payload.id
            ? { ...t, completed: lastAction.payload.oldCompleted }
            : t
        );
        break;

      case 'UPDATE':
        newTodos = currentTodos.map(t =>
          t.id === lastAction.payload.id
            ? { ...t, text: lastAction.payload.oldText }
            : t
        );
        break;

      default:
        newTodos = currentTodos;
    }

    onStateChange(newTodos);
  };

  const redo = (currentTodos: Todo[]) => {
    const actionToRedo = redoStack.current.pop();
    if (!actionToRedo) return;

    undoStack.current.push(actionToRedo);

    let newTodos: Todo[];
    switch (actionToRedo.type) {
      case 'ADD':
        newTodos = [...currentTodos, actionToRedo.payload];
        break;

      case 'DELETE':
        newTodos = currentTodos.filter(t => t.id !== actionToRedo.payload.id);
        break;

      case 'TOGGLE':
        newTodos = currentTodos.map(t =>
          t.id === actionToRedo.payload.id
            ? { ...t, completed: actionToRedo.payload.newCompleted }
            : t
        );
        break;

      case 'UPDATE':
        newTodos = currentTodos.map(t =>
          t.id === actionToRedo.payload.id
            ? { ...t, text: actionToRedo.payload.newText }
            : t
        );
        break;

      default:
        newTodos = currentTodos;
    }

    onStateChange(newTodos);
  };

  const canUndo = undoStack.current.length > 0;
  const canRedo = redoStack.current.length > 0;

  return {
    recordAction,
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
