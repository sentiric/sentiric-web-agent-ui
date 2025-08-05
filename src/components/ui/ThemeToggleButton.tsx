import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
}