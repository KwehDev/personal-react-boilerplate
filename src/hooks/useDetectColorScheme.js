// via https://github.com/neo4j/neo4j-browser/blob/master/src/browser/hooks/useDetectColorScheme.js
import { useState, useEffect } from 'react';

export const THEME_NAMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

// Define available themes
const colorSchemes = {
  DARK: `(prefers-color-scheme: ${THEME_NAMES.DARK})`,
  LIGHT: `(prefers-color-scheme: ${THEME_NAMES.LIGHT})`,
};

export default function useDetectColorScheme() {
  const [scheme, setScheme] = useState(null);

  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }

    // The listener
    const listener = e => {
      if (!e || !e.matches) {
        return;
      }
      const schemeNames = Object.keys(colorSchemes);
      for (let i = 0; i < schemeNames.length; i++) {
        const schemeName = schemeNames[i];
        if (e.media === colorSchemes[schemeName]) {
          setScheme(schemeName.toLowerCase());
          break;
        }
      }
    };

    // Add listener for all themes
    let activeMatches = [];
    Object.keys(colorSchemes).forEach(schemeName => {
      const mq = window.matchMedia(colorSchemes[schemeName]);
      mq.addListener(listener);
      activeMatches.push(mq);
      listener(mq);
    });

    // Remove listeners, no memory leaks
    return () => {
      activeMatches.forEach(mq => mq.removeListener(listener));
      activeMatches = [];
    };
  }, []);

  return scheme;
}
