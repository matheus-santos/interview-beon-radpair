from http import HTTPStatus

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from loguru import logger
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


from .app_initializer import initialize_data
from .router import api_router

origins = [
    "http://localhost",
    "http://localhost:3000",
]


def create_app() -> FastAPI:
    app = FastAPI(title="RadPair")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router)

    initialize_data()

    @app.exception_handler(RequestValidationError)
    async def custom_validation_exception_handler(request, e):
        exc_str = f"{e}".replace("\n", " ").replace("   ", " ")
        logger.warning(f"{request}: {exc_str}")
        content = {"message": exc_str, "data": None}
        return JSONResponse(content=content, status_code=HTTPStatus.UNPROCESSABLE_ENTITY)

    return app


app = create_app()
