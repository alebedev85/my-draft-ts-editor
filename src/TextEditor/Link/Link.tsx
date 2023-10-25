// компонент Link

import { ContentState } from 'draft-js';
import * as React from 'react';
import { useEditorApi } from '../context';

type LinkProps = {
  children: React.ReactNode;
  contentState: ContentState;
  entityKey: string;
}

/**
 * Функция, создающая копонент Link
 * @param объект типа LinkProps
 * @returns разметка с сылкой
 */
const Link = ({ contentState, entityKey, children } : LinkProps) => {
  const { setEntityData } = useEditorApi();
  /* Получаем url с помощью уникального ключа Entity */
  const { url } = contentState.getEntity(entityKey).getData();

  /**
   * Обрабатываем клик в компоненте
   */
  const handlerClick = () => {
    const newUrl = prompt('URL:', url);
    if (newUrl) {
      setEntityData(entityKey, { url: newUrl });
    }
  }

  return (
    <a href={url} onClick={handlerClick}>
      {children}
    </a>
  );
}

export default Link;