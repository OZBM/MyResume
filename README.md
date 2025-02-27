# Omar Ben Mustapha's Resume Website

A personal resume website built with Next.js, React, and TailwindCSS, featuring an AI chatbot powered by Google's Gemini AI.

## Features

- Modern, responsive design
- AI-powered chatbot that answers questions about my professional experience
- Optimized for deployment on Cloudflare Pages

## Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## Deployment to Cloudflare from GitHub

This project is set up for deployment on Cloudflare Pages directly from GitHub. Follow these steps to deploy:

### 1. Push Your Code to GitHub

Make sure your code is pushed to a GitHub repository:

```bash
# Initialize git repository if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/yourrepository.git

# Push to GitHub
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Sign in to your Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Pages** from the sidebar
3. Click **Create a project** > **Connect to Git**
4. Select your GitHub account and authorize Cloudflare
5. Select the repository you pushed your code to

### 3. Configure Your Build Settings

Configure the build settings as follows:

- **Project name**: Choose a name for your project (e.g., `omar-resume`)
- **Production branch**: `main` (or your default branch)
- **Framework preset**: Next.js
- **Build command**: `npm run deploy:build`
- **Build output directory**: `.open-next/assets`
- **Root directory**: `/` (root of your project)

### 4. Add Environment Variables

Add the following environment variables:

- `GEMINI_API_KEY`: Your Google Gemini API key

### 5. Deploy

Click **Save and Deploy**. Cloudflare will build and deploy your site. Once the deployment is complete, you'll get a URL to access your site (e.g., `https://yourproject.pages.dev`).

### 6. Configure Custom Domain (Optional)

To use a custom domain:

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name and follow the instructions

### 7. Automatic Deployments

After setup, any push to your main branch will trigger an automatic deployment to Cloudflare Pages.

## Manual Deployment

If you need to deploy manually from your local machine:

```bash
# Build the project for deployment
npm run deploy:build

# Deploy to Cloudflare (requires Cloudflare CLI setup)
npm run deploy:publish
```

Note: For manual deployment, you need to have the Cloudflare Wrangler CLI authenticated with your account.

## Environment Variables

- `GEMINI_API_KEY`: Required for the chatbot functionality. Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

Create a `.env.local` file with your API key to enable the chatbot locally:

```
GEMINI_API_KEY=your_api_key_here
