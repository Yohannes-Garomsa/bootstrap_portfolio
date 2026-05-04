# Deployment Notes

## Render or Railway

Set these environment variables in your deployment dashboard:

- `NODE_ENV=production`
- `PORT=5000`
- `CLIENT_URL=https://your-portfolio-domain.com`
- `CLIENT_URLS=https://your-portfolio-domain.com`
- `MONGODB_URI=your-mongodb-connection-string`
- `SMTP_HOST=your-smtp-host`
- `SMTP_PORT=587`
- `SMTP_SECURE=false`
- `SMTP_USER=your-smtp-username`
- `SMTP_PASS=your-smtp-password`
- `MAIL_FROM=Portfolio Contact <your-email@example.com>`
- `CONTACT_RECEIVER_EMAIL=your-email@example.com`

## Start Command

```bash
npm start
```

## Health Check

Use this endpoint for platform health checks:

```text
/api/health
```
