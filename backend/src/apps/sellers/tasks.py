import csv
import logging
import os

from celery.contrib import rdb
from core.celery import app
from django.conf import settings
from django.contrib.contenttypes.models import ContentType

logger = logging.getLogger("seller.logging")


def get_columns_name(model):
    fields_set = set([f.name for f in model._meta.get_fields()])
    to_remove_set = {"id", "created", "modified"}
    fields_set = fields_set - to_remove_set
    return list(fields_set)


@app.task(name="Read and Save CSV file", bind=True)
def save_on_database_from_csv_file(self, file_name, model_name):
    model = ContentType.objects.get(model=model_name)
    model = model.model_class()
    file_name = settings.BASE_DIR.joinpath(file_name)
    with open(file_name, "r") as file:
        file_reader = csv.reader(file)
        for index, row in enumerate(file_reader):
            try:
                if index == 0:
                    columns = row
                    continue
                if len(columns) == len(row):
                    object_dict = dict(zip(columns, row))
                    model.objects.create(**object_dict)
                else:
                    logger.info(
                        {
                            "message": f"Line number {line} has not corresponding number of values to columns",
                            "line": index,
                            "value": row,
                        }
                    )
            except Exception as e:
                logger.warning(
                    {"exception": e, "file_line": index, "file_line_value": row}
                )
    os.remove(file_name)
    # send_email() envia email com as linhas e valores que deram erro
    return True
