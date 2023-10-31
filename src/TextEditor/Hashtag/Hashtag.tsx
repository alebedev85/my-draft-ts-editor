// компонент Hashtag

import { ContentState } from 'draft-js';
import * as React from 'react';
import { useEditorApi } from '../context';

type HashtagProps = {
  children: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
}

/**
 * Функция, создающая копонент Hashtag
 * @param объект типа HashtagkProps
 * @returns разметка с сылкой
 */
const Hashtag = ({ contentState, entityKey, children }: HashtagProps) => {
  // const text = contentState.getData();

  const handlerClick = () => {
    console.log(entityKey)
  }

  // /* Получаем url с помощью уникального ключа Entity */
  // const { url } = contentState.getEntity(entityKey).getData();

  // /**
  //  * Обрабатываем клик в компоненте
  //  */
  // const handlerClick = () => {
  //   const newUrl = prompt('URL:', url);
  //   if (newUrl) {
  //     setEntityData(entityKey, { url: newUrl });
  //   }
  // }

  return (
    <span className='hashtag' onClick={handlerClick}>
      {children}
    </span>
  );
}

export default Hashtag;