import TextEditor, { TextEditorProvider } from "./TextEditor";
import ToolPanel from "./ToolPanel/ToolPanel";


function App() {
  return (
    <TextEditorProvider >
      <ToolPanel />
      <TextEditor />
    </TextEditorProvider>
  );
}

export default App;
