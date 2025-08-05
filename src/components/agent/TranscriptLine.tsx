import { TranscriptLine as TranscriptLineType } from '@/lib/store';

export default function TranscriptLine({ speaker, text }: Omit<TranscriptLineType, 'timestamp'>) {
  const isAgent = speaker === 'agent';
  return (
    <div className={`flex w-full ${isAgent ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] px-3 py-2 rounded-lg ${isAgent ? 'bg-indigo-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-bl-none'}`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}