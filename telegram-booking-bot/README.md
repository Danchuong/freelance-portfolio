# Telegram Booking Bot

A Telegram bot for small businesses (salon, spa, clinic) that takes bookings in chat.
Built with **aiogram 3** and **SQLite**.

- Guided flow with reply keyboards: service, then date (next 7 days), then time slot, then name, then phone
- Input validation (unknown options are rejected, phone numbers are normalized)
- Double-booking protection: a taken service/date/time slot can't be booked again
- `/admin` lists all bookings (only for user IDs in `ADMIN_IDS`)
- `/cancel` aborts the flow at any step

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # put your BotFather token and your Telegram user ID in it
python bot.py
```

## Test

```bash
python -m py_compile bot.py handlers.py storage.py
pytest -q
```

The tests cover the SQLite store and the handlers (full booking flow, invalid input, taken slot, admin access) using aiogram's in-memory FSM storage, so no Telegram connection is needed.

## Files

| File | Purpose |
|---|---|
| `bot.py` | Entry point: reads env, wires the dispatcher, starts polling |
| `handlers.py` | Conversation states and handlers |
| `storage.py` | `BookingStore`, a thin SQLite wrapper |

## Sample output

```
User:  /start
Bot:   Hi! Which service would you like?   [Haircut] [Nail care] [Massage]
User:  Massage
Bot:   Pick a date:                         [2026-10-02] [2026-10-03] ...
User:  2026-10-02
Bot:   Pick a time:                         [09:00] [10:30] [13:00] [14:30] [16:00]
User:  10:30
Bot:   Your full name?
User:  Tran Thi B
Bot:   Your phone number?
User:  0987 654 321
Bot:   Booked! #1: Massage on 2026-10-02 at 10:30.
       Send /book to make another booking.

Admin: /admin
Bot:   1 booking(s):
       #1 2026-10-02 10:30 | Massage | Tran Thi B (0987654321)
```

```
$ pytest -q
.............                                                            [100%]
13 passed
```
