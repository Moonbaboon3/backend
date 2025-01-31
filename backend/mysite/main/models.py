from django.db import models
from django.contrib.auth.models import User 
import datetime
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from django.urls import reverse
# Create your models here.

# products category
class Category(models.Model):
    ctgry_name = models.CharField(max_length=50)

    def __str__(self):
        return self.ctgry_name
    
    class Meta:
        verbose_name_plural = 'categories'

#customers
class Customer(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    fName = models.CharField(max_length=50)
    lName = models.CharField(max_length=50)
    phone = models.CharField(max_length= 10)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username

class Product(models.Model):
    pName = models.CharField(max_length=100)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=6)
    ctgry = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    description = models.CharField(max_length=250, default='', blank=True,null=True)
    image = models.ImageField(upload_to='uploads/product/')
    is_sale = models.BooleanField(default=False)
    sale_price = models.DecimalField(default=0, decimal_places=2, max_digits=6)
    avg_rating = models.FloatField(default=0, null=True, blank=True)

    def __str__(self):
        return self.pName
    
class Product_details(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='details')
    description = models.TextField()
    specifications = models.JSONField(default=dict)
    image1 = models.ImageField('uploads/product_details/')
    image2 = models.ImageField('uploads/product_details/')
    image3 = models.ImageField('uploads/product_details/')

    def __str__(self):
        return f'Details of {self.product.pName}'

class Review(models.Model):
    productDetail = models.ForeignKey(Product_details, on_delete=models.CASCADE, related_name='reviews')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='reviews')
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.customer.fName 

# customer orders
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    creation_date =  models.DateTimeField(auto_now_add=True, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=100, default='',blank=True)
    phone = models.CharField(max_length=20,default='',blank=True)
    data = models.DateField(default=datetime.datetime.today)
    status = models.BooleanField(default=False)

    def update_total_price(self):
        self.total_price = sum(item.price * item.quantity for item in self.items.all())
        self.save()

    def __str__(self):
         return f"Order #{self.id} by {self.customer.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    def save(self, *args, **kwargs):
        if not self.price:
            self.price = self.product.price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product.pName} (Order #{self.order.id})"

@receiver(post_save, sender=OrderItem)
def update_order_total_on_save(sender, instance, **kwargs):
    instance.order.update_total_price()

@receiver(post_delete, sender=OrderItem)
def update_order_total_on_delete(sender, instance, **kwargs):
    instance.order.update_total_price()