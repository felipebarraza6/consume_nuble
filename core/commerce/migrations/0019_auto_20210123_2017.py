# Generated by Django 3.1.5 on 2021-01-23 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0018_auto_20210123_0807'),
    ]

    operations = [
        migrations.AlterField(
            model_name='daynumber',
            name='title',
            field=models.CharField(max_length=200),
        ),
    ]
