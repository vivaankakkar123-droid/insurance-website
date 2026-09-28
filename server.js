const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

const EMAIL = 'insurancebuzzz@gmail.com';
const EMAIL_PASSWORD = 'kxgq cyra myal kkxa';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL, pass: EMAIL_PASSWORD }
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));const insurancePolicies = [
  { id: 1, name: 'Tata AIG Health Insurance', type: 'Health Insurance', coverage: '₹25,00,000', premium: '₹5,999/month', features: ['Hospital coverage', 'Outpatient treatment', 'Dental care', 'Wellness programs'], rating: 4.6, company: 'Tata AIG' },
  { id: 2, name: 'Future Generali Life', type: 'Life Insurance', coverage: '₹50,00,000', premium: '₹3,999/month', features: ['Term coverage', 'Family protection', '24/7 claim support', 'Accidental death benefit'], rating: 4.7, company: 'Future Generali' },
  { id: 3, name: 'Bajaj Allianz Car Insurance', type: 'Car Insurance', coverage: '₹75,00,000', premium: '₹4,500/month', features: ['Third-party liability', 'Collision coverage', 'Theft protection', 'Roadside assistance'], rating: 4.5, company: 'Bajaj Allianz' },
  { id: 4, name: 'HDFC Ergo Home Insurance', type: 'Home Insurance', coverage: '₹25,00,000', premium: '₹3,500/month', features: ['Fire protection', 'Theft coverage', 'Natural disaster', 'Earthquake coverage'], rating: 4.6, company: 'HDFC Ergo' },
  { id: 5, name: 'ICICI Lombard Travel', type: 'Travel Insurance', coverage: '₹25,00,000', premium: '₹799/trip', features: ['Medical coverage abroad', 'Flight delay', 'Baggage loss', 'Trip cancellation'], rating: 4.4, company: 'ICICI Lombard' },
  { id: 6, name: 'SBI Life Insurance', type: 'Life Insurance', coverage: '₹1,00,00,000', premium: '₹4,999/month', features: ['Life protection', 'Investment plans', 'Maturity benefits', 'Loan facility'], rating: 4.8, company: 'SBI Life' }
];

let inquiries = [];
let companies = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/api/policies', (req, res) => res.json(companies.length > 0 ? companies : insurancePolicies));
app.get('/api/companies', (req, res) => res.json(companies));

app.post('/api/companies', (req, res) => {
  const company = { id: Date.now(), ...req.body, company: req.body.name };
  companies.push(company);
  res.status(201).json(company);
});

app.put('/api/companies/:id', (req, res) => {
  const c = companies.find(x => x.id == req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  Object.assign(c, req.body);
  res.json(c);
});

app.delete('/api/companies/:id', (req, res) => {
  companies = companies.filter(x => x.id != req.params.id);
  res.json({ success: true });
});

app.get('/api/admin/inquiries', (req, res) => res.json(inquiries));

app.post('/api/inquiries', (req, res) => {
  const inquiry = { id: inquiries.length + 1, ...req.body, createdAt: new Date().toISOString() };
  inquiries.push(inquiry);
  res.status(201).json({ success: true, inquiry });
});

app.listen(PORT, () => console.log('Running on http://localhost:' + PORT));