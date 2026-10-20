const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetDir = path.resolve(__dirname, 'assets', 'documents');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const finalPdfNamed = path.join(targetDir, 'Sunrise-Staffing-Solutions-Company-Profile.pdf');
const finalPdfAlias = path.join(targetDir, 'company-profile.pdf');
const templateUrl = 'http://127.0.0.1:3000/company-profile-template.html';

const args = [
    '--headless',
    '--disable-gpu',
    '--run-all-compositor-stages-before-draw',
    `--print-to-pdf=${finalPdfNamed}`,
    '--no-margins',
    templateUrl
];

console.log('Rendering 10-page Corporate Company Profile PDF via Edge headless...');
execFile(edgePath, args, (err, stdout, stderr) => {
    if (err) {
        console.error('Error generating PDF:', err);
        process.exit(1);
    }
    if (fs.existsSync(finalPdfNamed)) {
        const stats = fs.statSync(finalPdfNamed);
        console.log(`Success! Created: ${finalPdfNamed} (${stats.size} bytes)`);
        
        // Also copy to company-profile.pdf alias
        fs.copyFileSync(finalPdfNamed, finalPdfAlias);
        console.log(`Copied alias: ${finalPdfAlias}`);
    } else {
        console.error('Failed to create PDF file.');
        process.exit(1);
    }
});
