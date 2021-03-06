# Generated by Django 3.1.5 on 2021-01-20 04:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0011_auto_20201214_1950'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, verbose_name='modified at')),
                ('title', models.CharField(max_length=25)),
                ('description', models.TextField(max_length=500)),
                ('principal_image', models.ImageField(upload_to='')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
    ]
