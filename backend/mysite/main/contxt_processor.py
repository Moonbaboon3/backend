


from main.models import Category


def ctgry_menu(request):
    categories = Category.objects.all()
    return{'categories':categories}