import {
  EditorState,
  RichUtils,
  CompositeDecorator,
  DraftEntityMutability,
  DraftHandleValue,
  KeyBindingUtil,
  getDefaultKeyBinding
} from 'draft-js';
import * as React from 'react';
import { BlockType, InlineStyle, EntityType, KeyCommand } from "./config";
import LinkDecorator from './Link';
import HashtagDecorator from './Hashtag';
import { HTMLtoState, stateToHTML } from "./convert";

/* Объединям декораторы в один */
const decorator = new CompositeDecorator([LinkDecorator, HashtagDecorator]);

export type EditorApi = {
  state: EditorState;
  onChange: (state: EditorState) => void;
  toggleBlockType: (blockType: BlockType) => void;
  currentBlockType: BlockType;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
  addLink: (url: string) => void;
  setEntityData: (entityKey: string, data: Record<string, string>) => void;
  handleKeyCommand: (
    command: KeyCommand,
    editorState: EditorState
  ) => DraftHandleValue;
  handlerKeyBinding: (e: React.KeyboardEvent) => KeyCommand | null;
  toHtml: () => string;
}

/**
 * Хук useEditor, со всей логикой редактора
 * @param html
 * @returns объект с состояниями редактора
 */
export const useEditor = (html?: string): EditorApi => {

  /**
   * Переменная со значением текущего типа блока, с помощью которой можно будет добавить элементу активное состояние
   */
  const [state, setState] = React.useState(() =>
    html
      ? EditorState.createWithContent(HTMLtoState(html), decorator)
      : EditorState.createEmpty(decorator)
  );

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

  /**
   * Общая функцию для добавления Entity
   */
  const addEntity = React.useCallback((entityType: EntityType, data: Record<string, string>, mutability: DraftEntityMutability) => {
    setState((currentState) => {
      /* Получаем текущий контент */
      const contentState = currentState.getCurrentContent();
      /* Создаем Entity с данными */
      const contentStateWithEntity = contentState.createEntity(entityType, mutability, data);
      /* Получаем уникальный ключ Entity */
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      /* Обьединяем текущее состояние с новым */
      const newState = EditorState.set(currentState, { currentContent: contentStateWithEntity });
      /* Вставляем ссылку в указанное место */
      return RichUtils.toggleLink(newState, newState.getSelection(), entityKey);
    })
  }, []);

  /**
  * Отдельная функция для добавления ссылки
  */
  const addLink = React.useCallback((url: string) => {
    addEntity(EntityType.link, { url }, "MUTABLE");
  },
    [addEntity]
  );

  /**
   * Перезаписываем данные Entity
   */
  const setEntityData = React.useCallback((entityKey: string, data: { [key: string]: any }) => {
    setState((currentState) => {
      /* Получаем текущий контент */
      const content = currentState.getCurrentContent();
      /* Объединяем текущие данные Entity с новыми */
      const contentStateUpdated = content.mergeEntityData(
        entityKey,
        data,
      )
      /* Обновляем состояние редактора с указанием типа изменения */
      return EditorState.push(currentState, contentStateUpdated, 'apply-entity');
    })
  }, []);

  /**
   * Функция обработки команд сочетания клавиш
   * Функция принимает на вход название команды и текущее состояние редактора,
   * и должна вернуть одно из двух значений handled и not-handled
   */
  const handleKeyCommand = React.useCallback((command: KeyCommand, editorState: EditorState) => {
    if (command === "accent") {
      toggleInlineStyle(InlineStyle.ACCENT);
      return "handled";
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setState(newState);
      return "handled";
    }
    return "not-handled";
  },
    [toggleInlineStyle]
  );

  /**
   * Проверяем нажата ли клавиша q + ctrl/cmd для нашего стиля
   * */
  const handlerKeyBinding = React.useCallback((e: React.KeyboardEvent) => {
    if (e.keyCode === 81 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'accent';
    }

    return getDefaultKeyBinding(e);
  }, []);

  /**
   * Функция для ковертации стейта в html
   */
  const toHtml = React.useCallback(() => {
    return stateToHTML(state.getCurrentContent());
  }, [state]);

  return React.useMemo(
    () => ({
      state,
      onChange: setState,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      addLink,
      setEntityData,
      handleKeyCommand,
      handlerKeyBinding,
      toHtml
    }),
    [
      state,
      toggleBlockType,
      currentBlockType,
      toggleInlineStyle,
      hasInlineStyle,
      addLink,
      setEntityData,
      handleKeyCommand,
      handlerKeyBinding,
      toHtml
    ]
  );
}