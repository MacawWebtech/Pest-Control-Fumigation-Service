# Defendra – Backend & Third-Party Integration Guide

This guide outlines how to integrate the static HTML5 templates of **Defendra** with live backends, form handling services, CRM workflows, and third-party APIs.

---

## 1. Static Template Disclaimer & Honesty

> **Notice:** By default, all forms, calculators, and the 6-step inspection wizard in Defendra execute client-side JavaScript simulations. Submitted data is validated on the client, demonstrated with loading spinners, feedback alerts, and stored in browser `localStorage` or `sessionStorage`.
>
> In a production deployment, you must wire these forms to a secure backend endpoint or serverless form handler. Never expose private API keys, database credentials, or secret webhooks in client-side JavaScript.

---

## 2. Wiring Forms to a Backend

Defendra includes two primary forms:
1. **General Contact & Inquiry Form** (`contact.html`, `about.html`, `service-details.html`)
2. **6-Step Multi-Step Inspection Request Wizard** (`inspection-booking.html`)

### A. Serverless Form Providers (Zero-Backend Setup)

If you do not want to manage a server, you can use services such as Formspree, Netlify Forms, or Getform.

#### Formspree Integration Example:
1. Register at [formspree.io](https://formspree.io) and create a new form endpoint.
2. In `contact.html`, update the `<form>` tag:
```html
<form action="https://formspree.io/f/{YOUR_FORM_ID}" method="POST" class="defendra-form">
  <input type="text" name="full_name" required>
  <input type="email" name="email" required>
  <input type="tel" name="phone" required>
  <textarea name="message" required></textarea>
  <button type="submit" class="btn btn-primary">Send Inquiry</button>
</form>
```
3. Disable the simulated event listener in `assets/js/forms.js` or modify it to send a standard `fetch()` POST request:
```javascript
const response = await fetch(form.action, {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
});
if (response.ok) {
  // Show success toast
}
```

#### Netlify Forms Integration:
Add the `data-netlify="true"` attribute to any form:
```html
<form name="inspection-requests" method="POST" data-netlify="true" class="defendra-form">
  <!-- Hidden input for Netlify bot protection -->
  <input type="hidden" name="form-name" value="inspection-requests">
  ...
</form>
```

---

## 3. Inspection Booking Wizard Payload & Custom API Endpoint

The 6-step booking wizard in `assets/js/inspection.js` collects comprehensive inspection parameters:

```json
{
  "booking_id": "STK-2026-84912",
  "pest_type": "termites",
  "premise_type": "residential_villa",
  "square_footage": 2400,
  "severity_level": "moderate",
  "preferred_date": "2026-12-05",
  "preferred_slot": "morning_09_12",
  "contact": {
    "full_name": "James Wilson",
    "phone": "+91 98765 43210",
    "email": "arjun.sharma@example.com",
    "service_address": "Flat 402, Green Crest Heights, Powai",
    "city": "Los Angeles",
    "pincode": "400076",
    "notes": "Evidence of mud tubes along baseboard in master bedroom."
  },
  "estimate_range": {
    "min_inr": 7200,
    "max_inr": 11500,
    "currency": "INR",
    "is_estimate": true
  },
  "created_at": "2026-11-23T11:20:00Z"
}
```

### Node.js / Express Backend Example

Create an endpoint to receive the wizard payload and send email notifications via Nodemailer or SendGrid:

```javascript
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

app.use(cors());
app.use(express.json());

app.post('/api/inspection-request', upload.single('evidence_file'), async (req, res) => {
  try {
    const bookingData = JSON.parse(req.body.payload || '{}');
    const uploadedFile = req.file;

    // 1. Save booking to database (e.g. PostgreSQL / MongoDB)
    // 2. Trigger SMS notification to client via Twilio / Fast2SMS
    // 3. Dispatch lead to internal CRM (Zoho / HubSpot / Salesforce)
    
    return res.status(200).json({
      success: true,
      booking_id: bookingData.booking_id,
      message: 'Inspection request received successfully. Field coordinator will contact within 2 hours.'
    });
  } catch (error) {
    console.error('Booking submission error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(5000, () => console.log('Defendra API Server running on port 5000'));
```

---

## 4. CRM & Webhook Automation (Zapier / Make / Zoho)

You can automatically dispatch leads captured from `contact.html` and `inspection-booking.html` into your CRM:
1. In Zapier or Make.com, create a **Catch Hook** trigger.
2. In `assets/js/forms.js` or `assets/js/inspection.js`, point the submission fetch call to your Zapier webhook URL:
```javascript
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/{USER_ID}/{HOOK_ID}/';

fetch(ZAPIER_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```
3. Connect the trigger to actions such as:
   - Create Deal / Lead in **HubSpot / Zoho CRM / Salesforce**
   - Send SMS notification to regional technician via **Twilio**
   - Add calendar inspection event in **Google Calendar**
   - Post lead alert to company **Slack / Microsoft Teams** channel

---

## 5. Replacing Map Placeholders with Live Google Maps or Leaflet

The template currently uses high-resolution industrial SVG vector schematics for regional coverage in `areas-served.html` and `contact.html`.

### Option A: Google Maps Embed (No JavaScript needed)
Replace the SVG container with an embedded Google Maps iframe:
```html
<div class="map-container">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160999907!2d72.741099!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
    width="100%"
    height="450"
    style="border:0; filter: grayscale(100%) invert(92%) contrast(83%);"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">
  </iframe>
</div>
```
*(Tip: The CSS filter above tints the map to match Defendra's dark charcoal industrial palette).*

### Option B: OpenStreetMap with Leaflet.js (Free & Open Source)
1. Add Leaflet CSS and JS to `<head>`:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
```
2. Initialize map with custom dark industrial tiles:
```javascript
const map = L.map('map-wrapper').setView([19.0760, 72.8777], 11);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
}).addTo(map);

// Add custom marker
const marker = L.marker([19.0760, 72.8777]).addTo(map);
marker.bindPopup('<b>Defendra Central Dispatch Hub</b><br>Wilshire Boulevard, Los Angeles');
```

---

## 6. Security & Best Practices Checklist

- [ ] **CSRF Protection:** Ensure your backend generates and validates Anti-CSRF tokens for all state-changing POST/PUT requests.
- [ ] **File Upload Sanitization:** When accepting inspection evidence files (photos/PDFs), validate MIME types server-side (`image/jpeg`, `image/png`, `application/pdf`) and store uploads in cloud object storage (e.g., AWS S3, Cloudflare R2) rather than web-accessible local folders.
- [ ] **Honeypot Anti-Spam:** Add an invisible honeypot field to forms (`<input type="text" name="_hp_company" style="display:none" tabindex="-1" autocomplete="off">`) and drop submissions if this field is populated by bots.
- [ ] **Rate Limiting:** Protect your endpoints with IP-based rate limiting (e.g. maximum 5 inspection requests per IP per 10 minutes).
- [ ] **Sanitization:** Strip dangerous HTML or script tags from user comments and addresses before rendering them in administrative emails or databases.
