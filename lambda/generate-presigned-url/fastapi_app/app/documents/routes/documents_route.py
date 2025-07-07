from fastapi import APIRouter, HTTPException

from fastapi_app.app.documents.models.upload_model import UploadModel
from fastapi_app.app.documents.responses.create_url_response import CreateUrlResponse
from fastapi_app.app.documents.routes.routes import DocumentRoutes
from fastapi_app.app.shared.services.s3_services import generate_presigned_url

documents_router = APIRouter()

@documents_router.post(DocumentRoutes.upload_document())
def create_url(req: UploadModel) -> CreateUrlResponse:
    try:
        return CreateUrlResponse(uploadUrl=generate_presigned_url(req.fileName, req.fileType))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
