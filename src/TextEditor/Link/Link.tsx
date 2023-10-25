// компонент Link

import { ContentState } from 'draft-js';
import * as React from 'react';

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
  /* Получаем url с помощью уникального ключа Entity */
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a href={url}>
      {children}
    </a>
  );
}

export default Link;