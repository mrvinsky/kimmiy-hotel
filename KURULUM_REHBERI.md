# Kurulum Rehberi: aaPanel Üzerinde Kimmiy Hotel

Bu rehber, Kimmiy Hotel projesini aaPanel yüklü bir Linux sunucuda `kimmiyhotel.com` adresi üzerinden canlıya almak için gerekli adımları içerir.

## Ön Gereksinimler

1. **Docker Manager:** aaPanel Uygulama Mağazası'ndan "Docker Manager" eklentisini kurun.
2. **Alan Adı (Domain):** `kimmiyhotel.com` adresinin sunucu IP'nize yönlendiğinden emin olun.
3. **Portlar:** aaPanel Güvenlik (Security) bölümünden `80` ve `443` portlarını açın.

---

## Adım 1: Dosyaları Yükleme

Proje dosyalarını sunucuda `/www/wwwroot/kimmiy-hotel` dizinine yükleyin.

## Adım 2: Ortam Değişkenlerini Yapılandırma

Ana dizinde bir `.env` dosyası oluşturun. Sizin için güvenli şifreler içeren bir örnek hazırladım:

```env
# Database
POSTGRES_USER=kimmiy_admin
POSTGRES_PASSWORD=kimmiy_db_prod_2024!
POSTGRES_DB=kimmiyhotel

# Backend
JWT_SECRET=kjh2398hkj_prod_secret!
ADMIN_PASSWORD=admin_kimmiy_2024!
SMTP_HOST=smtp.your-email.com
SMTP_PORT=587
SMTP_USER=no-reply@kimmiyhotel.com
SMTP_PASS=your_email_password

# Frontend
NEXT_PUBLIC_API_URL=https://kimmiyhotel.com/api
```

## Adım 3: Konteynerleri Başlatma

aaPanel terminalini açın ve şu komutu çalıştırın:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## Adım 4: Ters Proxy Ayarları (Nginx)

1. **Website > Add Site** menüsünden `kimmiyhotel.com` sitesini ekleyin.
2. Site adına tıklayın > **Reverse Proxy > Add Reverse Proxy**.
3. **Kural 1 (Frontend):**
    - **Proxy Name:** `Frontend`
    - **Target URL:** `http://127.0.0.1:80` (Docker prod konfigürasyonundaki standart port)
4. **Kural 2 (API):**
    - **Proxy Name:** `Backend`
    - **Target URL:** `http://127.0.0.1:3001`
    - **Sent Domain:** `$host`
    - **Location:** Bu kuralın kapsamını `/api` olarak düzenleyin (Konfigürasyon dosyasında `/api` isteğini buraya yönlendirecek şekilde ayarlayın).

## Adım 5: SSL (HTTPS) Kurulumu

Site ayarlarından **SSL** kısmına gelin ve `kimmiyhotel.com` için bir **Let's Encrypt** sertifikası oluşturun.

---

## Adım 6: Veritabanı Başlangıç Verileri (Seeding)

Backend konteyneri içinde başlangıç verilerini oluşturmak için şu komutu çalıştırın:

```bash
docker exec -it kimmiy-hotel-backend-1 npx ts-node src/seed.ts
```
