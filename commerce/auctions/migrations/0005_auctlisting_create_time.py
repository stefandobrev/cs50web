# Generated by Django 5.0.6 on 2024-08-05 09:34

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "auctions",
            "0004_alter_auctlisting_photo_url_alter_auctlisting_price_and_more",
        ),
    ]

    operations = [
        migrations.AddField(
            model_name="auctlisting",
            name="create_time",
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
