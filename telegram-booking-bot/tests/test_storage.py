from pathlib import Path

from storage import Booking, BookingStore


def make(**overrides: object) -> Booking:
    base = dict(user_id=1, service="Haircut", date="2026-10-02", time="09:00",
                name="Nguyen Van A", phone="0912345678")
    return Booking(**{**base, **overrides})


def test_add_and_list_sorted(tmp_path: Path) -> None:
    store = BookingStore(tmp_path / "t.db")
    store.add(make(date="2026-10-03"))
    first_id = store.add(make(date="2026-10-02", time="13:00"))
    rows = store.list_all()
    assert [r.date for r in rows] == ["2026-10-02", "2026-10-03"]
    assert rows[0].id == first_id
    store.close()


def test_is_taken(tmp_path: Path) -> None:
    store = BookingStore(tmp_path / "t.db")
    assert not store.is_taken("Haircut", "2026-10-02", "09:00")
    store.add(make())
    assert store.is_taken("Haircut", "2026-10-02", "09:00")
    assert not store.is_taken("Massage", "2026-10-02", "09:00")
    store.close()


def test_persists_across_connections(tmp_path: Path) -> None:
    path = tmp_path / "t.db"
    BookingStore(path).add(make())
    assert len(BookingStore(path).list_all()) == 1
