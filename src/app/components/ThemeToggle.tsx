'use client';

import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-lg transition-colors duration-200
                bg-gray-200 dark:bg-gray-700 
                text-gray-800 dark:text-gray-200
                hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {darkMode ? 'Light' : 'Dark'}
    </button>
  );
}
