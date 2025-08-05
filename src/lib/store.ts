import { create } from 'zustand';

// Tipler
export type CallHandledBy = 'AI' | 'Agent';
export type AgentCallState = 'idle' | 'listening' | 'whispering' | 'active';

export interface Call {
  id: string;
  from: string;
  status: 'ringing' | 'active' | 'ended';
  customerInfo: {
    name: string;
    level: 'Standard' | 'VIP';
    lastInteraction: string;
  };
  handledBy: CallHandledBy;
  agentState: AgentCallState;
}

export interface TranscriptLine {
  speaker: 'agent' | 'customer';
  text: string;
  timestamp: Date;
}

interface AgentState {
  calls: Call[];
  activeCallId: string | null;
  transcript: TranscriptLine[];
  isAgentTyping: boolean; // Bu "yazıyor..." animasyonu için
}

interface AgentActions {
  addCall: (call: Call) => void;
  selectCall: (callId: string | null) => void;
  addTranscriptLine: (line: TranscriptLine) => void;
  clearTranscript: () => void;
  setIsAgentTyping: (isTyping: boolean) => void;
  takeOverCall: (callId: string) => void;
}

const mockCustomers = [
  { name: 'Azmi Şahin', level: 'VIP' as const, lastInteraction: '2 gün önce' },
  { name: 'Ayşe Yılmaz', level: 'Standard' as const, lastInteraction: '1 hafta önce' },
  { name: 'Mehmet Öztürk', level: 'Standard' as const, lastInteraction: '3 gün önce' },
];

export const useAgentStore = create<AgentState & AgentActions>((set, get) => ({
  // --- STATE ---
  calls: [
    { id: 'call-123', from: '+90 555 123 4567', status: 'ringing', customerInfo: mockCustomers[0], handledBy: 'AI', agentState: 'idle' },
    { id: 'call-456', from: '+90 555 987 6543', status: 'ringing', customerInfo: mockCustomers[1], handledBy: 'AI', agentState: 'idle' },
  ],
  activeCallId: null,
  transcript: [],
  isAgentTyping: false,

  // --- ACTIONS ---
  addCall: (call) => set((state) => ({ calls: [call, ...state.calls] })),
  
  selectCall: (callId) => {
    get().clearTranscript();
    set({ activeCallId: callId, isAgentTyping: false });
    if (callId) {
      const agentMessages = ["Sentiric'e hoş geldiniz, nasıl yardımcı olabilirim?", "Elbette, hemen kontrol ediyorum."];
      const customerMessages = ["Merhaba, siparişim hakkında bilgi almak istiyorum.", "Sipariş numaram 12345."];
      let i = 0;
      const interval = setInterval(() => {
        if (get().activeCallId !== callId) { clearInterval(interval); return; }
        if (i < customerMessages.length) {
          get().addTranscriptLine({ speaker: 'customer', text: customerMessages[i], timestamp: new Date() });
          set({ isAgentTyping: true });
          setTimeout(() => {
            if (get().activeCallId === callId) {
              get().addTranscriptLine({ speaker: 'agent', text: agentMessages[i], timestamp: new Date() });
              set({ isAgentTyping: false });
            }
          }, 1500);
          i++;
        } else { clearInterval(interval); }
      }, 4000);
    }
  },
  
  addTranscriptLine: (line) => set((state) => ({ transcript: [...state.transcript, line] })),
  clearTranscript: () => set({ transcript: [] }),
  setIsAgentTyping: (isTyping) => set({ isAgentTyping: isTyping }),
  
  takeOverCall: (callId) => {
    set((state) => ({
      calls: state.calls.map(c => 
        c.id === callId ? { ...c, handledBy: 'Agent', agentState: 'active' } : c
      ),
    }));
    // Gerçekte burada bir API çağrısı ile backend'e de bilgi verilir.
  },
}));