# Use the official Python image from the Docker Hub
FROM python:3.11.9-alpine3.20

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app

RUN python manage.py migrate --settings=taste_backend.settings.dev

EXPOSE 5001

CMD ["gunicorn","taste_backend.asgi:application","-b","0.0.0.0:5001"]
