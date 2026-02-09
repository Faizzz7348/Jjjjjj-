# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this PWA, please send an email to [your-email@example.com].

Please include the following information:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We take all security reports seriously and will respond within 48 hours.

## Security Features

This PWA implements several security best practices:

### HTTPS Only
- PWA requires HTTPS in production
- Service Workers only work over HTTPS

### Content Security Policy
- Implement CSP headers in production
- Restrict inline scripts and styles
- Whitelist trusted sources

### Secure Headers
Add these headers in production:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Data Storage
- Sensitive data should NOT be stored in:
  - LocalStorage
  - SessionStorage
  - IndexedDB (unencrypted)
  - Service Worker caches

- Use proper authentication tokens
- Implement token rotation
- Clear data on logout

### Service Worker Security
- Validate all cached responses
- Implement cache versioning
- Clear old caches regularly
- Validate network requests

### Push Notifications
- Use VAPID keys for push notifications
- Never send sensitive data via push
- Implement proper user consent flow

## Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` for reference
   - Rotate secrets regularly

2. **Dependencies**
   - Run `npm audit` regularly
   - Keep dependencies up to date
   - Review dependency licenses

3. **Code Review**
   - Review all PRs for security issues
   - Use linting tools
   - Run security scans

4. **Production Deployment**
   - Use environment-specific configs
   - Enable all security headers
   - Monitor for unusual activity

## Updates

We will notify users of security updates through:
- GitHub Security Advisories
- Release notes
- Email notifications (if available)

## Contact

For security concerns, contact: [your-email@example.com]
