# **Backend**

## Getting started

- Install all python packages using `pip install -r requirements.txt`
- After installing a new package, make sure to update the requirements.txt file using `pip freeze > requirements.txt` to make development easier for others
- Run the backend using `python manage.py runserver`

## API

- All API endpoints should start with `/api/`
- All API endpoints should be designed in insomia and exported to a yaml file for documentation
  - [See Insomnia docs](https://docs.insomnia.rest/insomnia/get-started-with-documents)
- All API views should have a tests
  - [See DRF docs](https://www.django-rest-framework.org/api-guide/testing/)
  - Each endpoint should have a seperate file in `backend/tests/` with the same name as the view
- All API serializers should be hyperlinkedmodelserializers
  - [See DRF docs](https://www.django-rest-framework.org/api-guide/serializers/#hyperlinkedmodelserializer)

## Apps

- Major components such as accounts, products, etc. should be in their own app
- All apps should be in the apps directory
- Each app should have a `api.py` file to contain the api endpoints of the app

## Linking everything up

- Import all the api endpoints from each app from the app's directory and add them to the urlpatterns in `taste_backend/urls.py`

# **Frontend**

**Note: mata kammali bn mekath liyanna. passe liyanawa**
