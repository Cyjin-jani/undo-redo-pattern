import StateSnapshot from './phase1_StateSnapshot/StateSnapshot';
import HistoryStack from './phase2_HistoryStack/HistoryActionStack';
import PragmaticCommand from './phase3_PragmaticCommand/PragmaticCommand';
import ClassicCommand from './phase4_ClassicCommand/ClassicCommand';

function App() {
    return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto" style={{ maxWidth: '900px' }}>
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            TODO App - Undo/Redo Test
          </h1>
        </header>
        
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              Phase 1: 상태 스냅샷 패턴
            </h2>
          </div>
          <StateSnapshot />
        </section>
        
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              Phase 2: 히스토리 스택 패턴
            </h2>
          </div>
          <HistoryStack />
        </section>
        
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              Phase 3: 데이터 기반 커맨드 패턴
            </h2>
          </div>
          <PragmaticCommand />
        </section>
        
        <section className="mb-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-gray-800">
              Phase 4: 클래식 커맨드 패턴
            </h2>
          </div>
          <ClassicCommand />
        </section>
      </div>
    </div>
  );
}

export default App;
