# core/urls.py
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import UserViewSet, ExperienceViewSet
from projects.views import ProjectViewSet
from personal_brand.views import BrandStrategyViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'experiences', ExperienceViewSet, basename='experience')
router.register(r'projects', ProjectViewSet)
router.register(r'brand-strategy', BrandStrategyViewSet, basename='brand-strategy')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]