# Generated by Django 5.1.1 on 2024-10-20 06:36

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_obras_fecha_cierre_obra'),
    ]

    operations = [
        migrations.AlterField(
            model_name='obras',
            name='fecha_creacion_obra',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
