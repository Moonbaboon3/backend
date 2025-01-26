from django.urls import path
from . import views

urlpatterns = [

    path('', views.index_view, name='home'),
    path('category/<int:category_id>/',views.products_view,name='products' ),
    path('products/cart/', views.cart_view, name='cart'),
    path('cart/', views.cart_view, name ='cart'),
    path('checkout/', views.visa_view, name='checkout'),
    path('signup/', views.signup_view, name='signup'),
    path('myorders/', views.myorders_view, name='myorders'),
    path('account/', views.account_view, name='account'),
    path('login/', views.login_view, name='login'),
    path('category/<int:category_id>/product/<int:product_id>/', views.productDetail_view, name='product_detail'),
     path('ajax-search/', views.ajax_search_products, name='ajax_search_products'),
] 