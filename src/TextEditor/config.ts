// Фаил конфигурации с типами блоков и стилями текста
import Immutable from 'immutable';
import { DefaultDraftBlockRenderMap, DraftEditorCommand } from 'draft-js';

/**
 * Enum с названиями типов блоков, а также новый блок сноски cite.
 */
export enum BlockType {
  /* Заголовки */
  h1 = 'header-one',
  h2 = 'header-two',
  h3 = 'header-three',
  h4 = 'header-four',
  h5 = 'header-five',
  h6 = 'header-six',
  /* Цитата */
  blockquote = 'blockquote',
  /* Блок с кодом */
  code = 'code-block',
  /* Список */
  list = 'unordered-list-item',
  /* Нумерованный список */
  orderList = 'ordered-list-item',
  /* Сноска (новый блок)*/
  cite = 'cite',
  /* Простой текст */
  default = 'unstyled',
}

/**
 * Enum с названиями типов стилей, а также новый стиль ACCENT (Будет менять цвет фона и цвет шрифта текста).
 */
export enum InlineStyle {
  BOLD = 'BOLD',
  ITALIC = 'ITALIC',
  UNDERLINE = 'UNDERLINE',
  ACCENT = 'ACCENT' // код нашего произвольного стиля
}

/**
 * Enum с перечислением типов Entity.
 */
export enum EntityType {
  link = 'link',
}

/**
 * Cоздаем имутабельную (неизменяемую) карту блоков
 * */
const CUSTOM_BLOCK_RENDER_MAP = Immutable.Map({
  [BlockType.cite]: {
    element: 'cite',
  },
});

// Для того, чтобы не описывать стандартные блоки, объединим карту блоков по умолчанию с нашей при помощи метода  DefaultDraftBlockRenderMap.merge
export const BLOCK_RENDER_MAP = DefaultDraftBlockRenderMap.merge(CUSTOM_BLOCK_RENDER_MAP);

/**
 * Cоздаем имутабельную (неизменяемую) карту нового стиля
 * */
export const CUSTOM_STYLE_MAP = {
  [InlineStyle.ACCENT]: {
    backgroundColor: 'gray',
    color: 'white',
  },
};

export type KeyCommand = DraftEditorCommand | 'accent'; // произвольная команда