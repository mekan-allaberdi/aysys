# Generated by Django 3.1.2 on 2021-11-17 12:34

import apps.documents.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0006_auto_20211014_0749'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='file',
            field=models.FileField(default='', upload_to=apps.documents.utils.docs_file_name),
        ),
    ]
