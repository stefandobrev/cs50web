# Generated by Django 5.0.6 on 2024-07-20 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("flights", "0003_passanger"),
    ]

    operations = [
        migrations.CreateModel(
            name="Passenger",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first", models.CharField(max_length=64)),
                ("last", models.CharField(max_length=64)),
                (
                    "fligts",
                    models.ManyToManyField(
                        blank=True, related_name="passengers", to="flights.flight"
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="Passanger",
        ),
    ]
