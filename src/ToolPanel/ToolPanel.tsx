// Kомпонент окна редактора ToolPanel:
import * as React from "react";
// import { useEditorApi } from "../TextEditor";
import cn from "classnames";
import { BlockType } from "../TextEditor/config";
import "./ToolPanel.scss";

const ToolPanel: React.FC = () => {
  return (
    <div className={cn('tool-panel')}>
      {/* Здесь будет код для элементов управления */}
    </div>
  );
}

export default ToolPanel;