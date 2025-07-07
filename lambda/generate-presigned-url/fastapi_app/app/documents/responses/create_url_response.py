from dataclasses import dataclass
from pydantic import BaseModel


@dataclass
class CreateUrlResponse(BaseModel):
    uploadUrl: str