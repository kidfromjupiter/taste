from .models import User
from rest_framework import authentication
from rest_framework import exceptions
from firebase_admin import auth
from django.conf import settings
#required to fit firebase authentication into django authentication. 
#this adds user object into the request so i can use in viewsets
class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        session_cookie = request.COOKIES.get('session')
        if not session_cookie:
            return None
        try:
            decoded_claims = auth.verify_session_cookie(session_cookie, check_revoked=True,clock_skew_seconds=60)
            uid = decoded_claims.get('uid')
            user,_ = User.objects.get_or_create(uid=uid,first_name=decoded_claims.get("name"),email=decoded_claims.get("email"),last_name="")
            return (user, None)
        except Exception as e:
            print(e)
            raise exceptions.AuthenticationFailed('No such user')
