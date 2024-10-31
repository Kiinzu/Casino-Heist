FROM python:3.12

RUN mkdir -p /app
WORKDIR /app

RUN apt-get update && apt-get install -y dos2unix
RUN apt-get update && apt-get install -y openssl

COPY . .
RUN dos2unix /app/start.sh
RUN chmod +x /app/start.sh
RUN ./start.sh

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000