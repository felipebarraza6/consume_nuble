# Generated by Django 3.1.5 on 2021-01-23 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0017_auto_20210123_0622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='whats_app',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]