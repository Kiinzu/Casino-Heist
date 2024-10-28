FROM python:3.12

ENV PIP_DISABLE_PIP_VERSION_CHECK 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

RUN mkdir /src

COPY . /src/

WORKDIR /src

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt  # Ensure this is correct
RUN chmod +x ./docker-entrypoint.sh  # Make entrypoint script executable
RUN chmod 777 ./start.sh  # Make start.sh executable

ENTRYPOINT ["./docker-entrypoint.sh"]
