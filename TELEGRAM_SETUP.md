# 📱 Telegram Notifications Setup Guide

## Overview
Your Strategic Cockpit now includes **intelligent Telegram notifications** that monitor all 6 key metrics and send alerts when ANY metric changes.

---

## 🎯 What Gets Monitored

The system tracks these 6 strategic metrics:
1. **US 10Y Yield** - The macro ceiling
2. **Fed Net Liquidity** - Market fuel level
3. **Bitcoin Price** - Crypto market leader
4. **Stablecoin Market Cap** - Capital readiness
5. **USDT Dominance** - Fear gauge
6. **RWA Onchain Value** - Institutional adoption

**Alert Trigger:** Notification sent if **ANY** metric changes from previous run.

---

## 📋 Setup Steps

### Step 1: Create a Telegram Bot

1. **Open Telegram** and search for `@BotFather`
2. **Start a chat** and send `/newbot`
3. **Follow prompts**:
   - Bot name: `Strategic Cockpit Bot` (or anything you like)
   - Bot username: Must end with `bot` (e.g., `strategic_cockpit_bot`)
4. **Copy the token** (looks like: `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

### Step 2: Get Your Chat ID

**Option A - Using @userinfobot:**
1. Search for `@userinfobot` in Telegram
2. Start a chat
3. It will display your Chat ID (e.g., `123456789`)

**Option B - Using your bot:**
1. Start a chat with your new bot
2. Send any message to it
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for `"chat":{"id":123456789}` in the JSON response

### Step 3: Add Secrets to GitHub

1. Go to: https://github.com/KenHuang21/strategic-cockpit-dashboard/settings/secrets/actions
2. Click **"New repository secret"**
3. Add **TWO** secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `TELEGRAM_BOT_TOKEN` | Your bot token from Step 1 | `123456:ABC-DEF1234...` |
| `TELEGRAM_CHAT_ID` | Your chat ID from Step 2 | `123456789` |

### Step 4: Update GitHub Actions Workflow

The workflow file `.github/workflows/update_data.yml` needs to include the Telegram secrets.

Add these environment variables to the "Run data fetch script" step:

```yaml
- name: Run data fetch script
  env:
    FRED_API_KEY: ${{ secrets.FRED_API_KEY }}
    TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
    TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
  run: |
    python fetch_metrics.py
```

### Step 5: Test Locally (Optional)

```bash
# Set environment variables
export TELEGRAM_BOT_TOKEN="your_token_here"
export TELEGRAM_CHAT_ID="your_chat_id_here"

# Run the script
python3 fetch_metrics.py
```

---

## 📨 Notification Format

When metrics change, you'll receive a beautifully formatted message:

```
🚨 Strategic Cockpit Update

Macro (The Ceiling)
🏛️ US 10Y: 4.15%
💧 Liquidity: $5,680,347B

Market (The Floor)
₿ BTC: $86,578
🌊 Stablecoins: $308.5B

Alpha Signals
😨 USDT Dom: 6.21%
🏦 RWA TVL: $17.91B

Status: ✅ RISK ON
```

---

## 🔄 How It Works

### Smart Change Detection

```
1. GitHub Actions runs every 15 minutes
   ↓
2. Python script fetches fresh data
   ↓
3. Compares with previous dashboard_data.json
   ↓
4. If ANY of the 6 metrics changed:
   → Formats HTML message
   → Sends to your Telegram
   ↓
5. Updates dashboard_data.json
   ↓
6. Commits to GitHub → Vercel deploys
```

### What Triggers Notifications?

✅ **YES - Notify:**
- US 10Y changes from 4.15% to 4.20%
- Bitcoin price moves by any amount
- Stablecoin market cap changes
- Any single metric updates

❌ **NO - Skip:**
- All 6 metrics identical to previous run
- No data (prevents spam on errors)

---

## 🛠️ Troubleshooting

### "Telegram credentials not configured"
**Problem:** Environment variables not set.
**Fix:** Ensure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are in GitHub Secrets.

### Bot doesn't respond
**Problem:** Bot needs to be "started" first.
**Fix:** Open chat with your bot and press "Start" or send `/start`.

### "Chat not found" error
**Problem:** Incorrect Chat ID or bot never messaged.
**Fix:** 
1. Send a message to your bot first
2. Verify Chat ID using `getUpdates` method (see Step 2)

### Notifications too frequent
**Problem:** Data changes every 15 minutes.
**Solution:** This is expected! Each metric update triggers a notification. If too noisy, consider:
- Increasing cron interval (e.g., every 30 minutes)
- Adding threshold logic (only notify if change > X%)

### No notifications even when data changes
**Checklist:**
1. ✅ Bot token is correct
2. ✅ Chat ID is correct
3. ✅ Secrets added to GitHub Actions
4. ✅ Workflow includes Telegram env vars
5. ✅ You've started the bot chat

---

## 🎨 Customizing Notifications

### Change the Message Format

Edit `format_telegram_message()` in `fetch_metrics.py`:

```python
def format_telegram_message(self, data: Dict[str, Any]) -> str:
    # Modify the message template here
    message = f"""Your custom format..."""
    return message
```

### Add Emoji Indicators

Example: Different emoji based on metric direction:
```python
btc_emoji = "🟢" if new_btc > old_btc else "🔴"
message = f"{btc_emoji} <b>BTC:</b> ${btc_price}"
```

### Filter Specific Metrics

To only notify on specific metrics, edit `tracked_metrics` in `check_metrics_changed()`:

```python
# Only track Bitcoin and US 10Y
tracked_metrics = [
    'us_10y_yield',
    'bitcoin_price'
]
```

---

## 🔐 Security Best Practices

✅ **DO:**
- Store credentials in GitHub Secrets (never in code)
- Use a dedicated bot for your dashboard
- Keep bot token private

❌ **DON'T:**
- Commit bot tokens to Git
- Share bot token publicly
- Use personal Telegram account as bot

---

## 📊 Testing Your Setup

### Test 1: Manual Run with Telegram

```bash
export TELEGRAM_BOT_TOKEN="your_token"
export TELEGRAM_CHAT_ID="your_chat_id"
python3 fetch_metrics.py
```

Expected output:
```
📊 Metrics changed: us_10y_yield, bitcoin_price, ...
✅ Telegram notification sent successfully
```

### Test 2: Force a Notification

Delete `dashboard_data.json` and run:
```bash
rm dashboard_data.json
python3 fetch_metrics.py
```

This triggers "first run" notification with all metrics.

### Test 3: GitHub Actions

1. Manually trigger workflow: Actions → Update Dashboard Data → Run workflow
2. Check workflow logs for "Telegram notification sent"
3. Verify message received on Telegram

---

## 🎯 Expected Behavior

| Scenario | Notification? | Why |
|----------|--------------|-----|
| First run (no old data) | ✅ Yes | All metrics are "new" |
| All metrics unchanged | ❌ No | No changes detected |
| Bitcoin price changes | ✅ Yes | 1 metric changed |
| 3+ metrics change | ✅ Yes | Any change triggers alert |
| Fetch fails | ❌ No | No valid data to compare |

---

## 📚 Additional Resources

- **Telegram Bot API**: https://core.telegram.org/bots/api
- **BotFather Commands**: https://core.telegram.org/bots#botfather
- **HTML Formatting**: https://core.telegram.org/bots/api#html-style

---

## 🚀 Next Steps

After setup:
1. ✅ Bot created and token saved
2. ✅ Chat ID obtained
3. ✅ GitHub Secrets configured
4. ✅ Workflow updated with env vars
5. ✅ Test notification received

Your Strategic Cockpit will now ping you on Telegram whenever market conditions shift! 🎉
