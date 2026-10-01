"""SQLite storage for bookings."""

import sqlite3
from dataclasses import dataclass
from pathlib import Path

SCHEMA = """
CREATE TABLE IF NOT EXISTS bookings (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    service    TEXT    NOT NULL,
    date       TEXT    NOT NULL,
    time       TEXT    NOT NULL,
    name       TEXT    NOT NULL,
    phone      TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
"""


@dataclass(frozen=True)
class Booking:
    user_id: int
    service: str
    date: str
    time: str
    name: str
    phone: str
    id: int | None = None


class BookingStore:
    def __init__(self, path: str | Path) -> None:
        self._conn = sqlite3.connect(str(path))
        self._conn.execute(SCHEMA)
        self._conn.commit()

    def add(self, booking: Booking) -> int:
        cur = self._conn.execute(
            "INSERT INTO bookings (user_id, service, date, time, name, phone) "
            "VALUES (?, ?, ?, ?, ?, ?)",
            (booking.user_id, booking.service, booking.date, booking.time,
             booking.name, booking.phone),
        )
        self._conn.commit()
        return int(cur.lastrowid)

    def is_taken(self, service: str, date: str, time: str) -> bool:
        row = self._conn.execute(
            "SELECT 1 FROM bookings WHERE service = ? AND date = ? AND time = ?",
            (service, date, time),
        ).fetchone()
        return row is not None

    def list_all(self, limit: int = 50) -> list[Booking]:
        rows = self._conn.execute(
            "SELECT id, user_id, service, date, time, name, phone FROM bookings "
            "ORDER BY date, time LIMIT ?",
            (limit,),
        ).fetchall()
        return [
            Booking(id=r[0], user_id=r[1], service=r[2], date=r[3], time=r[4],
                    name=r[5], phone=r[6])
            for r in rows
        ]

    def close(self) -> None:
        self._conn.close()
