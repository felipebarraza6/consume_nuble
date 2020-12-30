# Generated by Django 3.1.2 on 2020-12-14 18:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0009_enterpriseprofile_whatsapp'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='is_enterprise',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='place',
            name='is_place',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='rating',
            name='is_active',
            field=models.BooleanField(default=False),
        ),
    ]