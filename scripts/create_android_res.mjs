import fs from 'fs';
import path from 'path';

const resDir = 'omnitool-android-app/app/src/main/res';

// 1. values/colors.xml
const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="brand_bg">#0C0A1C</color>
    <color name="brand_primary">#8A2BE2</color>
    <color name="brand_accent">#00F0FF</color>
    <color name="brand_magenta">#FF007A</color>
</resources>
`;
fs.writeFileSync(path.join(resDir, 'values/colors.xml'), colorsXml, 'utf8');

// 2. drawable directories
const drawableDir = path.join(resDir, 'drawable');
if (!fs.existsSync(drawableDir)) fs.mkdirSync(drawableDir, { recursive: true });

// drawable/ic_launcher_background.xml
const backgroundXml = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#0C0A1C"
        android:pathData="M0,0h108v108h-108z" />
    <path
        android:fillColor="#171333"
        android:pathData="M0,0L108,108L0,108Z" />
</vector>
`;
fs.writeFileSync(path.join(drawableDir, 'ic_launcher_background.xml'), backgroundXml, 'utf8');

// drawable/ic_launcher_foreground.xml
const foregroundXml = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <!-- Centered Glow & Icon: Scale 24x24 box by 2.2 to fit safe zone (27..81) -->
    <group
        android:scaleX="2.2"
        android:scaleY="2.2"
        android:translateX="27.6"
        android:translateY="27.6">
        <path
            android:fillColor="#00000000"
            android:strokeColor="#FF007A"
            android:strokeWidth="2.5"
            android:strokeLineCap="round"
            android:strokeLineJoin="round"
            android:pathData="M9.813,15.904 L9,21 L14.907,18 M21,3 L13.882,10.118 M3,21 L10.118,13.882 M10.118,10.118 L13.882,13.882 M10.118,10.118 L3,3 M13.882,10.118 L21,21" />
    </group>
</vector>
`;
fs.writeFileSync(path.join(drawableDir, 'ic_launcher_foreground.xml'), foregroundXml, 'utf8');

// 3. mipmap-anydpi-v26 directories
const mipmapDir = path.join(resDir, 'mipmap-anydpi-v26');
if (!fs.existsSync(mipmapDir)) fs.mkdirSync(mipmapDir, { recursive: true });

// mipmap-anydpi-v26/ic_launcher.xml
const launcherXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@drawable/ic_launcher_foreground" />
</adaptive-icon>
`;
fs.writeFileSync(path.join(mipmapDir, 'ic_launcher.xml'), launcherXml, 'utf8');
fs.writeFileSync(path.join(mipmapDir, 'ic_launcher_round.xml'), launcherXml, 'utf8');

console.log('Successfully created all Android launcher drawables and mipmaps!');

