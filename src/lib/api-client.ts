// Bu dosya, backend ile olan tüm iletişimi yönetir.
// Framework'ten bağımsızdır ve gelecekte bir mobil uygulamada
// yeniden kullanılabilir.

class ApiClient {
  private baseUrl: string;
  private websocket: WebSocket | null = null;

  constructor() {
    // .env.local veya ortam değişkenlerinden alınacak
    this.baseUrl = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8000/api/v1';
  }

  // --- REST API Çağrıları ---
  public async getCustomerInfo(phoneNumber: string): Promise<any> {
    // Örnek bir REST çağrısı
    // const response = await fetch(`${this.baseUrl}/customers/${phoneNumber}`);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch customer info');
    // }
    // return response.json();

    // Şimdilik sahte veri döndürelim
    return Promise.resolve({
      name: 'Azmi Şahin',
      level: 'VIP',
      lastInteraction: '2024-08-04T10:30:00Z',
    });
  }

  // --- WebSocket İletişimi ---
  public connectWebSocket(
    onOpen: () => void,
    onMessage: (data: any) => void,
    onClose: () => void
  ) {
    const wsUrl = this.baseUrl.replace(/^http/, 'ws') + '/ws/agent';
    this.websocket = new WebSocket(wsUrl);

    this.websocket.onopen = onOpen;
    this.websocket.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };
    this.websocket.onclose = onClose;
    this.websocket.onerror = (err) => {
      console.error('WebSocket Error:', err);
      onClose(); // Hata durumunda da bağlantıyı kapalı kabul et
    };
  }
  
  public sendWebSocketMessage(data: any) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(data));
    }
  }

  public disconnectWebSocket() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}

// Singleton pattern: Uygulama boyunca tek bir ApiClient örneği kullanılır.
export const apiClient = new ApiClient();