from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "RevenuePilot"

    GEMINI_API_KEY: str = ""

    RAZORPAY_KEY_ID: str = ""
    RAZORPAY_KEY_SECRET: str = ""

    DATABASE_URL: str = ""

    class Config:
        env_file = ".env"


settings = Settings()