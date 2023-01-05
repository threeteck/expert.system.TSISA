from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import entries, variables, diagnosis, rules

app = FastAPI(
    title="Expert System",
    description="Expert System for the diagnosis",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(entries.router, prefix="/entries", tags=["entries"])
app.include_router(variables.router, prefix="/variables", tags=["variables"])
app.include_router(diagnosis.router, prefix="/diagnoses", tags=["diagnoses"])
app.include_router(rules.router, prefix="/rules", tags=["rules"])
