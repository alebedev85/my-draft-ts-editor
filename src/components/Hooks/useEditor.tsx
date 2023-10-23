// Данный файл будет содержать React-hook, в котором мы будем описывать всю логику нашего редактора

import { EditorState } from 'draft-js';
import * as React from 'react';

/**
 * Стейт и функция изменения стейта для draft-js
 */
export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
}

/**
 * Хук для кеширования стейта draft-js
 * @returns захешированный стейт
 */
export const useEditor = (): EditorApi => {
  const [state, setState] = React.useState(() => EditorState.createEmpty());

  return React.useMemo(() => ({
    state,
    onChange: setState
  }), [state])
}
