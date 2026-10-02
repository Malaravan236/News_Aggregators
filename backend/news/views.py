

import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

from dotenv import load_dotenv
load_dotenv()

import os
API_KEY = os.environ.get("NEWS_API_KEY")

if not API_KEY:
    print("NOT API KEY! To check .env file!")

@api_view(['GET'])
def get_news(request):
    url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={API_KEY}"
    response = requests.get(url)
    data = response.json()

    if data.get("status") != "ok":
        return Response({"error": data.get("message", "Something went wrong")}, status=400)

    return Response(data.get("articles", []))


@api_view(['GET'])
def search_news(request):
    query = request.GET.get("q", "")

    if not query:
        return Response({"error": "Search query is required"}, status=400)

    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={API_KEY}"
    response = requests.get(url)
    data = response.json()

    if data.get("status") != "ok":
        return Response({"error": data.get("message", "Something went wrong")}, status=400)

    return Response(data.get("articles", []))


@api_view(['GET'])
def category_news(request):
    category = request.GET.get("category", "")

    if not category:
        return Response({"error": "Category is required"}, status=400)

    url = f"https://newsapi.org/v2/top-headlines?country=us&category={category}&apiKey={API_KEY}"
    response = requests.get(url)
    data = response.json()

    if data.get("status") != "ok":
        return Response({"error": data.get("message", "Something went wrong")}, status=400)

    return Response(data.get("articles", []))

