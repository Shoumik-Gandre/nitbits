# Generated by Django 3.1.2 on 2020-11-05 08:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20201029_1501'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='date_published',
            new_name='timestamp',
        ),
        migrations.RenameField(
            model_name='dislike',
            old_name='created_at',
            new_name='timestamp',
        ),
        migrations.RenameField(
            model_name='like',
            old_name='created_at',
            new_name='timestamp',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='date_published',
            new_name='timestamp',
        ),
        migrations.RemoveField(
            model_name='dislike',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='like',
            name='updated_at',
        ),
    ]