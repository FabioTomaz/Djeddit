from django import template

register = template.Library()

@register.filter(name='subtract')
def subtract(value, arg):
    return value - arg

@register.simple_tag(name='url_replace')
def url_replace(request):
    return request.GET.urlencode()