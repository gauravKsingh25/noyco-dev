'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from '../store/slices/themeSlice'; // Update the import path
import styles from '../app/globals.css'; // Ensure styles are correctly imported

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.mode); // Access theme mode from Redux state
  const dispatch = useDispatch();

  // Reflect theme changes to the DOM
  const reflectPreference = (value) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', value);
      const toggleButton = document.querySelector('#theme-toggle');
      if (toggleButton) {
        toggleButton.setAttribute('aria-label', value);
      }
    }
  };

  // Sync with system preferences
  useEffect(() => {
    reflectPreference(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = ({ matches }) => {
      const newTheme = matches ? 'dark' : 'light';
      dispatch(setTheme(newTheme)); // Dispatch Redux action
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [theme, dispatch]);

  return (
    <button
      className={styles.themeToggle}
      id="theme-toggle"
      title="Toggles light & dark"
      aria-label="auto"
      aria-live="polite"
      onClick={() => dispatch(toggleTheme())} // Dispatch toggleTheme action
    >
      <svg
        className={styles.sunAndMoon}
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <mask className={styles.moon} id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle cx="24" cy="10" r="6" fill="black" />
        </mask>
        <circle
          className={styles.sun}
          cx="12"
          cy="12"
          r="6"
          mask="url(#moon-mask)"
          fill="currentColor"
        />
        <g className={styles.sunBeams} stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;
