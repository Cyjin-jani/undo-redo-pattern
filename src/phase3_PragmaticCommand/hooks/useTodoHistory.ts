import { useRef } from 'react';

export interface Action {
  type: 'ADD' | 'DELETE' | 'TOGGLE' | 'UPDATE';
  payload: any;
}

// 관리자 (Invoker): 히스토리 관리만 책임지는 커스텀 훅
export function useTodoHistory() {
  const undoStack = useRef<Action[]>([]);
  const redoStack = useRef<Action[]>([]);

  const execute = (action: Action) => {
    undoStack.current.push(action);
    redoStack.current = [];
  };

  const undo = (): Action | null => {
    const lastAction = undoStack.current.pop();
    if (!lastAction) return null;
    redoStack.current.push(lastAction);
    
    // ❗️실제 로직을 실행하지 않고, 되돌릴 액션 정보를 그대로 반환
    return lastAction; 
  };
  
  const redo = (): Action | null => {
    const actionToRedo = redoStack.current.pop();
    if (!actionToRedo) return null;
    undoStack.current.push(actionToRedo);
    
    return actionToRedo;
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