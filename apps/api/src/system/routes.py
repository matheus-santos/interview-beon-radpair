from fastapi import APIRouter

router = APIRouter(tags=["System"])


@router.get("/")
def root():
    return {"message": "I am alive!"}


@router.get("/health")
def health():
    return True
