# API Integration Guide

## Overview
This application has been configured to fetch cricket player data from a backend API instead of using dummy data. The API integration is flexible and can easily be switched between development and production endpoints.

## Current Setup

### API Endpoint
- **Current Base URL**: `http://127.0.0.1:8000/api`
- **Endpoint Used**: `/players-by-category`
- **Full URL**: `http://127.0.0.1:8000/api/players-by-category`

## Expected API Response Format

```json
{
  "status": "success",
  "message": "Found 50 player(s) across 5 categor(ies)",
  "data": {
    "a+": [
      {
        "playerName": "Chetan kumar",
        "playerId": 12345,
        "category": "a+",
        "batting": {
          "sr": 153.83,
          "runs": 1729
        },
        "bowling": {
          "sr": 8.84,
          "wickets": 264
        }
      }
    ],
    "a": [...],
    "b": [...]
  }
}
```

## How to Change API Base URL

### For Development (Local Testing)

1. Open the `.env.local` file in the project root
2. Update the `VITE_API_BASE_URL` variable:

```env
# Current
VITE_API_BASE_URL=http://127.0.0.1:8000/api

# For a different development server
VITE_API_BASE_URL=http://localhost:3000/api
```

3. Save the file and restart the development server (`npm run dev` or `bun run dev`)

### For Production Deployment

1. Set the environment variable during build or deployment:

```bash
# Example: Using environment variable during build
VITE_API_BASE_URL=https://api.yourdomain.com/api npm run build

# Or update .env.production file
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

2. The application will use the production URL after deployment

## Files Modified/Created

### New Files
- **`src/config/api.ts`** - API configuration and endpoints
- **`src/services/playerService.ts`** - API service for fetching player data
- **`src/hooks/use-players-api.ts`** - React hook for API data fetching
- **`src/components/ApiPlayerRow.tsx`** - Component to display API player rows
- **`src/components/ApiPlayerCardItem.tsx`** - Component to display individual API player cards
- **`src/components/ApiPlayerCard.tsx`** - API player avatar component
- **`src/lib/avatar.ts`** - Utility functions for dummy avatar generation
- **`.env.example`** - Example environment configuration
- **`.env.local`** - Local environment configuration

### Modified Files
- **`src/pages/Index.tsx`** - Updated to fetch from API and display dynamic categories

## Features

### ✅ Dynamic Categories
The application now renders categories based on the API response. No need to hardcode section titles anymore.

### ✅ Dummy Avatars
Player avatars are automatically generated using [UI Avatars](https://ui-avatars.com/), a simple service that creates colorful avatars based on player names.

### ✅ Error Handling
- Shows error messages if the API fails
- Gracefully falls back to dummy data if needed
- Loading states while fetching data

### ✅ Configurable Endpoint
The API base URL can be changed via environment variables without modifying code.

## Player Data Structure

The new structure from the API is different from the old dummy data:

**Old Structure:**
```typescript
{
  id: string,
  name: string,
  role: "Batsman" | "Bowler" | "All-rounder" | "Wicket-keeper",
  stats: PlayerStats,
  ...
}
```

**New Structure (from API):**
```typescript
{
  playerName: string,
  playerId: number,
  category: string,
  batting: { sr: number, runs: number },
  bowling: { sr: number, wickets: number }
}
```

## Testing the API Integration

1. Make sure your backend is running on `http://127.0.0.1:8000`
2. Verify the endpoint `/api/players-by-category` returns data in the correct format
3. Start the development server: `bun run dev`
4. Check the browser console for any errors
5. The categories will be displayed dynamically based on the API response

## Fallback Behavior

If the API is not available:
- An error message will be displayed to users
- The app can gracefully fall back to dummy data
- The featured player section will still work using dummy data

## Adding Real Player Images

Currently, dummy avatars are generated automatically. To use real images:

1. Update your backend API response to include an `image` URL for each player
2. Modify `ApiPlayerCardItem.tsx` to use the image URL from the API response
3. The avatar component will automatically use the provided image instead of the dummy avatar

## Next Steps

1. ✅ Verify your backend API is ready with the correct endpoint
2. ✅ Test the API integration with sample data
3. ✅ Update the API endpoint in `.env.local` if needed
4. ✅ Deploy and update the production API URL in deployment configuration
