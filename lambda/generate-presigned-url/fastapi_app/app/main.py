from fastapi import FastAPI

from fastapi_app.app.documents.routes.documents_route import documents_router

app = FastAPI()
app.include_router(documents_router, prefix="/documents")
