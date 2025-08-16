import { Card, Text, Title, Badge } from '@tremor/react';
import { PhoneXMarkIcon, MicrophoneIcon, PauseIcon, ArrowRightIcon, PhoneArrowUpRightIcon, PaperAirplaneIcon, UserGroupIcon, CpuChipIcon, UserIcon } from '@heroicons/react/24/solid';
import { useAgentStore } from '@/lib/store';
import TranscriptLine from './TranscriptLine';
import TypingIndicator from './TypingIndicator';

export default function ActiveCallPanel() {
  const { activeCallId, calls, transcript, isAgentTyping, takeOverCall } = useAgentStore();
  const activeCall = calls.find(call => call.id === activeCallId);

  if (!activeCall) {
    return (
      <div className="p-4 h-full flex flex-col items-center justify-center text-center">
        <PhoneArrowUpRightIcon className="mx-auto h-12 w-12 text-gray-400" />
        <Title className="mt-2">Aktif Görüşme Yok</Title>
        <Text className="mt-1 text-gray-600 dark:text-gray-400">İşlem yapmak için kuyruktan bir çağrı seçin.</Text>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <Title>Aktif Görüşme</Title>
          <Text>Müşteri: {activeCall.from}</Text>
        </div>
        <Badge color={activeCall.handledBy === 'AI' ? 'sky' : 'emerald'} icon={activeCall.handledBy === 'AI' ? CpuChipIcon : UserIcon}>
          {activeCall.handledBy} yönetiyor
        </Badge>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto p-2 space-y-4">
        {transcript.map((line, index) => (
          <TranscriptLine key={index} speaker={line.speaker} text={line.text} />
        ))}
        {isAgentTyping && <TypingIndicator />}
      </div>
      
      {activeCall.handledBy === 'AI' ? (
        <div className="mt-auto flex items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-800">
            <input type="text" placeholder="AI'ya fısılda..." className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md border-0 py-1.5 px-2 text-sm"/>
            <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" title="Fısıltı Gönder">
                <PaperAirplaneIcon className="h-5 w-5"/>
            </button>
            <button 
              onClick={() => takeOverCall(activeCall.id)}
              className="flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              title="Çağrıyı Devral"
            >
                <UserGroupIcon className="h-5 w-5" />
                Devral
            </button>
        </div>
      ) : (
         <div className="mt-auto flex justify-center items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
            <button className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700" title="Çağrıyı Kapat"><PhoneXMarkIcon className="h-6 w-6" /></button>
            <button className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300" title="Sessize Al"><MicrophoneIcon className="h-6 w-6" /></button>
            <button className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300" title="Beklemeye Al"><PauseIcon className="h-6 w-6" /></button>
            <button className="p-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300" title="Aktar"><ArrowRightIcon className="h-6 w-6" /></button>
         </div>
      )}
    </div>
  );
}