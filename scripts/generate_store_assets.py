import os
from PIL import Image, ImageDraw, ImageOps

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ICON_SRC = os.path.join(BASE_DIR, 'social_media_assets', 'omnitool_icon_512x512.png')
BANNER_SRC = os.path.join(BASE_DIR, 'social_media_assets', 'opengraph_landscape_1200x630.png')
STORE_ASSETS_DIR = os.path.join(BASE_DIR, 'omnitool-android-app', 'store_assets')
RES_DIR = os.path.join(BASE_DIR, 'omnitool-android-app', 'app', 'src', 'main', 'res')

os.makedirs(STORE_ASSETS_DIR, exist_ok=True)

# 1. Create Google Play & Amazon 512x512 Icon
icon_img = Image.open(ICON_SRC).convert('RGBA')
icon_512 = icon_img.resize((512, 512), Image.Resampling.LANCZOS)
icon_512_path = os.path.join(STORE_ASSETS_DIR, 'icon_512x512.png')
icon_512.save(icon_512_path, format='PNG', optimize=True)
print(f"Generated: {icon_512_path}")

# 2. Create Amazon 114x114 Small Icon
icon_114 = icon_img.resize((114, 114), Image.Resampling.LANCZOS)
icon_114_path = os.path.join(STORE_ASSETS_DIR, 'icon_114x114.png')
icon_114.save(icon_114_path, format='PNG', optimize=True)
print(f"Generated: {icon_114_path}")

# 3. Create Google Play & Amazon 1024x500 Feature Graphic
banner_img = Image.open(BANNER_SRC).convert('RGB')
# Fit and crop precisely into 1024x500
feature_graphic = ImageOps.fit(banner_img, (1024, 500), method=Image.Resampling.LANCZOS)
fg_path = os.path.join(STORE_ASSETS_DIR, 'feature_graphic_1024x500.png')
feature_graphic.save(fg_path, format='PNG', optimize=True)
print(f"Generated: {fg_path}")

# 4. Create Amazon 1280x720 Promotional Banner
banner_1280 = ImageOps.fit(banner_img, (1280, 720), method=Image.Resampling.LANCZOS)
banner_1280_path = os.path.join(STORE_ASSETS_DIR, 'banner_1280x720.png')
banner_1280.save(banner_1280_path, format='PNG', optimize=True)
print(f"Generated: {banner_1280_path}")

# 5. Generate Android App Mipmaps (both square and round)
densities = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
    'mipmap-xxxhdpi': 192
}

def make_round(img):
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
    rounded = img.copy()
    rounded.putalpha(mask)
    return rounded

for folder, size in densities.items():
    target_dir = os.path.join(RES_DIR, folder)
    os.makedirs(target_dir, exist_ok=True)

    # Square icon
    resized = icon_img.resize((size, size), Image.Resampling.LANCZOS)
    resized.save(os.path.join(target_dir, 'ic_launcher.png'), format='PNG', optimize=True)

    # Round icon
    round_resized = make_round(resized)
    round_resized.save(os.path.join(target_dir, 'ic_launcher_round.png'), format='PNG', optimize=True)
    print(f"Generated {folder}: ic_launcher.png and ic_launcher_round.png ({size}x{size})")

print("All Android app store assets and mipmaps generated successfully!")
