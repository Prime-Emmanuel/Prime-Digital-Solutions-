const fs = require('fs');
const https = require('https');

https.get('https://i.ibb.co/383LZ6G/IMG-0609.png', (resp) => {
    let data = [];
    resp.on('data', (chunk) => {
        data.push(chunk);
    });
    resp.on('end', () => {
        const buffer = Buffer.concat(data);
        const base64 = buffer.toString('base64');
        fs.writeFileSync('src/logoBase64.ts', `export const logoBase64 = "data:image/png;base64,${base64}";\n`);
        console.log('done');
    });
});
