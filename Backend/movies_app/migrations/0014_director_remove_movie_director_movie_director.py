# Generated by Django 5.1.1 on 2024-09-29 14:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies_app', '0013_alter_movie_genre_alter_movie_plot'),
    ]

    operations = [
        migrations.CreateModel(
            name='Director',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='movie',
            name='director',
        ),
        migrations.AddField(
            model_name='movie',
            name='director',
            field=models.ManyToManyField(related_name='movies', to='movies_app.director'),
        ),
    ]
