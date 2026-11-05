import fs from 'fs';

const file = 'omnitool-android-app/app/src/main/java/com/omnitool/hub/ui/screens/DashboardScreen.kt';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('Search 16+ utilities...', 'Search 45+ utilities...');
content = content.replace('"text" to "Text"', '"text" to "Text & PDF"');
content = content.replace('"design" to "Design"', '"design" to "Design & Media"');
content = content.replace('"math" to "Math"', '"math" to "Math & Calc"');
content = content.replace('"text" -> "📝 Text Utilities"', '"text" -> "📝 Text & PDF Utilities"');
content = content.replace('"design" -> "🎨 Design Utilities"', '"design" -> "🎨 Design & Media Utilities"');
content = content.replace('else -> "📐 Math & Conversion"', 'else -> "📐 Math & Calculation Utilities"');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated DashboardScreen.kt');

