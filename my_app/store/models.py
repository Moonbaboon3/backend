from django.db import models

class category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self):
        return self.name

class product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(category, on_delete=models.CASCADE,related_name='products')
    stock=models.IntegerField(default=0)

    def __str__(self):
        return self.name
