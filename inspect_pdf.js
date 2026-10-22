const fs = require('fs');

const pdfPath = 'assets/documents/Sunrise-Staffing-Solutions-Company-Profile.pdf';
const buf = fs.readFileSync(pdfPath);

console.log('PDF File exists, Size:', buf.length, 'bytes');
console.log('PDF Header:', buf.toString('utf8', 0, 8));

// Count /Type /Page objects in raw PDF
const text = buf.toString('latin1');
const pageMatches = text.match(/\/Type\s*\/Page\b/g);
console.log('Detected Page Count:', pageMatches ? pageMatches.length : 'unknown');

// Check key terms in PDF stream
const checks = [
    'SUNRISE STAFFING SOLUTIONS',
    'Kiran Panchpute',
    'Staff Management',
    'Security Management',
    'Driver Management',
    'Guest House Facility',
    'Housekeeping',
    'Labour Contracts',
    'Job Work',
    'Forklift Services',
    'Skoda Auto Volkswagen',
    'Mercedes-Benz',
    'Envision Energy',
    'POSCO',
    '2024',
    '2023',
    '2021',
    '2018',
    '2014',
    '2013'
];

checks.forEach(term => {
    const found = text.includes(term);
    console.log(`Checking '${term}': ${found ? 'FOUND' : 'NOT FOUND'}`);
});
