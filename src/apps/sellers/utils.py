def upload_gallery_image(instance, filename):
    category = instance.product.category.category.lower()
    product = instance.product.product.lower()
    return f"images/{category}/{product}/gallery/{filename}"
