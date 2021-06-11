FROM python:3.9
ENV PYTHONUNBUFFERED 1
WORKDIR /ibis
COPY requirements.txt /ibis/requirements.txt
RUN pip install -r requirements.txt
COPY . /ibis

CMD python ibis/manage.py runserver 0.0.0.0:8000