# Generated by Django 3.1.2 on 2020-11-05 01:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0006_auto_20201030_0215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='description',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
    ]