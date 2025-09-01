# 🖥️ Sentiric Web Agent UI - Mantık ve Akış Mimarisi

**Belge Amacı:** Bu doküman, `web-agent-ui`'nin Sentiric platformunda **insan ve yapay zeka işbirliğinin gerçekleştiği kokpit** olarak stratejik rolünü, temel çalışma prensiplerini ve `api-gateway` ile olan gerçek zamanlı iletişimini açıklar.

# Görev Tanımı: Çağrı Kayıtlarını Arayüzde Oynatma

-   **Servis:** `frontend-service`
-   **Bağımlılık:** `cdr-service`'in `/api/calls/{call_id}/recording/play` endpoint'ini hazır hale getirmesi.
-   **Amaç:** Kullanıcının, Çağrı Detayları sayfasında, bir çağrı kaydını standart bir medya oynatıcı (play, pause, ses ayarı, ilerleme çubuğu) ile dinlemesini sağlamak.
-   **Mimari ve Sorumluluklar:**
    -   Frontend'in görevi, ses formatları, resampling (yeniden örnekleme) veya S3 gibi altyapı detaylarını **bilmemektir.**
    -   Frontend, sadece `cdr-service` tarafından sağlanan tek bir API endpoint'ini çağırır.
    -   Bu endpoint, tarayıcının doğrudan oynatabileceği standart bir ses akışı (`audio/mpeg`, `audio/wav` vb.) döndürecektir. Frontend bu akışı alıp HTML `<audio>` elementine beslemekle sorumludur.
-   **Uygulama Adımları:**
    -   [ ] **1. UI Bileşeni (Component) Geliştirme:**
        -   [ ] Çağrı detay verisi içinde `recording_uri` alanı dolu ise, bir `CallRecordingPlayer` bileşeni gösterilmelidir.
        -   [ ] Bu bileşen; bir "Oynat/Durdur" butonu, bir ilerleme çubuğu (progress bar), süre göstergeleri ve ses kontrolü içermelidir. Standart bir HTML `<audio>` elementinin kontrolleri başlangıç için yeterlidir.
    -   [ ] **2. API Entegrasyonu:**
        -   [ ] "Oynat" butonuna tıklandığında, frontend `cdr-service`'in sunduğu `GET /api/calls/{call_id}/recording/play` endpoint'ine bir `fetch` veya `axios` isteği yapmalıdır.
    -   [ ] **3. Ses Akışını Oynatma:**
        -   [ ] API'den gelen yanıt (response), bir ses dosyası akışıdır. Bu akış, bir `Blob` (Binary Large Object) olarak ele alınmalıdır.
        -   [ ] Bu `Blob`, `URL.createObjectURL()` metodu kullanılarak tarayıcının anlayabileceği geçici bir URL'e dönüştürülmelidir.
        -   [ ] Oluşturulan bu obje URL'i, `<audio>` elementinin `src` özelliğine atanmalı ve ardından `.play()` metodu çağrılarak oynatma başlatılmalıdır.
    -   [ ] **4. Durum Yönetimi (State Management):**
        -   [ ] Ses yüklenirken bir yüklenme göstergesi (spinner) gösterilmelidir (`isLoading`).
        -   [ ] API'den bir hata (örn: 404 Kayıt Bulunamadı) dönerse, kullanıcıya bir hata mesajı gösterilmelidir (`error`).
        
---

## 1. Stratejik Rol: "İnsan-AI İşbirliği Kokpiti"

Bu arayüz, platformun otomasyon yeteneklerinin insan zekası ve empatisi ile birleştiği yerdir. AI'ın bir görevi çözemediği veya kullanıcının özellikle bir insanla konuşmak istediği durumlarda devreye girer.

**Bu arayüz sayesinde:**
1.  **Sorunsuz Devir Sağlanır:** Bir AI diyaloğu, tek bir tıklama ile bir insan temsilciye, konuşma geçmişi ve müşteri bilgileriyle birlikte sorunsuz bir şekilde aktarılabilir.
2.  **Verimlilik Artar:** Temsilci, bir çağrıyı devraldığında, müşterinin kim olduğunu, daha önce ne konuştuğunu ve ne istediğini anında görür. Bu, "Sorununuzu baştan anlatır mısınız?" cümlesini ortadan kaldırır.
3.  **Gelişmiş Destek Mümkün Olur:** "Fısıldama" (Whisper) gibi özellikler sayesinde, bir süpervizör veya AI, temsilcinin kulağına müşterinin duymadığı ipuçları veya çözümler fısıldayarak destek olabilir.
4.  **Gerçek Zamanlı Farkındalık Sağlanır:** Temsilciler, beklemedeki çağrı kuyruğunu, aktif görüşmeleri ve diğer temsilcilerin durumunu anlık olarak izleyebilir.

---

## 2. Temel Çalışma Prensibi: WebSocket ve REST API

Arayüz, `api-gateway` ile iki temel kanal üzerinden iletişim kurar:

*   **WebSocket (Gerçek Zamanlı Olaylar İçin):** Uygulama açıldığında, `api-gateway`'e kalıcı bir WebSocket bağlantısı kurulur. `yeni_cagri_geldi`, `cagri_sonlandi`, `yeni_transkript_eklendi` gibi anlık olaylar bu kanal üzerinden arayüze push edilir. Bu, ekranın sürekli güncel kalmasını sağlar.
*   **REST API (Eylemler İçin):** Temsilcinin yaptığı her eylem (bir çağrıyı devralmak, bir mesaj fısıldamak, çağrıyı sonlandırmak) için `api-gateway`'in ilgili REST endpoint'ine bir HTTP isteği gönderilir.

---

## 3. Uçtan Uca Akış: Bir Çağrının Devralınması

```mermaid
sequenceDiagram
    participant AgentUI as Web Agent UI
    participant ApiGateway as API Gateway
    participant AgentService as Agent Service
    participant MediaService as Media Service

    Note over AgentUI, ApiGateway: WebSocket bağlantısı zaten kurulu.
    
    ApiGateway-->>AgentUI: (WebSocket) Olay: { type: "yeni_cagri_kuyrukta", data: {...} }
    Note over AgentUI: Yeni çağrıyı kuyruk listesinde gösterir.

    AgentUI->>AgentUI: Temsilci "Devral" butonuna tıklar.

    AgentUI->>ApiGateway: POST /api/v1/calls/{call_id}/takeover
    ApiGateway->>AgentService: (gRPC) TakeoverCall(call_id, agent_id)
    
    Note right of AgentService: AI diyalog döngüsünü durdurur. <br> Çağrıyı `media-service` üzerinden <br> temsilcinin SIP/WebRTC adresine yönlendirir.
    
    AgentService->>MediaService: RedirectRtpStream(call_id, agent_sip_endpoint)
    
    ApiGateway-->>AgentUI: (WebSocket) Olay: { type: "cagri_devralindi", data: {...} }
    Note over AgentUI: Çağrıyı "Aktif Çağrı" sütununa taşır, <br> sesli iletişim için WebRTC'yi aktif eder.
```

