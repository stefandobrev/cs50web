# Generated by Django 5.0.6 on 2024-08-11 12:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("auctions", "0009_bids"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="bids",
            options={"verbose_name": "Bid", "verbose_name_plural": "Bids"},
        ),
    ]
