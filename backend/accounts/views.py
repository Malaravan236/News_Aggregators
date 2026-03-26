import json
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def signup_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return JsonResponse({"error": "Email and password are required"}, status=400)

    if User.objects.filter(username=email).exists():
        return JsonResponse({"error": "User already exists"}, status=400)

    User.objects.create_user(
        username=email,
        email=email,
        password=password
    )

    return JsonResponse({"message": "Signup successful"}, status=201)


@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return JsonResponse({"error": "Email and password are required"}, status=400)

    user = authenticate(username=email, password=password)

    if user is None:
        return JsonResponse({"error": "Invalid email or password"}, status=400)

    return JsonResponse({
        "message": "Login successful",
        "email": user.email
    }, status=200)