# Generated by Django 5.1.1 on 2024-10-06 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_usuarios_imagen_usuarios_imagen_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuarios',
            name='imagen_url',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]
