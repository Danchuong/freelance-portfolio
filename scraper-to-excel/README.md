# Scraper to Excel

Scrapes book listings from [books.toscrape.com](https://books.toscrape.com), a sandbox site made for scraping practice, and exports a clean **CSV** and a formatted **XLSX** (bold header, frozen first row, filters, currency format).

- Follows the "next" link for pagination, with a page limit
- Retries with backoff on 429/5xx errors (`urllib3.Retry`) and a short delay between pages
- Parses title, price, star rating, stock status and absolute product URL
- Typed `Book` dataclass, with output written by `csv` and `openpyxl`

## Run

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python scraper.py --pages 5 --out output     # 5 pages x 20 = 100 books
pytest -q
```

The parser test uses a saved copy of page 1 (`tests/fixtures/page-1.html`), so it runs offline.

## Sample output

Real run output is in [`output/books.csv`](output/books.csv) and [`output/books.xlsx`](output/books.xlsx) (100 rows).

```
$ python scraper.py --pages 5
page 1: 20 books (total 20)
page 2: 20 books (total 40)
page 3: 20 books (total 60)
page 4: 20 books (total 80)
page 5: 20 books (total 100)
saved 100 rows to output/books.csv and books.xlsx
```

```csv
title,price_gbp,rating,in_stock,url
A Light in the Attic,51.77,3,True,https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html
Tipping the Velvet,53.74,1,True,https://books.toscrape.com/catalogue/tipping-the-velvet_999/index.html
Soumission,50.1,1,True,https://books.toscrape.com/catalogue/soumission_998/index.html
```
