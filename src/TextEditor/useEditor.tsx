import {
  EditorState,
  RichUtils
} from 'draft-js';
import * as React from 'react';
import { BlockType, InlineStyle } from "./config";

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: BlockType;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
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

  /**
   * Функция включения/выключения inline-cтиля
   */
  const toggleInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle))
  }, []);

  /**
   * Функция, которая укажет, применен ли конкретный стиль для выделенного текста
   */
  const hasInlineStyle = React.useCallback((inlineStyle: InlineStyle) => {
    /* Получаем иммутабельный Set с ключами стилей */
    const currentStyle = state.getCurrentInlineStyle();
    /* Проверяем содержится ли там переданный стиль */
    return currentStyle.has(inlineStyle);
  }, [state]);

  return React.useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
    }),
    [
      state,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
    ]
  );
}