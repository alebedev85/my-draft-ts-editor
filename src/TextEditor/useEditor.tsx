import {
  EditorState,
  RichUtils
} from 'draft-js';
import * as React from 'react';
import { BlockType } from "./config";

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: BlockType;
}

export const useEditor = (html?: string): EditorApi => {

  /**
   * Переменная со значением текущего типа блока, с помощью которой можно будет добавить элементу активное состояние
   */
  const [state, setState] = React.useState(() => EditorState.createEmpty());

  /**
   * Реализация currentBlockType
   */
  const currentBlockType = React.useMemo(() => {
    /* Шаг 1 где находится каретка пользователя*/
    const selection = state.getSelection();
    /* Шаг 2 получаем карту контента нашего редактора*/
    const content = state.getCurrentContent();
    /* Шаг 3 по ключу находим блок, в котором сейчас находимся. Ключ — это просто уникальный хеш, который сгенерировал Draft.js*/
    const block = content.getBlockForKey(selection.getStartKey());
    /* Шаг 4 получаем тип найденного блока.*/
    return block.getType() as BlockType;
  }, [state]);

  /**
   * Функция переключения типа блока.
   * Для реализации toggleBlockType воспользуемся методом RichUtils.toggleBlockType,
   * чтобы применить определенный тип блока к текущему состоянию редактора
   */
  const toggleBlockType = React.useCallback((blockType: BlockType) => {
    setState((currentState) => RichUtils.toggleBlockType(currentState, blockType))
  }, []);

  return React.useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
    }),
    [
      state,
      toggleBlockType,
      currentBlockType,
    ]
  );
}