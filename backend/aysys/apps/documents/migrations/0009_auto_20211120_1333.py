# Generated by Django 3.1.2 on 2021-11-20 13:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0008_auto_20211120_1305'),
    ]

    operations = [
        migrations.AlterField(
            model_name='folder',
            name='parent_folder',
            field=models.ForeignKey(default='/', on_delete=django.db.models.deletion.CASCADE, to='documents.folder'),
        ),
    ]
