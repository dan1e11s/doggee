import { AcceptLocales, DEFAULT_LOCALE } from './getLocale';

export const getMessages = async (locale: AcceptLocales) => {
  try {
    const messages = await import(`@static/locales/${locale}.json`);
    return messages;
  } catch (e) {
    const defaultMessages = import(`@static/locales/${DEFAULT_LOCALE}.json`);
    return defaultMessages;
  }
};
