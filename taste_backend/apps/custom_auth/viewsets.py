from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.custom_auth.models import User
from apps.custom_auth.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
import firebase_admin
from firebase_admin import credentials
from firebase_admin import auth
from django.utils import timezone
from dotenv import load_dotenv
import os

load_dotenv()

cred = credentials.Certificate({
  "type": "service_account",
  "project_id": os.getenv('PROJECT_ID'),
  "private_key_id": os.getenv('PRIVATE_KEY_ID'),
  "private_key": os.getenv('PRIVATE_KEY').replace(r'\n', '\n'),
  "client_email": os.getenv('CLIENT_EMAIL'),
  "client_id": os.getenv('CLIENT_ID'),
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": os.getenv('CLIENT_CERT_URL')
})

default_app = firebase_admin.initialize_app(cred)

class AuthViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        id_token = request.data.get('idToken')
        user,_ = User.objects.get_or_create(uid=request.data.get('uid'),email=request.data.get('email'),first_name=request.data.get('displayName'))

        try:
            session_cookie = auth.create_session_cookie(id_token, expires_in=timezone.timedelta(days=5))
            response = Response(status=status.HTTP_200_OK)
            response.set_cookie('session', session_cookie, expires=timezone.now() + timezone.timedelta(days=5))
            return response
        except Exception as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={'error':str(e)})


    @action(detail=False, methods=['get'])
    def verifysession(self, request, *args, **kwargs):
        session_cookie = request.COOKIES.get('session')
        try:
            decoded_claims = auth.verify_session_cookie(session_cookie)
            return Response(status=status.HTTP_200_OK, data=decoded_claims)
        except Exception as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={'error':str(e)})
    
    @action(detail=False, methods=['get'])
    def logout(self, request, *args, **kwargs):
        try:
            response = Response(status=status.HTTP_200_OK)
            response.delete_cookie('session')
            return response
        except Exception as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED,data={'error':str(e)})
        
class UserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def userdata(self, request, *args, **kwargs):
        user = request.user
        return Response(status=status.HTTP_200_OK, data=UserSerializer(user).data)
    

