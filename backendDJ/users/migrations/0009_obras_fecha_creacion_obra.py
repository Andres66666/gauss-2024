# Generated by Django 5.1.1 on 2024-10-20 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_equipos_imagenequipos_equipos_imagenequipos_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='obras',
            name='fecha_creacion_obra',
            field=models.DateField(blank=True, null=True),
        ),
    ]