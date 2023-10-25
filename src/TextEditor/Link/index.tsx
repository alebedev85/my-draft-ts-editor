import Link from "./Link";
import { EntityType } from "../config";
import { ContentBlock, ContentState, DraftDecorator } from "draft-js";


/**
 * Функция поиска ссылки в тексте
 * @param contentBlock Блок в котором производилось последнее изменение
 * @param callback Функция, которая должна быть вызвана с индексами фрагмента текста
 * @param contentState Текущая карта контента
 */
function findLinkEntities(
  /* Блок в котором производилось последнее изменение */
  contentBlock: ContentBlock,
  /* Функция, которая должна быть вызвана с индексами фрагмента текста */
  callback: (start: number, end: number) => void,
  /* Текущая карта контента */
  contentState: ContentState
): void {
  /* Для каждого символа в блоке выполняем функцию фильтрации */
  contentBlock.findEntityRanges((character) => {
    /* Получаем ключ Entity */
    const entityKey = character.getEntity();
    /* Проверяем что Entity относится к типу Entity-ссылок */
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === EntityType.link
    );
  }, callback);
}

/**
 * Создадим декоратор для привязки ссылок
 * */
const decorator: DraftDecorator = {
  strategy: findLinkEntities, // функция поиска фрагмента текста на месте которого нужно отобразить компонент
  component: Link, //компонент, который нужно отобразить
};

export default decorator;