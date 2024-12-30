from django.http import HttpResponse
from django.shortcuts import render
from .models import Product

# Create your views here.


def index_view(request):
    return render(request, 'home.html')

def products_view(request):
    products = Product.objects.all()
    return render(request, 'products.html',{'products': products})

def cart_view(request):
    return render(request, 'cart.html')

def account_view(request):
    return render(request, 'account.html')

def myorders_view(request):
    return render(request, 'myorders.html')

def productdetail_view(request):
    return render(request, 'productdetail.html')

def signup_view(request):
    return render(request, 'signup.html')

def login_view(request):
    return render(request, 'login.html')

def visa_view(request):
    return render(request, 'checkout.html')