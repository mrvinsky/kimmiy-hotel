#!/bin/bash
# Renk kodları
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Docker Kontrol Ediliyor...${NC}"

# Docker'ın olabileceği standart yollar (macOS)
PATHS=(
    "/usr/local/bin/docker"
    "/opt/homebrew/bin/docker"
    "/Applications/Docker.app/Contents/Resources/bin/docker"
)

DOCKER_CMD=""

# Yolları kontrol et
for P in "${PATHS[@]}"; do
    if [ -f "$P" ] && [ -x "$P" ]; then
        DOCKER_CMD="$P"
        echo -e "${GREEN}Docker bulundu: $P${NC}"
        break
    fi
done

# Eğer yollarda yoksa, genel komut olarak dene
if [ -z "$DOCKER_CMD" ]; then
    if command -v docker &> /dev/null; then
        DOCKER_CMD="docker"
        echo -e "${GREEN}Docker komutu sistemde tanımlı.${NC}"
    else
        echo -e "${RED}HATA: Docker komutu bulunamadı!${NC}"
        echo "Lütfen 'Docker Desktop' uygulamasının yüklü olduğundan emin olun."
        echo "Uygulamalar (Applications) klasörüne bakın."
        exit 1
    fi
fi

# Docker Daemon çalışıyor mu kontrol et
echo "Docker servisinin çalışıp çalışmadığı kontrol ediliyor..."
"$DOCKER_CMD" info > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}HATA: Docker Destkop uygulaması KAPALI görünüyor.${NC}"
    echo "Lütfen önce Docker Desktop uygulamasını başlatın ve açılmasını bekleyin."
    exit 1
else
    echo -e "${GREEN}Docker servisi AKTİF.${NC}"
fi

echo -e "${YELLOW}Proje Container'ları başlatılıyor...${NC}"

# Önce modern 'docker compose' (v2) dene, olmazsa 'docker-compose' (v1) dene
if "$DOCKER_CMD" compose version > /dev/null 2>&1; then
    echo "Komut: $DOCKER_CMD compose up -d --build"
    "$DOCKER_CMD" compose up -d --build
else
    # docker-compose (Eski versiyon kontrolü)
    COMPOSE_CMD=""
    if [ -f "/usr/local/bin/docker-compose" ]; then
        COMPOSE_CMD="/usr/local/bin/docker-compose"
    elif command -v docker-compose &> /dev/null; then
         COMPOSE_CMD="docker-compose"
    fi

    if [ -n "$COMPOSE_CMD" ]; then
        echo "Komut: $COMPOSE_CMD up -d --build"
        "$COMPOSE_CMD" up -d --build
    else
        echo -e "${RED}HATA: docker-compose bulunamadı.${NC}"
        echo "'docker compose' da çalışmadı. Docker Desktop güncel mi?"
        exit 1
    fi
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}----------------------------------------${NC}"
    echo -e "${GREEN}BAŞARILI! Proje başlatıldı.${NC}"
    echo -e "${GREEN}----------------------------------------${NC}"
    echo "Frontend: http://localhost:3000"
    echo "Backend:  http://localhost:3001"
else
    echo -e "${RED}Bir hata oluştu.${NC}"
fi
