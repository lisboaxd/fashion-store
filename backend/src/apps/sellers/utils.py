from django.contrib.auth.models import ContentType


def upload_gallery_image(instance, filename):
    category = instance.product.category.category.lower()
    product = instance.product.product.lower()
    return f"images/{category}/{product}/gallery/{filename}"


def add_permissions_to_user(user, apps_list_name):
    content_types = ContentType.objects.filter(model__in=apps_list_name)

    for content_type in content_types:
        permissions = content_type.permission_set.all()
        for permission in permissions:
            user.user_permissions.add(permission)
