from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from .models import Product, Category

# Create your views here.


def index_view(request):
    categories = Category.objects.all()
    return render(request, 'home.html', {'categories':categories})

def products_view(request,category_id):
    category = get_object_or_404(Category, id=category_id)
    products = Product.objects.filter(ctgry = category)
    return render(request, 'products.html',{'category':category ,'products': products})

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