# Generated by Django 5.1.1 on 2024-11-20 20:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_equipos_almacen'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mantenimientos',
            name='cantMantCor',
        ),
        migrations.RemoveField(
            model_name='mantenimientos',
            name='cantMantPre',
        ),
        migrations.RemoveField(
            model_name='mantenimientos',
            name='estadoMantenimiento',
        ),
    ]