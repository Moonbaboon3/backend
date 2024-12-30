
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.


def index_view(request):
    return render(request, 'index.html')

def products_view(request):
    return render(request, 'products.html')