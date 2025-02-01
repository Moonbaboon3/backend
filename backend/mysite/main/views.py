import json
#from pyexpat.errors import messages
from django.contrib import messages
import random
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from .models import Product, Category, Product_details, Review, Customer, Order, OrderItem
from .forms import Review_Form
from django.db.models import Avg
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def index_view(request):
    categories = Category.objects.all()
    return render(request, 'home.html', {'categories':categories})

def products_view(request,category_id):
    category = get_object_or_404(Category, id=category_id)
    products = Product.objects.filter(ctgry = category).annotate(
         average_rating=Avg('details__reviews__rating')
    )
    return render(request, 'products.html',{'category':category ,'products': products})

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            image_url = data.get('imageUrl')
            product_name = data.get('productName')
            price = float(data.get('price'))
            quantity = int(data.get('quantity'))
            cart = request.session.get('cart', {})

            if product_name in cart:
                cart[product_name]['quantity'] += quantity  
            else:
                cart[product_name] = {
                    'imageUrl': image_url,
                    'price': price,
                    'quantity': quantity
                }

            request.session['cart'] = cart

            return JsonResponse({'success': True})
        except Exception as e: 
            return JsonResponse({'success': False, 'error': str(e)}, status=400)
    return JsonResponse({'success': False, 'error': 'Invalid request method'}, status=405)

def view_cart(request):
    cart = request.session.get('cart', {})
    return render(request, 'cart.html', {'cart': cart})

def get_cart(request):
    cart = request.session.get('cart', {})
    return JsonResponse(cart)

def account_view(request):
    return render(request, 'account.html')

def myorders_view(request):
    customer = request.user.customer
    cstmr_order = Order.objects.filter(customer= customer).order_by('-creation_date')
    
    context = {
        'orders' : cstmr_order
    }
    return render(request, 'myorders.html', context)

def cancel_order(request, order_ID):
    order = get_object_or_404(Order, id=order_ID)
    
    if order.customer.user != request.user:
        messages.error(request, "You do not have permission to cancel this order.")
        return redirect('myorders')
    
    order_id = order.id  
    order_items = order.items.all()
    order_items.delete()
    order.delete()
    
    messages.success(request, f"Order #{order_id} has been canceled successfully.")
    return redirect('myorders')

@login_required
def productDetail_view(request, category_id, product_id):

    product = get_object_or_404(
        Product.objects.annotate(
            average_rating=Avg('details__reviews__rating')
        ),
        id=product_id
    )

    try:
        product_details = Product_details.objects.get(product=product)
    except Product_details.DoesNotExist:
        product_details = None
    reviews = product_details.reviews.all() if product_details else []

    form = Review_Form()

    if request.method == 'POST':
        form = Review_Form(request.POST)
        if form.is_valid():
            customer, created = Customer.objects.get_or_create(user=request.user)

        
            review = form.save(commit=False)

            review.productDetail = product_details
            review.customer = customer
            review.save()

            return redirect('product_detail', category_id=category_id, product_id=product_id)

    return render(request, 'productDetail.html', {
        'product': product,
        'product_details': product_details,
        'reviews': reviews,
        'form': form,
    })

from django.urls import reverse

@login_required
def delete_review(request, review_id):
    if request.method == 'POST':

        review = get_object_or_404(Review, id=review_id)
        category_id = review.productDetail.product.ctgry.id 
        product_id = review.productDetail.product.id

        if review.customer.user != request.user:
            messages.error(request, "Permission denied.")
            return redirect('my_orders')  
        
        review.delete()
        messages.success(request, "Review deleted successfully!")
        
        return redirect(
            reverse('product_detail', kwargs={
                'category_id': category_id,
                'product_id': product_id
            }) + f"?refresh={random.randint(1,1000)}#reviews"
        )
    
    return redirect('home')
 
def signup_view(request):
    return render(request, 'signup.html')

def login_view(request):
    return render(request, 'login.html')

def visa_view(request):
    return render(request, 'checkout.html')

from django.urls import reverse

from django.urls import reverse

def ajax_search_products(request):
    query = request.GET.get('q', '').strip()
    print(f"Received query: {query}")

    try:
        if query:
            products = Product.objects.filter(pName__icontains=query).select_related('ctgry')[:10]
            product_data = [
                {
                    "name": product.pName,
                    "url": reverse(
                        'product_detail',
                        args=[product.ctgry.id, product.id]  
                    ),
                }
                for product in products
            ]
            print(f"Matching products: {product_data}")
        else:
            product_data = []

        return JsonResponse({'products': product_data})
    except Exception as e:
        print(f"Error occurred: {e}")
        return JsonResponse({'error': 'Something went wrong!'}, status=500)

