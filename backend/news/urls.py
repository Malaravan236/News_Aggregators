from django.urls import path
from .views import get_news, search_news, category_news, save_bookmark

urlpatterns = [
    path("news/", get_news, name="get_news"),
    path("news/search/", search_news, name="search_news"),
    path("news/category/", category_news, name="category_news"),
    path('bookmark/', save_bookmark, name="save_bookmark"),
]