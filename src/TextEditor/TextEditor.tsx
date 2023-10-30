// Мы подключили базовый компонент Editor из пакета Draft.js.
// Именно он создаст редактируемое поле и будет управлять содержимым.
// Связываем его c ранее созданным API редактора.

import * as React from 'react';
import { Editor } from 'draft-js';
import { useEditorApi } from './context';
import cn from 'classnames';
import './TextEditor.scss';

import { BLOCK_RENDER_MAP, CUSTOM_STYLE_MAP } from './config';

export type TextEditorProps = {
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ className }) => {
  const { state, onChange, handleKeyCommand, handlerKeyBinding } = useEditorApi();

  return (
    <div className={cn("text-editor", className)}>
      <Editor
        placeholder="Введите ваш текст"
        editorState={state}
        onChange={onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_STYLE_MAP}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={handlerKeyBinding}
      />
    </div>
  );
}

export default TextEditor;