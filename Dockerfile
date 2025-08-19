#FROM ubuntu:latest
#LABEL authors="ktala"
#
#ENTRYPOINT ["top", "-b"]
# Użycie oficjalnego obrazu Pythona
FROM python:3.10-slim

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie pliku requirements.txt i instalowanie zależności
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiowanie całego katalogu aplikacji do kontenera
COPY . .

# Definicja zmiennej środowiskowej
ENV PYTHONPATH=/app

# Otworzenie portu 8000
EXPOSE 8000

# Komenda do uruchomienia aplikacji jest już w docker-compose.yml