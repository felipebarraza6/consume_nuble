# Generated by Django 3.1.5 on 2021-01-20 14:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0013_auto_20210120_1458'),
    ]

    operations = [
        migrations.CreateModel(
            name='Route',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, verbose_name='modified at')),
                ('name', models.CharField(max_length=30)),
                ('description', models.TextField(max_length=320)),
                ('whats_app', models.CharField(max_length=13)),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ElementDay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, verbose_name='modified at')),
                ('description', models.TextField(max_length=320)),
                ('number_day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.route')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='DayNumber',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('modified', models.DateTimeField(auto_now_add=True, verbose_name='modified at')),
                ('number_day', models.IntegerField()),
                ('route', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='commerce.route')),
            ],
            options={
                'ordering': ['-created', '-modified'],
                'get_latest_by': ('created',),
                'abstract': False,
            },
        ),
    ]
