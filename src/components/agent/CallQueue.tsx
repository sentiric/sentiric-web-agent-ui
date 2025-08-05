import { useAgentStore } from '@/lib/store';
import { Card, Text, Title, Badge } from '@tremor/react';
import { CpuChipIcon, UserIcon } from '@heroicons/react/24/solid';

export default function CallQueue() {
  const { calls, activeCallId, selectCall } = useAgentStore();
  return (
    <div className="p-4 h-full flex flex-col">
      <Title>Çağrı Kuyruğu ({calls.length})</Title>
      <Text className="mt-1">Gelen çağrılar burada listelenir.</Text>
      <div className="mt-4 space-y-2 overflow-y-auto pr-2 flex-1">
        {calls.map((call) => (
          <Card
            key={call.id}
            className={`cursor-pointer transition-all duration-150 ease-in-out ${activeCallId === call.id ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
            onClick={() => selectCall(call.id)}
          >
            <div className="flex justify-between items-center">
                <div>
                    <Text className="font-semibold text-gray-900 dark:text-gray-50">{call.from}</Text>
                    <Text className="text-gray-600 dark:text-gray-400">{call.status}</Text>
                </div>
                <Badge color={call.handledBy === 'AI' ? 'sky' : 'emerald'} icon={call.handledBy === 'AI' ? CpuChipIcon : UserIcon}>
                  {call.handledBy}
                </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}