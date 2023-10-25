// Kомпонент окна редактора ToolPanel:
import * as React from "react";
import { useEditorApi } from "../TextEditor";
import cn from "classnames";
import { BlockType, InlineStyle } from "../TextEditor/config";
import "./ToolPanel.scss";

const INLINE_STYLES_CODES = Object.values(InlineStyle);

const ToolPanel = () => {

  const {
    toggleInlineStyle,
    hasInlineStyle,
    addLink,
    currentBlockType,
    toggleBlockType
  } = useEditorApi();

  /**
   * Получаем адрес ссылки
   */
  const handlerAddLink = () => {
    const url = prompt('URL:');
    if (url) {
      addLink(url);
    }
  }

  return (
    <div className="tool-panel">
      <button
        className={cn(
          "tool-panel__item",
          currentBlockType === BlockType.default && "tool-panel__item_active"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.default);
        }}
      >
        Стандартный
      </button>
      
      <button
        className={cn(
          "tool-panel__item",
          currentBlockType === BlockType.h1 && "tool-panel__item_active"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.h1);
        }}
      >
        Заголовок
      </button>

      <button
        className={cn(
          "tool-panel__item",
          currentBlockType === BlockType.h2 && "tool-panel__item_active"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.h2);
        }}
      >
        Подзаголовок
      </button>
      <button
        className={cn(
          "tool-panel__item",
          currentBlockType === BlockType.cite && "tool-panel__item_active"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlockType(BlockType.cite);
        }}
      >
        Сноска
      </button>

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
      <button
        className="tool-panel__item"
        onClick={handlerAddLink}>
        LINK
      </button>
    </div>
  );
}

export default ToolPanel;