import { useEffect } from 'react';
import { useAgentStore, Call } from '@/lib/store';

const mockCustomers = [
  { name: 'Ali Veli', level: 'Standard', lastInteraction: '5 saat önce' },
  { name: 'Zeynep Kaya', level: 'VIP', lastInteraction: '1 gün önce' },
  { name: 'Mustafa Öztürk', level: 'Standard', lastInteraction: '3 gün önce' },
] as const;

export function useRealtime() {
  const addCall = useAgentStore((state) => state.addCall);

  useEffect(() => {
    console.log('Realtime hook mounted. Starting call simulation...');
    
    const interval = setInterval(() => {
      const randomCustomer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
      
      const newCall: Call = {
        id: `call-${Date.now()}`,
        from: `+90 555 ${Math.floor(1000000 + Math.random() * 9000000)}`,
        status: 'ringing',
        customerInfo: randomCustomer,
        // DÜZELTME: Eksik olan zorunlu alanları ekliyoruz.
        handledBy: 'AI',
        agentState: 'idle',
      };
      
      addCall(newCall);
    }, 15000);

    return () => {
      console.log('Realtime hook unmounted. Stopping simulation...');
      clearInterval(interval);
    };
  }, [addCall]);
}