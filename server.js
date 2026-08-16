const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Mock Insurance Data
const insurancePolicies = [
  {
    id: 1,
    name: 'Tata AIG Health Insurance',
    type: 'Health Insurance',
    coverage: '₹25,00,000',
    premium: '₹5,999/month',
    features: ['Hospital coverage', 'Outpatient treatment', 'Dental care', 'Wellness programs'],
    rating: 4.6,
    company: 'Tata AIG'
  },
  {
    id: 2,
    name: 'Future Generali Life',
    type: 'Life Insurance',
    coverage: '₹50,00,000',
    premium: '₹3,999/month',
    features: ['Term coverage', 'Family protection', '24/7 claim support', 'Accidental death benefit'],
    rating: 4.7,
    company: 'Future Generali'
  },
  {
    id: 3,
    name: 'Bajaj Allianz Car Insurance',
    type: 'Car Insurance',
    coverage: '₹75,00,000',
    premium: '₹4,500/month',
    features: ['Third-party liability', 'Collision coverage', 'Theft protection', 'Roadside assistance'],
    rating: 4.5,
    company: 'Bajaj Allianz'
  },
  {
    id: 4,
    name: 'HDFC Ergo Home Insurance',
    type: 'Home Insurance',
    coverage: '₹25,00,000',
    premium: '₹3,500/month',
    features: ['Fire protection', 'Theft coverage', 'Natural disaster', 'Earthquake coverage'],
    rating: 4.6,
    company: 'HDFC Ergo'
  },
  {
    id: 5,
    name: 'ICICI Lombard Travel',
    type: 'Travel Insurance',
    coverage: '₹25,00,000',
    premium: '₹799/trip',
    features: ['Medical coverage abroad', 'Flight delay', 'Baggage loss', 'Trip cancellation'],
    rating: 4.4,
    company: 'ICICI Lombard'
  },
  {
    id: 6,
    name: 'SBI Life Insurance',
    type: 'Life Insurance',
    coverage: '₹1,00,00,000',
    premium: '₹4,999/month',
    features: ['Life protection', 'Investment plans', 'Maturity benefits', 'Loan facility'],
    rating: 4.8,
    company: 'SBI Life'
  },
  {
    id: 7,
    name: 'Reliance Health Insurance',
    type: 'Health Insurance',
    coverage: '₹50,00,000',
    premium: '₹7,999/month',
    features: ['Hospital coverage', 'Pre & post hospitalization', 'Preventive care', 'Mental health'],
    rating: 4.5,
    company: 'Reliance'
  },
  {
    id: 8,
    name: 'Aditya Birla Health',
    type: 'Health Insurance',
    coverage: '₹35,00,000',
    premium: '₹5,499/month',
    features: ['Cashless treatment', 'Network hospitals', 'Family coverage', 'Seasonal health'],
    rating: 4.7,
    company: 'Aditya Birla'
  },
  {
    id: 9,
    name: 'Max Life Insurance',
    type: 'Life Insurance',
    coverage: '₹75,00,000',
    premium: '₹4,499/month',
    features: ['Full life protection', 'Investment returns', 'Flexible options', 'Quick claim'],
    rating: 4.6,
    company: 'Max Life'
  },
  {
    id: 10,
    name: 'Cholamandalam Car Insurance',
    type: 'Car Insurance',
    coverage: '₹1,00,00,000',
    premium: '₹3,999/month',
    features: ['Comprehensive coverage', 'Personal accident', 'Breakdown assistance', 'Spare parts'],
    rating: 4.4,
    company: 'Cholamandalam'
  }
];

// Store inquiries
let inquiries = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/policies', (req, res) => {
  res.json(insurancePolicies);
});

app.get('/api/policies/:id', (req, res) => {
  const policy = insurancePolicies.find(p => p.id === parseInt(req.params.id));
  if (policy) {
    res.json(policy);
  } else {
    res.status(404).json({ error: 'Policy not found' });
  }
});

app.get('/api/search', (req, res) => {
  const type = req.query.type;
  if (type) {
    const filtered = insurancePolicies.filter(p => 
      p.type.toLowerCase().includes(type.toLowerCase())
    );
    res.json(filtered);
  } else {
    res.json(insurancePolicies);
  }
});

app.post('/api/inquiries', (req, res) => {
  const { name, email, phone, policyType, message } = req.body;
  
  if (!name || !email || !policyType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const inquiry = {
    id: inquiries.length + 1,
    name,
    email,
    phone,
    policyType,
    message,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };

  inquiries.push(inquiry);
  console.log('New inquiry:', inquiry);
  
  res.status(201).json({ 
    success: true, 
    message: 'Your inquiry has been received. We will contact you soon!',
    inquiry 
  });
});

app.get('/api/admin/inquiries', (req, res) => {
  res.json(inquiries);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Insurance website running on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop');
});
