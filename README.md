<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1sYOEqedf3Lbu9w4DXeuTM8y0aIQF3zyR

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Google Cloud Run

**Prerequisites:** gcloud CLI, Google Cloud project with billing enabled.

1. Build the container image and push it to Google Container Registry:
   ```sh
   gcloud builds submit --tag gcr.io/PROJECT_ID/geobar
   ```
2. Deploy the container to Cloud Run:
   ```sh
   gcloud run deploy geobar \
     --image gcr.io/PROJECT_ID/geobar \
     --platform managed \
     --region REGION \
     --allow-unauthenticated \
     --set-env-vars GEMINI_API_KEY=YOUR_GEMINI_KEY
   ```
3. Visit the service URL output by the deploy command to use the app.

To test locally with Docker:
```sh
docker build -t geobar .
docker run -p 8080:8080 geobar
```
