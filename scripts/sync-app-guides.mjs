import fs from 'fs';
import { newToolsData } from './new-tools-data.mjs';

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Update first guidesList (url format)
const firstListEntry = '{ id: "payment-guide", title: "Payment & Activation Guide", url: "guides/payment-guide.html" }';
const newEntriesList1 = newToolsData.map(t => 
  `    { id: "${t.id}", title: "${t.h1}", url: "guides/${t.fileName}" }`
).join(',\n');

if (appJs.includes(firstListEntry)) {
  const replacement1 = firstListEntry + ',\n' + newEntriesList1;
  appJs = appJs.replace(firstListEntry, replacement1);
  console.log('Updated first guidesList in app.js');
} else {
  console.error('firstListEntry target not found in app.js');
}

// 2. Update second guidesList (fileName + description format)
const secondListEntry = '{ id: "payment-guide", fileName: "payment-guide.html", title: "OmniTool Hub Payment & PRO Activation Guide", description: "Learn how to activate lifetime PRO access, configure Razorpay, PayPal, or Stripe, and verify zero-fee licensing." }';
const newEntriesList2 = newToolsData.map(t => 
  `    { id: "${t.id}", fileName: "${t.fileName}", title: "${t.title.replace(' | OmniTool Hub', '')}", description: "${t.description.replace(/"/g, '\\"')}" }`
).join(',\n');

if (appJs.includes(secondListEntry)) {
  const replacement2 = secondListEntry + ',\n' + newEntriesList2;
  appJs = appJs.replace(secondListEntry, replacement2);
  console.log('Updated second guidesList in app.js');
} else {
  console.error('secondListEntry target not found in app.js');
}

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('Successfully synced all new guides into app.js!');

