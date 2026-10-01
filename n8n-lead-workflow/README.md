# n8n Lead Workflow

An importable [n8n](https://n8n.io) workflow that captures leads from a website form, scores them with an LLM, logs them to Google Sheets and pings the sales team on Telegram.

```
Webhook (POST /lead-form)
  -> Normalize lead      (trim and lowercase the fields, add a timestamp)
  -> AI classify lead    (OpenAI chat completions over HTTP, JSON mode: hot / warm / cold + reason)
  -> Merge AI result     (Code node, with a safe fallback if the AI reply can't be parsed)
  -> Append to Google Sheet
  -> Notify on Telegram
```

The AI step runs **before** the Sheets and Telegram steps, so the quality score is saved in the sheet and shown in the alert.

## Setup

1. In n8n: **Workflows -> Import from File** and pick `lead-workflow.json`.
2. Create three credentials and select them on the matching nodes. The JSON only has placeholders (`REPLACE_WITH_...`).
   - **Header Auth** for OpenAI: name `Authorization`, value `Bearer <your key>`
   - **Google Sheets OAuth2**. Then set the sheet ID and make a `Leads` tab with the header row `submitted_at, name, email, phone, budget, message, quality, ai_reason`.
   - **Telegram API** (bot token). Then set your chat ID on the Telegram node.
3. Activate the workflow and point your form at the production webhook URL.

To use Claude instead, change the HTTP node URL to `https://api.anthropic.com/v1/messages`, add the `x-api-key` and `anthropic-version` headers, and read `content[0].text` in the Code node.

## Validate

```bash
python validate.py   # JSON parses, every connection points to a real node, no orphan nodes, no secrets
```

## Sample output

Test request:

```bash
curl -X POST https://<your-n8n>/webhook/lead-form \
  -H 'Content-Type: application/json' \
  -d '{"name":"Le Van C","email":"C@Shop.vn","phone":"0909123456","budget":"$1500","message":"Need a Telegram order bot for my shop before Tet"}'
```

Telegram alert:

```
🔥 New lead: HOT
Name: Le Van C
Email: c@shop.vn
Phone: 0909123456
Budget: $1500
Message: Need a Telegram order bot for my shop before Tet

AI: Clear need, stated budget and a concrete deadline.
```

New row in the sheet:

| submitted_at | name | email | phone | budget | message | quality | ai_reason |
|---|---|---|---|---|---|---|---|
| 2026-10-01T16:50:00.000+07:00 | Le Van C | c@shop.vn | 0909123456 | $1500 | Need a Telegram order bot... | hot | Clear need, stated budget and a concrete deadline. |

```
$ python validate.py
OK
```
