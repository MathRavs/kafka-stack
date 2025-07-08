import os
from fastapi import FastAPI

from fastapi_app.app.documents.routes.documents_route import documents_router

app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    root_path=f"/{os.getenv("STAGE_NAME", "Dev")}"
)
app.include_router(documents_router, prefix="/documents")
