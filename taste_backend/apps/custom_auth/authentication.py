from .models import User
from rest_framework import authentication
from rest_framework import exceptions
from firebase_admin import auth


#required to fit firebase authentication into django authentication. 
#this adds user object into the request so i can use in viewsets
class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        session_cookie = request.COOKIES.get('session')
        if not session_cookie:
            return None
        try:
            decoded_claims = auth.verify_session_cookie(session_cookie, check_revoked=True)
            uid = decoded_claims.get('uid')
            user = User.objects.get(uid=uid)
            return (user, None)
        except:
            raise exceptions.AuthenticationFailed('No such user')