from pydantic import BaseModel


class UploadModel(BaseModel):
    fileName: str
    fileType: str
