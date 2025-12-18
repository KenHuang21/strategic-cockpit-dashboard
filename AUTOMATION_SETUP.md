# 🤖 Automated Data Updates Setup

Your Strategic Cockpit dashboard now has **automated data updates** every 15 minutes!

## 🚀 Quick Setup (5 minutes)

### Step 1: Add FRED API Key to GitHub Secrets

1. Go to your repository: https://github.com/KenHuang21/strategic-cockpit-dashboard/settings/secrets/actions
2. Click **"New repository secret"**
3. Add:
   - **Name**: `FRED_API_KEY`
   - **Value**: Your API key from https://fredaccount.stlouisfed.org/apikeys

### Step 2: Enable Workflow Permissions

1. Go to: https://github.com/KenHuang21/strategic-cockpit-dashboard/settings/actions
2. Scroll to **"Workflow permissions"**
3. Select **"Read and write permissions"**
4. Click **"Save"**

### Step 3: Push This Workflow

The workflow file is already created at `.github/workflows/update_data.yml`.
Just commit and push it to activate!

## ✅ What Happens Next

1. **Every 15 minutes**: GitHub Actions runs `fetch_metrics.py`
2. **Data Updates**: Fresh metrics from FRED, CoinGecko, DefiLlama
3. **Auto-Commit**: If data changed, commits to `main` branch
4. **Vercel Deploy**: Triggers automatic redeployment
5. **Live Dashboard**: Your dashboard always shows fresh data! 🎉

## 🎯 Manual Trigger (for testing)

1. Go to https://github.com/KenHuang21/strategic-cockpit-dashboard/actions
2. Click **"Update Dashboard Data"**
3. Click **"Run workflow"**
4. Select `main` branch
5. Click **"Run workflow"**

## 📊 Monitoring

### View Workflow Runs
https://github.com/KenHuang21/strategic-cockpit-dashboard/actions/workflows/update_data.yml

### Check Latest Data Update
Look for commits with message: `data: auto-update [timestamp]`

## 🛠️ Troubleshooting

### "Permission denied" error
- Make sure workflow permissions are set to "Read and write" (Step 2 above)

### "FRED_API_KEY not found" error
- Verify the secret is added correctly (Step 1 above)
- Name must be exactly `FRED_API_KEY`

### Workflow not running
- GitHub disables cron jobs in inactive repos
- Solution: Make any commit or manually trigger once

### Want to change update frequency?

Edit `.github/workflows/update_data.yml`:
```yaml
schedule:
  # Every 30 minutes
  - cron: '*/30 * * * *'
  
  # Every hour
  - cron: '0 * * * *'
```

## 🎓 Learn More

- Workflow file: `.github/workflows/update_data.yml`
- Data script: `fetch_metrics.py`
- Requirements: `requirements.txt`

---

**Questions?** Check the Actions logs for detailed error messages.
