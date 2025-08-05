import { CallStatus, WebRTCEngine } from './types';

// Bu, gerçek WebRTC SDK'sını taklit eden sahte motorumuzdur.
class MockWebRTCEngine implements WebRTCEngine {
  private status: CallStatus = 'idle';
  private isMuted: boolean = false;
  private listeners: ((status: CallStatus) => void)[] = [];
  
  private setStatus(newStatus: CallStatus) {
    this.status = newStatus;
    console.log(`[MockWebRTC] Status changed to: ${newStatus}`);
    this.listeners.forEach(listener => listener(newStatus));
  }

  getCallStatus(): CallStatus {
    return this.status;
  }

  async answerCall(): Promise<void> {
    console.log('[MockWebRTC] Answering call...');
    this.setStatus('connecting');
    // Simülasyon: Bağlantı 1.5 saniye sürsün
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.setStatus('active');
    console.log('[MockWebRTC] Call is now active.');
  }

  async hangupCall(): Promise<void> {
    console.log('[MockWebRTC] Hanging up call...');
    this.setStatus('ended');
    await new Promise(resolve => setTimeout(resolve, 500));
    this.setStatus('idle');
  }

  async toggleMute(): Promise<boolean> {
    this.isMuted = !this.isMuted;
    console.log(`[MockWebRTC] Mute toggled. Is muted: ${this.isMuted}`);
    return this.isMuted;
  }
  
  on(event: 'statusChange', listener: (status: CallStatus) => void) {
    if (event === 'statusChange') {
      this.listeners.push(listener);
    }
  }

  off(event: 'statusChange', listener: (status: CallStatus) => void) {
    if (event === 'statusChange') {
      this.listeners = this.listeners.filter(l => l !== listener);
    }
  }
}

// Singleton pattern: Uygulama boyunca tek bir motor örneği kullanılır.
export const mockRtcEngine = new MockWebRTCEngine();