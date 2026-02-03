# CLAUDE.md - AI Assistant Guide for famlysite

## Project Overview

This is a Hebrew family website ("משפחת חן" - Chen Family) with a Flask backend API and static HTML/CSS/JS frontend. The site features password-protected access and a news/article system.

## Tech Stack

- **Backend**: Python Flask with CORS support
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Deployment**: Render.com using Gunicorn
- **Language/Locale**: Hebrew (RTL - right-to-left)

## Project Structure

```
famlysite/
├── app.py              # Flask backend API server
├── index.html          # Main landing page (news/articles)
├── password.html       # Login/password verification page
├── script.js           # Frontend JavaScript (password check, news functions)
├── style.css           # Main site styling
├── styleforpass.css    # Password page specific styling
├── me.jpg              # Profile/avatar image
├── sea.jpg             # Background image
├── requirements.txt    # Python dependencies
└── Procfile            # Render deployment configuration
```

## Architecture

### Backend (app.py)

- Flask server with CORS enabled for all origins
- Single API endpoint: `POST /check` for password verification
- Returns JSON responses: `{"message": "ok you in"}` or `{"message": "this is the wrong password"}`
- Runs on port 5000 locally

### Frontend

- **index.html**: Main page with navigation, news articles container, and dynamic article addition
- **password.html**: Login form that validates against the Flask backend
- **script.js**: Contains `addNews()` for dynamic content and `checkPassword()` for authentication
- Backend API URL: `https://famlysite-2.onrender.com/check`

## Development Workflow

### Running Locally

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the Flask server:
   ```bash
   python app.py
   ```
   Server runs at `http://localhost:5000`

3. For frontend, open HTML files directly in browser or use a local server

### Deployment

- Deployed on Render.com
- Uses Gunicorn as WSGI server (configured in Procfile)
- Push to main branch triggers deployment

## Key Conventions

### Code Style

- **HTML**: Hebrew content with `dir="rtl"` and `lang="he"` attributes
- **CSS**: Uses rgba backgrounds for transparency over background images
- **JavaScript**: Async/await pattern for API calls, ES6+ syntax
- **Python**: Standard Flask patterns, simple route handlers

### Naming Conventions

- CSS files: lowercase with descriptive names (`style.css`, `styleforpass.css`)
- HTML pages: lowercase, descriptive (`password.html`, `index.html`)
- JavaScript functions: camelCase (`checkPassword`, `addNews`)

### UI/UX Patterns

- Background image (sea.jpg) used across pages
- Semi-transparent overlays for readability
- Consistent color scheme: yellow (#ffeb3b) for headings, green (#4CAF50) for buttons
- Circular profile image in header

## Important Notes for AI Assistants

1. **RTL Support**: All content is in Hebrew. Maintain `dir="rtl"` and `lang="he"` attributes
2. **CORS**: Backend allows all origins - be mindful of security implications
3. **API URL**: Frontend hardcodes the Render deployment URL - update if backend URL changes
4. **No Build Process**: Static files served directly, no bundler or transpilation
5. **Navigation**: Links to `about.html`, `forum.html`, `school.html` exist in nav but pages may not be implemented yet

## Dependencies

### Python (requirements.txt)
- flask
- gunicorn
- flask-cors

### Frontend
- No external dependencies (vanilla JS/CSS)

## Common Tasks

### Adding a New Page

1. Create new `.html` file with RTL support
2. Link to `style.css` or create page-specific CSS
3. Add navigation link in `index.html` nav section
4. Include `script.js` if JavaScript functionality needed

### Modifying API

1. Edit `app.py` to add/modify routes
2. Update `script.js` if frontend needs to call new endpoints
3. Test locally before deploying

### Styling Changes

- `style.css`: Main site styles (header, nav, articles, buttons)
- `styleforpass.css`: Login page specific styles
- Both use the same background image (sea.jpg)
