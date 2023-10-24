// Kомпонент окна редактора ToolPanel:
import * as React from "react";
import { useEditorApi } from "../TextEditor";
import cn from "classnames";
import { BlockType, InlineStyle } from "../TextEditor/config";
import "./ToolPanel.scss";

const INLINE_STYLES_CODES = Object.values(InlineStyle);

const ToolPanel = () => {

  const { toggleInlineStyle, hasInlineStyle } = useEditorApi();

  return (
    <div className="tool-panel">
      {INLINE_STYLES_CODES.map((code) => {
        const onMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          toggleInlineStyle(code);
        };

        return (
          <button
            key={code}
            className={cn(
              "tool-panel__item",
              hasInlineStyle(code) && "tool-panel__item_active"
            )}
            onMouseDown={onMouseDown}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export default ToolPanel;