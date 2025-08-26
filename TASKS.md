# 🖥️ Sentiric Web Agent UI - Geliştirme Yol Haritası (v4.0)

Bu belge, `web-agent-ui`'nin geliştirme görevlerini projenin genel fazlarına uygun olarak listeler.

---

### **FAZ 1: Arayüz İskeleti ve Statik Simülasyon (Mevcut Durum)**

**Amaç:** Arayüzün temel bileşenlerini ve düzenini oluşturmak, API olmadan da geliştirme ve demo yapabilmek.

-   [x] **Görev ID: UI-CORE-01 - Next.js Proje Kurulumu ve Temel Layout**
    -   **Durum:** ✅ **Tamamlandı**
-   [x] **Görev ID: UI-CORE-02 - Üç Sütunlu Workspace Mimarisi**
    -   **Durum:** ✅ **Tamamlandı**
-   [x] **Görev ID: UI-CORE-03 - Zustand ile Durum Yönetimi**
    -   **Durum:** ✅ **Tamamlandı**
-   [x] **Görev ID: UI-CORE-04 - Sahte Veri Simülasyonu**
    -   **Durum:** ✅ **Tamamlandı**

---

### **FAZ 2: Gerçek Zamanlı API Entegrasyonu (Sıradaki Öncelik)**

**Amaç:** Arayüzü sahte verilerden arındırıp, `api-gateway` üzerinden gelen canlı verilerle çalışır hale getirmek.

-   [ ] **Görev ID: UI-AGENT-001 - Gerçek Zamanlı Olay Akışı (WebSocket)**
    -   **Açıklama:** `useRealtime` hook'unu, `api-gateway`'e bağlanan gerçek bir WebSocket istemcisiyle değiştir. Gelen olayları dinleyerek Zustand store'unu güncelle.
    -   **Kabul Kriterleri:**
        -   [ ] Uygulama yüklendiğinde, `api-gateway`'e başarılı bir WebSocket bağlantısı kurulmalıdır.
        -   [ ] Gateway'den `yeni_cagri_kuyrukta` olayı geldiğinde, bu çağrı anında arayüzdeki "Kuyruk" listesine eklenmelidir.
        -   [ ] Gateway'den `yeni_transkript_eklendi` olayı geldiğinde, bu transkript anında "Aktif Çağrı" panelindeki konuşma geçmişine eklenmelidir.

-   [ ] **Görev ID: UI-AGENT-002 - Çağrı Yönetimi Eylemleri (REST API)**
    -   **Açıklama:** "Devral", "Kapat", "Fısılda" gibi butonlara basıldığında, ilgili API endpoint'lerine doğru isteklerin gönderilmesini sağla.
    -   **Kabul Kriterleri:**
        -   [ ] "Devral" butonuna tıklandığında, `POST /api/v1/calls/{call_id}/takeover` isteği gönderilmelidir.
        -   [ ] "Fısılda" input alanına metin girilip gönderildiğinde, `POST /api/v1/calls/{call_id}/whisper` isteği `{ "text": "..." }` gövdesiyle gönderilmelidir.
        -   [ ] API çağrılarının başarılı veya başarısız olma durumlarına göre kullanıcıya görsel geri bildirim (notification/toast) gösterilmelidir.

---

### **FAZ 3: Tarayıcı Üzerinden Sesli İletişim (WebRTC)**

**Amaç:** Temsilcilerin harici bir softphone'a ihtiyaç duymadan, doğrudan tarayıcı üzerinden müşteriyle konuşmasını sağlamak.

-   [ ] **Görev ID: UI-AGENT-004 - `sentiric-sip-client-sdk` Entegrasyonu**
    -   **Açıklama:** WebRTC tabanlı SIP istemci SDK'sını arayüze entegre et. Temsilci giriş yaptığında, arka planda SIP sunucusuna `REGISTER` olmasını sağla.
    -   **Kabul Kriterleri:**
        -   [ ] Temsilci başarılı bir şekilde giriş yaptığında, SDK aracılığıyla `REGISTER` işlemi tamamlanmalı ve arayüzde "Bağlantı Kuruldu" gibi bir gösterge belirmelidir.
        -   [ ] Bir çağrı devralındığında (`takeover` API çağrısı sonrası), SDK aracılığıyla gelen `INVITE` isteği kabul edilmeli ve tarayıcıda sesli iletişim kanalı açılmalıdır.

-   [ ] **Görev ID: UI-AGENT-005 - Çağrı Kontrol Butonları**
    -   **Açıklama:** "Sessize Al" (`Mute`), "Beklemeye Al" (`Hold`), "Kapat" (`Hangup`) gibi butonların, SDK aracılığıyla gerçek WebRTC ses akışını kontrol etmesini sağla.
    -   **Kabul Kriterleri:**
        -   [ ] "Sessize Al" butonuna basıldığında, SDK'nın `mute()` fonksiyonu çağrılmalı ve müşteriye ses gitmemelidir.
        -   [ ] "Kapat" butonuna basıldığında, SDK'nın `hangup()` fonksiyonu çağrılmalı ve hem arayüzde hem de arka uçta çağrı sonlandırılmalıdır.