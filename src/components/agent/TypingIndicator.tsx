export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-2">
      <div className="flex items-center space-x-1.5 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none">
        <span className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}