// Создадим React Context, с помощью которого будем прокидывать API редактора

import * as React from 'react';
import { EditorApi, useEditor } from './useEditor';

/**
 * Добовляем EditorApi в контекст
 */
const TextEditorContext = React.createContext<EditorApi | undefined>(undefined);

/**
 * Получение содержания контекста
 * @returns контекст
 */
export const useEditorApi = () => {
  const context = React.useContext(TextEditorContext);
  if (context === undefined) {
    throw new Error('useEditorApi must be used within TextEditorProvider');
  }

  return context;
}

/**
 * Провайдер контекста
 * @returns
 */
export const TextEditorProvider = ({ children }: { children: React.ReactNode }) => {
  const editorApi = useEditor();
  return (
    <TextEditorContext.Provider value={editorApi}>
      {children}
    </TextEditorContext.Provider>
  )
}