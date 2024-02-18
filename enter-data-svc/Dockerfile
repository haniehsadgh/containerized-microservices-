FROM python:3.9
WORKDIR /usr/src/app
COPY requirements.txt app.js ./
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000
CMD ["node", "app.py"]
