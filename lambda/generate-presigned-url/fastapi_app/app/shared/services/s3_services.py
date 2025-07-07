import os
import boto3

s3 = boto3.client("s3")
BUCKET = os.getenv("UPLOAD_BUCKET", "default-bucket")


def generate_presigned_url(filename: str, content_type: str) -> str:
    return s3.generate_presigned_url(
        "put_object",
        Params={"Bucket": BUCKET, "Key": filename, "ContentType": content_type},
        ExpiresIn=60,
    )
