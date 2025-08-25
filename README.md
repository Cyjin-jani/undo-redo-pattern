# 🔄 Undo/Redo 패턴 진화 - 실습 프로젝트

이 프로젝트는 **React에서 Undo/Redo 기능을 구현하는 다양한 패턴들**의 진화 과정을 보여주는 실습용 데모입니다.

## 📝 관련 기술 블로그

> **[블로그 링크]** - TODO: 블로그 포스팅 링크 추가 예정

이 프로젝트의 상세한 설명과 각 패턴의 장단점 분석은 위 블로그 포스트에서 확인하실 수 있습니다.

## 🎯 프로젝트 목적

- **단계별 진화**: 4가지 Undo/Redo 패턴의 단계적 발전 과정 학습
- **실제 동작**: 각 패턴의 실제 구현과 동작을 직접 체험
- **패턴 비교**: 메모리 사용량, 코드 복잡도, 확장성 등의 차이점 이해
- **베스트 프랙티스**: React와 TypeScript 환경에서의 최적 구현 방법 제시

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 확인이 가능합니다.

## 📁 프로젝트 구조

```
src/
├── common/                   # 공통 컴포넌트 & 타입
│   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   ├── TodoManager.tsx   # 통합 Todo 관리 컴포넌트
│   │   ├── TodoInput.tsx     # Todo 입력 컴포넌트
│   │   └── TodoItemUI.tsx    # Todo 아이템 UI
│   └── types/
│       └── index.ts          # 공통 타입 정의
│
├── phase1_StateSnapshot/     # Phase 1: 상태 스냅샷 패턴
│   ├── StateSnapshot.tsx     # 메인 컴포넌트
│   └── hooks/
│       └── useStateSnapshot.ts # 히스토리 관리 훅
│
├── phase2_HistoryStack/      # Phase 2: 히스토리 스택 패턴
│   ├── HistoryActionStack.tsx # 메인 컴포넌트
│   └── hooks/
│       └── useTodoHistory.ts  # 히스토리 관리 훅
│
├── phase3_PragmaticCommand/  # Phase 3: 데이터 기반 커맨드 패턴
│   ├── PragmaticCommand.tsx  # 메인 컴포넌트
│   └── hooks/
│       └── useTodoHistory.ts
│
├── phase4_ClassicCommand/    # Phase 4: 클래식 커맨드 패턴
│   ├── ClassicCommand.tsx    # 메인 컴포넌트
│   ├── commands/
│   │   ├── Command.ts        # 커맨드 인터페이스
│   │   ├── AddTodoCommand.ts # 추가 커맨드
│   │   ├── DeleteTodoCommand.ts # 삭제 커맨드
│   │   ├── ToggleTodoCommand.ts # 토글 커맨드
│   │   └── UpdateTodoCommand.ts # 수정 커맨드
│   └── hooks/
│       └── useTodoHistory.ts
│
└── App.tsx                   # 모든 패턴을 동시에 볼 수 있는 메인 앱
```

## 🔄 Phase별 패턴 설명

### Phase 1: 상태 스냅샷 패턴
```tsx
// 전체 상태를 통째로 저장하는 방식
const snapshots = [
  [{ id: 1, text: "할일1" }],
  [{ id: 1, text: "할일1" }, { id: 2, text: "할일2" }],
  // ...
];
```

**특징:**
- ✅ 구현이 가장 간단함
- ❌ 메모리 사용량이 많음 (상태 전체를 복사)
- ❌ 대용량 데이터에서 성능 문제

---

### Phase 2: 히스토리 액션 스택 패턴
```tsx
// 행위(Action)만 저장하는 방식
const actions = [
  { type: 'ADD', payload: { id: 1, text: "할일1" } },
  { type: 'DELETE', payload: { id: 1 } },
  // ...
];
```

**특징:**
- ✅ 메모리 효율성 크게 개선
- ✅ 무엇을 했는지 명확히 파악 가능
- ❌ **거대한 switch문 문제** (훅 내부에 모든 로직 집중)

---

### Phase 3: 데이터 기반 커맨드 패턴
```tsx
// 관리자(Invoker)와 실행자(Receiver) 분리
const { execute, undo } = useUndoRedo(); // 관리자
const handleUndo = () => {
  const action = undo();
  switch (action.type) { /* 실행자 */ }
};
```

**특징:**
- ✅ 관심사 분리: 히스토리 관리 vs 액션 실행
- ✅ 훅의 재사용성 향상
- ❌ **switch문이 컴포넌트로 이동** (근본 해결 안됨)

---

### Phase 4: 클래식 커맨드 패턴
```tsx
// 각 액션을 독립적인 객체로 캡슐화
class AddTodoCommand implements Command {
  execute() { /* 실행 로직 */ }
  undo() { /* 취소 로직 */ }
}

const command = new AddTodoCommand(todo, setTodos);
execute(command); // switch문 없이 다형성으로 처리
```

**특징:**
- ✅ **Switch문 완전 제거** (다형성 활용)
- ✅ 완벽한 확장성 (새 기능 추가 시 기존 코드 수정 불필요)
- ✅ 객체지향 설계 원칙 준수
- ✅ 각 기능이 독립적인 부품으로 동작

## 🛠 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **커맨드 패턴** - 디자인 패턴

---

⭐ **이 프로젝트가 도움이 되셨다면 Star를 눌러주세요!**

궁금한 점이나 개선 제안이 있으시면 Issue를 통해 알려주세요. 🚀