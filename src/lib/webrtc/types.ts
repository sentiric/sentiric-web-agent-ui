// Bu dosya, WebRTC durumları için tipleri tanımlar.
export type CallStatus = 
  | 'idle'
  | 'connecting'
  | 'active'
  | 'held'
  | 'ended';

export interface WebRTCEngine {
  getCallStatus(): CallStatus;
  answerCall(): Promise<void>;
  hangupCall(): Promise<void>;
  toggleMute(): Promise<boolean>;
  on(event: 'statusChange', listener: (status: CallStatus) => void): void;
  off(event: 'statusChange', listener: (status: CallStatus) => void): void;
}