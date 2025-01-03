from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from .models import Product, Category, Product_details, Review, Customer
from .forms import Review_Form
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

@login_required
def productDetail_view(request,category_id, product_id):
    category = get_object_or_404(Category, id=category_id)
    product = get_object_or_404(Product,id=product_id, ctgry=category)
    product_details = get_object_or_404(Product_details,product=product) 
    reviews = product_details.reviews.all()
    form = Review_Form()

    if request.method == 'POST':
        form = Review_Form(request.POST)
        if form.is_valid():
            customer = get_object_or_404(Customer, user=request.user)
            review = form.save(commit=False)
            review.product_details = product_details
            review.customer = customer
            review.save()
            return redirect('product_detail',category_id=category_id, product_id=product_id)
        
            
    return render(request, 'productDetail.html',{
            'category': category,
            'product' : product,
            'product_details' :product_details,
            'reviews' : reviews,
            'form' : form,
            })


def signup_view(request):
    return render(request, 'signup.html')

def login_view(request):
    return render(request, 'login.html')

def visa_view(request):
    return render(request, 'checkout.html')