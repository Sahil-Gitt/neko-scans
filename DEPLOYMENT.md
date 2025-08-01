# Railway Deployment Guide for Neko Scans

## Prerequisites
- GitHub account with your code pushed
- Railway account (railway.app)

## Step-by-Step Deployment

### 1. Prepare Your Repository
Make sure your code is pushed to GitHub with all the recent changes.

### 2. Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `neko-scans` repository

### 3. Add PostgreSQL Database
1. In your Railway project dashboard
2. Click "New" → "Database" → "Add PostgreSQL"
3. Railway will automatically provide `DATABASE_URL` environment variable

### 4. Configure Environment Variables
In Railway dashboard, go to your app → Variables tab and add:

```
NEXTAUTH_SECRET=your-long-random-secret-here
NEXTAUTH_URL=https://your-app-name.up.railway.app
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

**Note:** `DATABASE_URL` is automatically provided by Railway's PostgreSQL service.

### 5. Generate NextAuth Secret
Run this command locally to generate a secure secret:
```bash
openssl rand -base64 32
```
Copy the output and use it as your `NEXTAUTH_SECRET`.

### 6. Set up UploadThing (for file uploads)
1. Go to [uploadthing.com](https://uploadthing.com)
2. Create an account and get your API keys
3. Add them to Railway environment variables

### 7. Deploy
Railway will automatically deploy when you push to your main branch.

## Post-Deployment
1. Your app will be available at `https://your-app-name.up.railway.app`
2. Database migrations will run automatically
3. Check the deployment logs for any issues

## Environment Variables Reference
- `DATABASE_URL` - Provided automatically by Railway PostgreSQL
- `NEXTAUTH_SECRET` - Random string for NextAuth security
- `NEXTAUTH_URL` - Your Railway app URL
- `UPLOADTHING_SECRET` - UploadThing API secret
- `UPLOADTHING_APP_ID` - UploadThing application ID

## Troubleshooting
- Check Railway logs for deployment errors
- Ensure all environment variables are set
- Verify your GitHub repository is connected
- Make sure Prisma migrations are working

## Custom Domain (Optional)
1. In Railway dashboard → Settings → Domains
2. Add your custom domain
3. Update `NEXTAUTH_URL` to your custom domain
