# 🔄 Manual Refresh Feature - Setup Guide

## Overview
The manual refresh feature allows you to trigger an immediate data update by calling the GitHub Actions workflow via API.

---

## 📋 Setup Instructions

### Step 1: Create GitHub Personal Access Token (PAT)

1. **Go to GitHub Settings**:
   - Visit: https://github.com/settings/tokens
   - Or navigate: GitHub Profile → Settings → Developer settings → Personal access tokens → Fine-grained tokens

2. **Click "Generate new token" → "Generate new token (fine-grained)"**

3. **Configure the token**:
   - **Token name**: `Strategic Cockpit Manual Refresh`
   - **Expiration**: 90 days (or longer)
   - **Repository access**: Select "Only select repositories" → Choose `strategic-cockpit-dashboard`
   
4. **Set Permissions**:
   - Scroll to **Repository permissions**
   - Find **Actions** → Set to **Read and write**
   - This grants the `workflow_dispatch` permission

5. **Generate token**:
   - Click **"Generate token"**
   - 🚨 **IMPORTANT**: Copy the token immediately! You won't see it again.

### Step 2: Add Environment Variables

#### For Local Development:

Create `.env.local` in your dashboard folder:

\`\`\`bash
# GitHub Configuration for Manual Refresh
GITHUB_PAT=github_pat_XXXXXXXXXXXXXXXXXXXX
REPO_OWNER=KenHuang21
REPO_NAME=strategic-cockpit-dashboard
\`\`\`

#### For Vercel Production:

1. Go to: https://vercel.com/[your-project]/settings/environment-variables
2. Add these variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `GITHUB_PAT` | `github_pat_XXXX...` | Production, Preview, Development |
| `REPO_OWNER` | `KenHuang21` | Production, Preview, Development |
| `REPO_NAME` | `strategic-cockpit-dashboard` | Production, Preview, Development |

3. **Redeploy** your site for changes to take effect

---

## 🎯 How It Works

### User Journey:
1. CEO sees stale data during market volatility
2. Clicks **"Refresh"** button in dashboard header
3. Button shows loading state ("Requesting...")
4. API calls GitHub to trigger `update_data.yml` workflow
5. GitHub Actions runs Python script to fetch fresh data
6. Data commits to repo → Vercel auto-deploys
7. Dashboard updates in ~2 minutes

### Technical Flow:
\`\`\`
User Click → RefreshButton.tsx
           ↓
    POST /api/trigger-update
           ↓
    POST https://api.github.com/.../actions/workflows/update_data.yml/dispatches
           ↓
    GitHub Actions runs fetch_metrics.py
           ↓
    Commits dashboard_data.json
           ↓
    Vercel detects commit → Redeploys
           ↓
    Fresh data live! 🎉
\`\`\`

---

## 🛡️ Safety Features

- **60-second cooldown**: Prevents spam/abuse
- **Loading states**: Clear visual feedback
- **Error handling**: Shows user-friendly error messages
- **Rate limiting**: GitHub Actions has built-in rate limits

---

## 🧪 Testing

### Local Testing:
\`\`\`bash
# 1. Add GITHUB_PAT to .env.local
# 2. Start dev server
npm run dev

# 3. Open dashboard and click Refresh button
# 4. Check terminal for API logs
# 5. Check GitHub Actions: https://github.com/KenHuang21/strategic-cockpit-dashboard/actions
\`\`\`

### Production Testing:
1. Deploy to Vercel
2. Ensure environment variables are set
3. Click Refresh button on live site
4. Monitor:
   - Network tab (should see `/api/trigger-update` request)
   - GitHub Actions page (new workflow run should appear)
   - Commit history (automated commit after ~60-90 seconds)

---

## ❌ Troubleshooting

### "GitHub PAT not configured" error
**Fix**: Add `GITHUB_PAT` environment variable in Vercel

### "Permission denied" or "Resource not accessible"
**Fix**: Ensure your PAT has `Actions: Read and write` permission

### "Workflow not found"
**Fix**: Verify workflow file is named exactly `update_data.yml`

### Button doesn't respond
**Fix**: Check browser console for errors. Ensure API route is accessible.

### Workflow triggered but fails
**Fix**: Check the workflow run logs in GitHub Actions. Common issues:
- Missing `FRED_API_KEY` secret in GitHub
- API rate limits exceeded

---

## 🔐 Security Notes

- ✅ PAT is server-side only (never exposed to browser)
- ✅ No CORS issues (API route is same-origin)
- ✅ Vercel environment variables are encrypted
- ⚠️ Don't commit `.env.local` to git
- ⚠️ Rotate PAT if exposed

---

## 📚 References

- GitHub API Docs: https://docs.github.com/en/rest/actions/workflows#create-a-workflow-dispatch-event
- Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Vercel Environment Variables: https://vercel.com/docs/concepts/projects/environment-variables
