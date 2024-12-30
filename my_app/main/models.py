from django.db import models
import datetime
# Create your models here.

# products category
class Category(models.Model):
    ctgry_name = models.CharField(max_length=50)

    def _str_(self):
        return self.ctgry_name

#customers
class Customer(models.Model):
    fName = models.CharField(max_length=50)
    lName = models.CharField(max_length=50)
    phone = models.CharField(max_length= 10)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

    def _str_(self):
        return f'{self.fName} {self.lName}'

class Product(models.Model):
    pName = models.CharField(max_length=100)
    price = models.DecimalField(default=0, decimal_places=2, max_digits=6)
    ctgry = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    description = models.CharField(max_length=250, default='', blank=True,null=True)
    image = models.ImageField(upload_to='uploads/product/')
    is_sale = models.BooleanField(default=False)
    sale_price = models.DecimalField(default=0, decimal_places=2, max_digits=6)

    def _str_(self):
        return self.pName

# customer orders
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    address = models.CharField(max_length=100, default='',blank=True)
    phone = models.CharField(max_length=20,default='',blank=True)
    data = models.DateField(default=datetime.datetime.today)
    status = models.BooleanField(default=False)

    def _Str_(self):
        return self.product