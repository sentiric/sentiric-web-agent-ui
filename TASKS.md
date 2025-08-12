# 🖥️ Sentiric Web Agent UI - Görev Listesi

Bu belge, `web-agent-ui`'nin geliştirme yol haritasını ve önceliklerini tanımlar.

---

### Faz 1: Arayüz İskeleti ve Statik Simülasyon (Mevcut Durum)

Bu faz, arayüzün temel bileşenlerini oluşturmayı ve sahte (mock) verilerle çalışır bir prototip sunmayı hedefler.

-   [x] **Next.js Proje Kurulumu:** Modern, TypeScript tabanlı proje yapısı.
-   [x] **Temel Layout:** Sidebar ve TopBar'ı içeren ana uygulama düzeni.
-   [x] **Workspace Mimarisi:** Üç sütunlu (Kuyruk, Aktif Çağrı, Müşteri Bilgisi) çalışma alanı tasarımı.
-   [x] **Durum Yönetimi (`Zustand`):** Çağrıları, aktif çağrıyı ve transkripti yöneten merkezi bir state store.
-   [x] **Sahte Veri Simülasyonu (`useRealtime`):** API bağlantısı olmadan arayüzü canlı göstermek için periyodik olarak yeni çağrılar ve transkriptler üreten bir mekanizma.

---

### Faz 2: Gerçek Zamanlı API Entegrasyonu (Sıradaki Öncelik)

Bu faz, arayüzü sahte verilerden arındırıp, `api-gateway` üzerinden gelen canlı verilerle çalışır hale getirmeyi hedefler.

-   [ ] **Görev ID: UI-AGENT-001 - WebSocket Bağlantısı**
    -   **Açıklama:** Uygulama başladığında `api-gateway`'e bir WebSocket bağlantısı kur. `useRealtime` hook'unu bu gerçek zamanlı bağlantıyı kullanacak şekilde yeniden yaz. Gelen yeni çağrı, durum değişikliği ve transkript olaylarını dinleyerek Zustand store'unu güncelle.
    -   **Durum:** ⬜ Planlandı.

-   [ ] **Görev ID: UI-AGENT-002 - Çağrı Devralma API Çağrısı**
    -   **Açıklama:** "Devral" butonuna tıklandığında, sadece arayüzdeki durumu değiştirmekle kalma, aynı zamanda `api-gateway`'e çağrıyı devralma isteği gönderen bir API çağrısı yap.
    -   **Durum:** ⬜ Planlandı.

-   [ ] **Görev ID: UI-AGENT-003 - Fısıldama (Whisper) API Çağrısı**
    -   **Açıklama:** "Fısılda" input alanına yazılan metni, `api-gateway` üzerinden `agent-service`'e gönderen bir API çağrısı yap.
    -   **Durum:** ⬜ Planlandı.

---

### Faz 3: WebRTC ile Sesli İletişim

Bu faz, agent'ların doğrudan tarayıcı üzerinden konuşmasını sağlamayı hedefler.

-   [ ] **Görev ID: UI-AGENT-004 - `sentiric-sip-client-sdk` Entegrasyonu**
    -   **Açıklama:** WebRTC tabanlı SIP istemci SDK'sını arayüze entegre et. Agent giriş yaptığında, arka planda SIP sunucusuna register ol.
    -   **Durum:** ⬜ Planlandı.

-   [ ] **Görev ID: UI-AGENT-005 - Çağrı Kontrol Butonları**
    -   **Açıklama:** "Sessize Al", "Beklemeye Al", "Kapat" gibi butonların, SDK aracılığıyla gerçek WebRTC ses akışını kontrol etmesini sağla.
    -   **Durum:** ⬜ Planlandı.