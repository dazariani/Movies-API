# Generated by Django 5.1.1 on 2024-09-28 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies_app', '0010_remove_movie_actors_remove_movie_genre_movie_actors_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movie',
            name='actors',
        ),
        migrations.RemoveField(
            model_name='movie',
            name='genre',
        ),
        migrations.AddField(
            model_name='movie',
            name='actors',
            field=models.ManyToManyField(related_name='movies', to='movies_app.actor'),
        ),
        migrations.AddField(
            model_name='movie',
            name='genre',
            field=models.ManyToManyField(to='movies_app.genre'),
        ),
    ]
