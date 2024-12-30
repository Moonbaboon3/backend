
from django.http import HttpResponse
from django.shortcuts import render
from . models import Product

# Create your views here.


def index_view(request):
    return render(request, 'index.html')

def products_view(request):
    products = Product.objects.all()
    return render(request, 'products.html',{'products': products})