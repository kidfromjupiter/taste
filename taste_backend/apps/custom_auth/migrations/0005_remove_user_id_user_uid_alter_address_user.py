# Generated by Django 4.1.5 on 2023-02-19 15:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('custom_auth', '0004_address'),
    ]

    operations = [
       
        migrations.AddField(
            model_name='user',
            name='uid',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=254, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='address',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
