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
          <ToolPanel />
          <TextEditor />
      </main>
    </TextEditorProvider>
  );
}

export default App;
