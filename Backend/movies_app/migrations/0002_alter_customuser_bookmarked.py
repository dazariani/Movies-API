# Generated by Django 5.1.1 on 2024-09-19 15:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='bookmarked',
            field=models.ManyToManyField(blank=True, to='movies_app.movie'),
        ),
    ]
