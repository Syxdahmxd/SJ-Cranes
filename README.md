# SJ Cranes Services

Responsive crane rental and heavy-lifting website.

## Frontend
This is a lightweight static website, ready for GitHub Pages or any static host.

1. Open `index.html` locally to preview, or publish the repository with GitHub Pages.
2. Update contact details in `assets/js/main.js` if needed.
3. The quote form prepares an enquiry and offers WhatsApp/email actions. It does not store enquiries unless the optional backend is configured.

## Optional FastAPI + MongoDB backend
The `backend/` folder contains the API for saving quote enquiries. Configure `MONGO_URL` and `DB_NAME` in `backend/.env`, then run:

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload
```

Set `API_URL` in `assets/js/main.js` to the backend URL if you want the form to save enquiries.

## GitHub Pages
Push the repository contents to GitHub. In the repository, open **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
