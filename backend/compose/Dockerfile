FROM python:3.10.0 AS builder

ENV PYTHONUNBUFFERED 1

ARG USER_ID
ARG GROUP_ID
ARG REQUIREMENTS_FILE

RUN apt-get update\
    && apt-get install python3-dev apt-utils -y
RUN /usr/local/bin/python -m pip install --upgrade pip
ADD $REQUIREMENTS_FILE requirements.txt
RUN  pip install --user -r requirements.txt

FROM builder as application
COPY src app/
COPY compose/entrypoint /entrypoint
RUN sed -i 's/\r//' /entrypoint
RUN chmod +x /entrypoint

WORKDIR /app

FROM application as worker
COPY compose/entrypoint_worker /entrypoint_worker
RUN sed -i 's/\r//' /entrypoint_worker
RUN chmod +x /entrypoint_worker