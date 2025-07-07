from fastapi_app.app.routes import API_PREFIX


class DocumentRoutes:
    BASE = f"{API_PREFIX}/documents"

    @staticmethod
    def upload_document() -> str:
        return f"{DocumentRoutes.BASE}/upload"
