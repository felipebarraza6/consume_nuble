# Generated by Django 3.1.5 on 2021-01-24 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0019_auto_20210123_2017'),
    ]

    operations = [
        migrations.AddField(
            model_name='route',
            name='image_gallery',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
