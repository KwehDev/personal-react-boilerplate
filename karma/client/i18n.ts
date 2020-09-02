// contains lots of inspiration from https://github.com/UnlyEd/next-right-now/blob/v1-ssr-mst-aptd-gcms-lcz-sty/src/utils/i18nextLocize.ts
import { captureException } from '@sentry/node';
import type { IncomingMessage } from 'http';
import type { i18n as I18nInstance } from 'i18next';
import i18next from 'i18next';
import absoluteUrl from 'next-absolute-url';
import { initReactI18next } from 'react-i18next';

import {
  IS_PROD,
  ENABLED_LANGUAGES,
  IS_BROWSER,
  IS_TEST,
  FALLBACK_LANGUAGE,
} from '../../src/constants';
import type { Namespace } from '../server/i18n/cache';
import type { KarmaProps } from './Karma';

export const i18nCookieName = 'i18next';

type InitI18NextArgs = Pick<KarmaProps, 'language'> &
  (
    | {
        i18nBundle: KarmaProps['i18nBundle'];
      }
    | {
        i18nCache: I18nextResources;
      }
  );

export const initI18Next = ({
  language,
  ...rest
}: InitI18NextArgs): I18nInstance => {
  const instance = i18next.use(initReactI18next);

  const resources =
    'i18nCache' in rest
      ? // tests have access to all localizations
        rest.i18nCache
      : // only the currently detected language will be available during a render
        {
          [language]: rest.i18nBundle,
        };

  instance
    .init({
      cleanCode: true,
      debug: !IS_PROD && !IS_TEST,
      // removes translation default key
      defaultNS: undefined,
      fallbackLng: FALLBACK_LANGUAGE,
      interpolation: {
        // not needed with react
        escapeValue: false,
      },
      lng: language,
      // remove if you want to use localization (en-US, en-GB)
      load: 'languageOnly',
      lowerCaseLng: true,
      react: {
        // not compatible with SSR
        useSuspense: false,
      },
      resources,
      supportedLngs: ENABLED_LANGUAGES,
    })
    // eslint-disable-next-line no-console
    .catch(console.error);

  if (IS_BROWSER) {
    const html = document.querySelector('html');

    if (html) {
      instance.on('languageChanged', (lang) => {
        html.setAttribute('lang', lang);
        html.setAttribute('dir', instance.dir(lang));

        document.cookie = `${i18nCookieName}=${lang}`;
      });

      // set initially aswell
      html.setAttribute('lang', language);
    }
  }

  return instance;
};

/**
 * A generic function factory accepting the language to change to.
 *
 * Loads missing bundles on demand.
 */
export const createLanguageChangeHandler = (
  language: string
): (() => Promise<void>) => {
  return async () => {
    const hasBundle = !!i18next.getDataByLanguage(language);

    if (!hasBundle) {
      const namespaces = i18next.reportNamespaces.getUsedNamespaces() as Namespace[];
      const resources = await getI18n(language, { namespaces });

      Object.entries(resources).forEach(([namespace, bundle]) => {
        i18next.addResourceBundle(language, namespace, bundle);
      });
    }

    await i18next.changeLanguage(language);
  };
};

export declare type I18nextNamespace = {
  [key: string]: string;
};

/**
 * @example
 * {
 *    "login": {
 *        "label": "Log in",
 *        "user": "User Name"
 *    }
 * }
 *
 */
export declare type I18nextResourceLocale = {
  [namespace: string]: I18nextNamespace;
};

/**
 * One or more i18next resources, indexed by lang
 *
 * @example
 * {
 *   en: {
 *     "login": {
 *       "label": "Log in",
 *       "user": "User Name"
 *     }
 *   }
 * }
 */
export declare type I18nextResources = {
  [lang: string]: I18nextResourceLocale;
};

/**
 * Memoized i18next resources are timestamped to allow cache invalidation
 * strategies
 * The timestamp's value is the time when the memoized cache was created
 */
export declare type MemoizedI18nextResources = {
  resources: I18nextResourceLocale;
  ts: number; // Timestamp in milliseconds
};

/**
 * In-memory cache of the i18next resources
 *
 * Useful to avoid over-fetching the API, but rather rely on the memoized cache
 * when available
 *
 */
const _memoizedI18nextResources = new Map<string, MemoizedI18nextResources>();

/**
 * Milliseconds to cache i18n client side for
 */
const memoizedCacheMaxAge = (IS_BROWSER || IS_PROD ? 60 * 60 : 60) * 1000;

export const i18nEndpoint = '/api/v1/i18n/';

interface GetI18nOptions {
  req?: IncomingMessage;
  namespaces?: Namespace[];
}

export const getI18n = async (
  lang: string,
  { req, namespaces }: GetI18nOptions = {}
): Promise<I18nextResourceLocale> => {
  const language = ENABLED_LANGUAGES.includes(lang) ? lang : FALLBACK_LANGUAGE;

  const url = i18nEndpoint + language;

  const memoizedI18nextResources =
    !IS_TEST && _memoizedI18nextResources.get(url);
  const ts = Date.now();

  if (
    memoizedI18nextResources &&
    ts - memoizedI18nextResources.ts < memoizedCacheMaxAge
  ) {
    return memoizedI18nextResources.resources;
  }

  let resources: I18nextResourceLocale = {};

  try {
    const { origin } = absoluteUrl(req);
    const searchParams = computeSearchParams(namespaces);
    const response = await fetch(origin + url + searchParams);

    try {
      resources = await response.json();
    } catch (error) {
      captureException(error);
      // eslint-disable-next-line no-console
      console.error(error.message, 'Failed to parse i18n JSON');
    }
  } catch (error) {
    captureException(error);
    // eslint-disable-next-line no-console
    console.error(error.message, 'Failed to fetch i18n');
  }

  _memoizedI18nextResources.set(url, { resources, ts });

  return resources;
};

/**
 * Creates search params given namespaces
 */
const computeSearchParams = (namespaces?: Namespace[]) => {
  if (!namespaces) {
    return '';
  }

  const params = new URLSearchParams();

  namespaces.forEach((ns) => {
    params.append('namespaces', ns);
  });

  return `?${params.toString()}`;
};
