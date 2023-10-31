import Hashtag from "./Hashtag";
import { EntityType } from "../config";
import { ContentBlock, ContentState, DraftDecorator } from "draft-js";


const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
/**
 * Функция поиска ссылки в тексте
 * @param contentBlock Блок в котором производилось последнее изменение
 * @param callback Функция, которая должна быть вызвана с индексами фрагмента текста
 * @param contentState Текущая карта контента
 */
function hashtagStrategy(
  /* Блок в котором производилось последнее изменение */
  contentBlock: ContentBlock,
  /* Функция, которая должна быть вызвана с индексами фрагмента текста */
  callback: (start: number, end: number) => void,
  /* Текущая карта контента */
  contentState: ContentState
): void {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = HASHTAG_REGEX.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

/**
 * Создадим декоратор для привязки ссылок
 * */
const decorator: DraftDecorator = {
  strategy: hashtagStrategy, // функция поиска фрагмента текста на месте которого нужно отобразить компонент
  component: Hashtag, //компонент, который нужно отобразить
};

export default decorator;
