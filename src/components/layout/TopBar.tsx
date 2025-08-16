import ThemeToggleButton from '../ui/ThemeToggleButton';
import UserProfile from './UserProfile';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function TopBar({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Dikey ayırıcı */}
      <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" />
      
      {/* Arama çubuğu veya diğer öğeler için boşluk */}
      <div className="flex-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white">
        Agent Workspace
      </div>

      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <ThemeToggleButton />
        
        {/* Dikey ayırıcı */}
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" />
        
        <UserProfile />
      </div>
    </div>
  );
}