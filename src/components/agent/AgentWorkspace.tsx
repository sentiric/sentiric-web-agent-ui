import CallQueue from './CallQueue';
import ActiveCallPanel from './ActiveCallPanel';
import CustomerInfoPanel from './CustomerInfoPanel';
import { useRealtime } from '@/hooks/useRealtime';
import { useAgentStore } from '@/lib/store';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { PhoneIcon, UserCircleIcon } from '@heroicons/react/24/solid';

export default function AgentWorkspace() {
  useRealtime();
  const activeCall = useAgentStore((state) => state.calls.find(call => call.id === state.activeCallId));

  return (
    // md (medium) ve üzeri ekranlarda 3'lü grid, daha küçüklerde (mobil) tek kolon
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-4rem)]">
      <aside className="hidden md:block md:col-span-1 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
        <CallQueue />
      </aside>

      {/* Mobil için Tab'lı görünüm */}
      <div className="md:hidden">
        <TabGroup>
          <TabList variant="line" defaultValue="1">
            <Tab value="1" icon={PhoneIcon}>Çağrı Kuyruğu</Tab>
            <Tab value="2" icon={UserCircleIcon} disabled={!activeCall}>Müşteri</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><CallQueue /></TabPanel>
            <TabPanel><CustomerInfoPanel /></TabPanel>
          </TabPanels>
        </TabGroup>
      </div>

      <section className="col-span-1 md:col-span-2 bg-white dark:bg-gray-900 overflow-y-auto">
        <ActiveCallPanel />
      </section>

      <aside className="hidden md:block md:col-span-1 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto">
        <CustomerInfoPanel />
      </aside>
    </div>
  );
}