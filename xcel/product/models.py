from django.db import models
from datetime import datetime


class Ingredient(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Product(models.Model):
    created = models.DateTimeField(default=datetime.now)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='product_logos')
    img_a = models.ImageField(upload_to='product_images', default='placeholder.png')
    img_b = models.ImageField(upload_to='product_images', default='placeholder.png')
    about = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    price = models.DecimalField(decimal_places=2, max_digits=10, default=0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['created']

    def save(self, *args, **kwargs):
        """
        Use the `pygments` library to create a highlighted HTML
        representation of the code snippet.
        """
        # lexer = get_lexer_by_name(self.language)
        # linenos = 'table' if self.linenos else False
        # options = {'title': self.title} if self.title else {}
        # formatter = HtmlFormatter(style=self.style, linenos=linenos,
        #                           full=True, **options)
        # self.highlighted = highlight(self.code, lexer, formatter)#
        # self.logo = 'placeholder.png'
        super(Product, self).save(*args, **kwargs)

