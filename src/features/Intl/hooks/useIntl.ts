import { useContext } from 'react';
import { IntlContext } from '../context';

export interface TranslateMessage {
  path: string;
  values?: Record<string, string | number | boolean>;
}

export const useIntl = () => {
  const intl = useContext(IntlContext);

  const translateMessage = (
    path: TranslateMessage['path'],
    values?: TranslateMessage['values']
  ) => {
    if (!intl.messages[path]) return path;
    if (!values) return intl.messages[path];

    let translate = intl.messages[path];
    for (let key in values) {
      if ({}.hasOwnProperty.call(values, key)) {
        translate = translate.replace(`{${key}}`, String(values[key]));
      }
    }

    return translate;
  };

  return { locale: intl.locale, translateMessage };
};
