# Generated by Django 3.1.2 on 2020-10-30 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0005_auto_20201029_0325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='rating',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
