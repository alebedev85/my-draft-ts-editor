// компонент Hashtag

import { ContentState } from 'draft-js';
import * as React from 'react';
import { useEditorApi } from '../context';

type HashtagProps = {
  children: React.ReactNode;
  contentState: ContentState;
  blockKey: string;
  decoratedText: string
}

/**
 * Функция, создающая копонент Hashtag
 * @param объект типа HashtagkProps
 * @returns разметка с сылкой
 */
const Hashtag = ({ contentState, blockKey, children, decoratedText }: HashtagProps) => {

  const handlerClick = () => {
    console.log(decoratedText)
  }

  return (
    <span className='hashtag' onClick={handlerClick}>
      {children}
    </span>
  );
}

export default Hashtag;