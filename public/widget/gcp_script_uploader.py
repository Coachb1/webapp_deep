from google.cloud import storage
import os
from pathlib import Path
import time

# def make_blob_public(bucket_name, blob_name):
#     """Makes a blob publicly accessible."""
#     # bucket_name = "your-bucket-name"
#     # blob_name = "your-object-name"

#     storage_client = storage.Client()
#     bucket = storage_client.bucket(bucket_name)
#     blob = bucket.blob(blob_name)

#     blob.make_public()

#     print(
#         f"Blob {blob.name} is publicly accessible at {blob.public_url}"
#     )



def upload_to_gcs(bucket_name, source_file_path, destination_blob_name, credentials_file):
    # os.chdir(f"{Path(__file__).resolve().parent}")
    # Initialize the Google Cloud Storage client with the credentials
    storage_client = storage.Client.from_service_account_json(credentials_file)

    # Get the target bucket
    bucket = storage_client.bucket(bucket_name)

    # Upload the file to the bucket
    blob = bucket.blob(destination_blob_name)

    # delete existing file if exists
    if blob.exists():
        blob.delete()
        print(f"Blob {blob.name} deleted")
    
    blob.upload_from_filename(source_file_path, )

    print(f"File {source_file_path} uploaded to gs://{bucket_name}/{destination_blob_name}")

    blob.make_public()
    print(f"Blob {blob.name} is publicly accessible at {blob.public_url}")

if __name__ == "__main__":
    # Replace the following variables with your specific values
    BUCKET_NAME = "coachbots-simulator"
    SOURCE_FILE_PATHS = ["coachbots-widget.js", "coachbots-widget-stt.js"]
    # DESTINATION_BLOB_NAME = "coachbots-widget.js"
    CREDENTIALS_FILE = "./uploader_helper.json"

    for SOURCE_FILE_PATH in SOURCE_FILE_PATHS:
        DESTINATION_BLOB_NAME = SOURCE_FILE_PATH
        upload_to_gcs(BUCKET_NAME, SOURCE_FILE_PATH, DESTINATION_BLOB_NAME, CREDENTIALS_FILE)
