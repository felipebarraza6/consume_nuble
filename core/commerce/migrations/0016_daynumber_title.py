# Generated by Django 3.1.5 on 2021-01-23 04:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0015_auto_20210120_1509'),
    ]

    operations = [
        migrations.AddField(
            model_name='daynumber',
            name='title',
            field=models.CharField(default='p', max_length=2),
            preserve_default=False,
        ),
    ]
