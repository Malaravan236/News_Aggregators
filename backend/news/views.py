

import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Bookmark

API_KEY = "20f2f70cd4ad41c592c0b540082b95d3"


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


@csrf_exempt
def save_bookmark(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")
    title = data.get("title")
    url = data.get("url")
    image = data.get("image")

    if not email:
        return JsonResponse({"error": "Please login first"}, status=401)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)

    Bookmark.objects.create(
        user=user,
        title=title or "",
        url=url or "",
        image_url=image or ""
    )

    return JsonResponse({"message": "Bookmark saved successfully"}, status=201)