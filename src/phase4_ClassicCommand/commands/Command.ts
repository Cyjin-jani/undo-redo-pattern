// 모든 커맨드 객체의 설계도
export interface Command {
  execute(): void;
  undo(): void;
}
