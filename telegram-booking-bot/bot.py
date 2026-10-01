"""Entry point: python bot.py"""

import asyncio
import logging
import os

from aiogram import Bot, Dispatcher
from dotenv import load_dotenv

from handlers import router
from storage import BookingStore


def parse_admin_ids(raw: str) -> frozenset[int]:
    return frozenset(int(x) for x in raw.split(",") if x.strip().isdigit())


async def main() -> None:
    load_dotenv()
    token = os.environ.get("BOT_TOKEN")
    if not token:
        raise SystemExit("BOT_TOKEN is not set. Copy .env.example to .env and fill it in.")

    store = BookingStore(os.environ.get("DB_PATH", "bookings.db"))
    dp = Dispatcher(store=store, admin_ids=parse_admin_ids(os.environ.get("ADMIN_IDS", "")))
    dp.include_router(router)
    bot = Bot(token)
    try:
        await dp.start_polling(bot)
    finally:
        store.close()
        await bot.session.close()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())
