"""Booking conversation: service -> date -> time -> name -> phone -> confirm."""

import re
from datetime import date, timedelta

from aiogram import F, Router
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.types import KeyboardButton, Message, ReplyKeyboardMarkup, ReplyKeyboardRemove

from storage import Booking, BookingStore

SERVICES = ("Haircut", "Nail care", "Massage")
TIME_SLOTS = ("09:00", "10:30", "13:00", "14:30", "16:00")
BOOKING_DAYS = 7
PHONE_RE = re.compile(r"^\+?\d{9,12}$")

router = Router()


class BookingForm(StatesGroup):
    service = State()
    date = State()
    time = State()
    name = State()
    phone = State()


def keyboard(options: list[str] | tuple[str, ...], per_row: int = 3) -> ReplyKeyboardMarkup:
    rows = [
        [KeyboardButton(text=o) for o in options[i:i + per_row]]
        for i in range(0, len(options), per_row)
    ]
    return ReplyKeyboardMarkup(keyboard=rows, resize_keyboard=True, one_time_keyboard=True)


def available_dates(today: date | None = None) -> list[str]:
    start = today or date.today()
    return [(start + timedelta(days=i)).isoformat() for i in range(1, BOOKING_DAYS + 1)]


def normalize_phone(raw: str) -> str | None:
    cleaned = re.sub(r"[\s\-.()]", "", raw)
    return cleaned if PHONE_RE.match(cleaned) else None


def format_booking(b: Booking) -> str:
    return f"#{b.id} {b.date} {b.time} | {b.service} | {b.name} ({b.phone})"


@router.message(CommandStart())
@router.message(Command("book"))
async def start_booking(message: Message, state: FSMContext) -> None:
    await state.clear()
    await state.set_state(BookingForm.service)
    await message.answer("Hi! Which service would you like?", reply_markup=keyboard(SERVICES))


@router.message(Command("cancel"))
async def cancel(message: Message, state: FSMContext) -> None:
    await state.clear()
    await message.answer("Booking cancelled.", reply_markup=ReplyKeyboardRemove())


@router.message(Command("admin"))
async def admin_list(message: Message, store: BookingStore, admin_ids: frozenset[int]) -> None:
    if message.from_user.id not in admin_ids:
        await message.answer("Admins only.")
        return
    bookings = store.list_all()
    if not bookings:
        await message.answer("No bookings yet.")
        return
    lines = "\n".join(format_booking(b) for b in bookings)
    await message.answer(f"{len(bookings)} booking(s):\n{lines}")


@router.message(BookingForm.service)
async def pick_service(message: Message, state: FSMContext) -> None:
    if message.text not in SERVICES:
        await message.answer("Please choose a service from the keyboard.", reply_markup=keyboard(SERVICES))
        return
    await state.update_data(service=message.text)
    await state.set_state(BookingForm.date)
    await message.answer("Pick a date:", reply_markup=keyboard(available_dates(), per_row=2))


@router.message(BookingForm.date)
async def pick_date(message: Message, state: FSMContext) -> None:
    dates = available_dates()
    if message.text not in dates:
        await message.answer("Please choose a date from the keyboard.", reply_markup=keyboard(dates, per_row=2))
        return
    await state.update_data(date=message.text)
    await state.set_state(BookingForm.time)
    await message.answer("Pick a time:", reply_markup=keyboard(TIME_SLOTS))


@router.message(BookingForm.time)
async def pick_time(message: Message, state: FSMContext, store: BookingStore) -> None:
    data = await state.get_data()
    if message.text not in TIME_SLOTS:
        await message.answer("Please choose a time from the keyboard.", reply_markup=keyboard(TIME_SLOTS))
        return
    if store.is_taken(data["service"], data["date"], message.text):
        await message.answer("That slot is already booked. Pick another time.", reply_markup=keyboard(TIME_SLOTS))
        return
    await state.update_data(time=message.text)
    await state.set_state(BookingForm.name)
    await message.answer("Your full name?", reply_markup=ReplyKeyboardRemove())


@router.message(BookingForm.name, F.text)
async def enter_name(message: Message, state: FSMContext) -> None:
    name = message.text.strip()
    if not 2 <= len(name) <= 64:
        await message.answer("Name should be 2-64 characters.")
        return
    await state.update_data(name=name)
    await state.set_state(BookingForm.phone)
    await message.answer("Your phone number?")


@router.message(BookingForm.phone, F.text)
async def enter_phone(message: Message, state: FSMContext, store: BookingStore) -> None:
    phone = normalize_phone(message.text)
    if phone is None:
        await message.answer("That doesn't look like a phone number. Try e.g. 0912345678.")
        return
    data = await state.get_data()
    booking = Booking(
        user_id=message.from_user.id, service=data["service"], date=data["date"],
        time=data["time"], name=data["name"], phone=phone,
    )
    booking_id = store.add(booking)
    await state.clear()
    await message.answer(
        f"Booked! #{booking_id}: {booking.service} on {booking.date} at {booking.time}.\n"
        "Send /book to make another booking."
    )
