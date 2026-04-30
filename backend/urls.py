from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from tasks.auth_views import RegisterView
from django.contrib import admin
from django.urls import path, include
from tasks.views import index

urlpatterns = [
    path('',index, name='home'),
    path('admin/', admin.site.urls),

    path('api/', include('tasks.urls')),

    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
