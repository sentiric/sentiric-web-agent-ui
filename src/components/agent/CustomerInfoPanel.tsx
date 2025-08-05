import { Card, Text, Title } from '@tremor/react';
import { useAgentStore } from '@/lib/store';
import { LightBulbIcon } from '@heroicons/react/24/outline';

export default function CustomerInfoPanel() {
  const { activeCallId, calls } = useAgentStore();
  const activeCall = calls.find(call => call.id === activeCallId);

  if (!activeCall) {
    return (
      <div className="p-4 text-center">
        <Title>Müşteri Bilgisi</Title>
        <Text className="mt-2 text-gray-600 dark:text-gray-400">Görüntülemek için bir çağrı seçin.</Text>
      </div>
    );
  }
  
  const { customerInfo } = activeCall;

  return (
    <div className="p-4">
      <Title>Müşteri Bilgisi</Title>
      <Card className="mt-4">
        <Text className="font-bold text-lg text-gray-900 dark:text-gray-50">{customerInfo.name}</Text>
        <Text className={`mt-1 font-semibold ${customerInfo.level === 'VIP' ? 'text-amber-500' : 'text-gray-600 dark:text-gray-400'}`}>{customerInfo.level} Müşteri</Text>
        <Text className="mt-2 text-sm text-gray-500">Son Etkileşim: {customerInfo.lastInteraction}</Text>
      </Card>
      
      <Title className="mt-6">AI Önerileri</Title>
       <Card className="mt-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <LightBulbIcon className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="flex-1">
            <Text className="font-semibold text-gray-900 dark:text-gray-50">Öneri: İade Politikası</Text>
            <Text className="text-xs mt-1 text-gray-600 dark:text-gray-400">Müşteri "iade" kelimesini kullandı. İade politikası yardım makalesini açabilirsiniz.</Text>
            <button className="text-xs text-indigo-500 hover:underline mt-2">Makaleyi Görüntüle</button>
          </div>
        </div>
      </Card>
    </div>
  );
}