from django.shortcuts import render
from .models import category,product

def home(request):
    context={}
    return render(request,'store/home.html',context)

def cart(request):
    context={}
    return render(request,'store/cart.html',context)



