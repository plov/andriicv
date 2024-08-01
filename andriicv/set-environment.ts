const fs = require('fs');
const path = require('path');

// List of environment variables that you want to replace
const envVariables = ['ACCESS_KEY', 'SECRET_KEY'];
const templateFilePath = path.join(__dirname, 'src/environments/environment.prod.template.ts');
const targetFilePath = path.join(__dirname, 'src/environments/environment.prod.ts');

let content = fs.readFileSync(templateFilePath, 'utf-8');

envVariables.forEach((variable) => {
    const value = process.env[variable];
    if (value === undefined) {
      console.warn(`Warning: Environment variable ${variable} is not defined.`);
    }
    const replacement = value ?? '';
    const placeholder = new RegExp(`\\$\\{${variable}\\}`, 'g');
    content = content.replace(placeholder, replacement);
  });
  

// Write the final content to environment.prod.ts
fs.writeFileSync(targetFilePath, content);

console.log(`Environment variables set in ${targetFilePath}`);