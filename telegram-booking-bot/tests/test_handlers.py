from collections.abc import Iterator
from datetime import date
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from aiogram.fsm.context import FSMContext
from aiogram.fsm.storage.base import StorageKey
from aiogram.fsm.storage.memory import MemoryStorage

import handlers
from handlers import BookingForm
from storage import Booking, BookingStore

ADMIN_ID = 42


def msg(text: str, user_id: int = 7) -> SimpleNamespace:
    return SimpleNamespace(text=text, from_user=SimpleNamespace(id=user_id), answer=AsyncMock())


def last_reply(m: SimpleNamespace) -> str:
    return m.answer.call_args.args[0]


@pytest.fixture
def state() -> FSMContext:
    return FSMContext(storage=MemoryStorage(), key=StorageKey(bot_id=1, chat_id=7, user_id=7))


@pytest.fixture
def store(tmp_path: Path) -> Iterator[BookingStore]:
    s = BookingStore(tmp_path / "t.db")
    yield s
    s.close()


def test_available_dates_starts_tomorrow() -> None:
    dates = handlers.available_dates(date(2026, 10, 1))
    assert dates[0] == "2026-10-02"
    assert len(dates) == handlers.BOOKING_DAYS


@pytest.mark.parametrize("raw,expected", [
    ("0912 345 678", "0912345678"),
    ("+84-912-345-678", "+84912345678"),
    ("abc", None),
    ("123", None),
])
def test_normalize_phone(raw: str, expected: str | None) -> None:
    assert handlers.normalize_phone(raw) == expected


async def test_full_booking_flow(state: FSMContext, store: BookingStore) -> None:
    day = handlers.available_dates()[0]
    await handlers.start_booking(msg("/start"), state)
    assert await state.get_state() == BookingForm.service.state

    await handlers.pick_service(msg("Massage"), state)
    await handlers.pick_date(msg(day), state)
    await handlers.pick_time(msg("10:30"), state, store)
    await handlers.enter_name(msg("Tran Thi B"), state)
    final = msg("0987 654 321")
    await handlers.enter_phone(final, state, store)

    assert await state.get_state() is None
    assert "Booked!" in last_reply(final)
    [saved] = store.list_all()
    assert (saved.service, saved.date, saved.time, saved.phone) == ("Massage", day, "10:30", "0987654321")


async def test_invalid_service_keeps_state(state: FSMContext) -> None:
    await state.set_state(BookingForm.service)
    m = msg("Tattoo")
    await handlers.pick_service(m, state)
    assert await state.get_state() == BookingForm.service.state
    assert "choose a service" in last_reply(m)


async def test_taken_slot_is_rejected(state: FSMContext, store: BookingStore) -> None:
    day = handlers.available_dates()[0]
    store.add(Booking(user_id=1, service="Haircut", date=day, time="09:00", name="X Y", phone="0912345678"))
    await state.set_state(BookingForm.time)
    await state.update_data(service="Haircut", date=day)
    m = msg("09:00")
    await handlers.pick_time(m, state, store)
    assert "already booked" in last_reply(m)
    assert await state.get_state() == BookingForm.time.state


async def test_admin_lists_bookings(store: BookingStore) -> None:
    store.add(Booking(user_id=1, service="Haircut", date="2026-10-02", time="09:00", name="A B", phone="0912345678"))
    m = msg("/admin", user_id=ADMIN_ID)
    await handlers.admin_list(m, store, frozenset({ADMIN_ID}))
    assert "1 booking(s)" in last_reply(m)
    assert "Haircut" in last_reply(m)


async def test_admin_rejects_non_admin(store: BookingStore) -> None:
    m = msg("/admin", user_id=999)
    await handlers.admin_list(m, store, frozenset({ADMIN_ID}))
    assert last_reply(m) == "Admins only."
