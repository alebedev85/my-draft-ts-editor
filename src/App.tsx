import TextEditor, { TextEditorProvider } from "./TextEditor";
import ToolPanel from "./ToolPanel/ToolPanel";
import "./App.scss";


function App() {
  return (
    <TextEditorProvider >
      <header className="app-header">
        My Draft Text Editor
      </header>
      <main className="page">
        <div className="editr-wrap">
          <ToolPanel />
          <TextEditor />
        </div>
      </main>
    </TextEditorProvider>
  );
}

export default App;
