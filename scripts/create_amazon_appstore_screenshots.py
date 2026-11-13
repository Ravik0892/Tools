import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCREENSHOTS_DIR = os.path.join(BASE_DIR, 'omnitool-android-app', 'store_assets', 'screenshots')
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

# Sources
sources = [
    {
        'file': 'raw_dashboard_1080x1920.png',
        'title': '50+ Offline Developer Tools',
        'subtitle': 'Zero server tracking, 100% private, works completely offline',
        'out_phone': 'phone_screenshot_01_dashboard.png',
        'out_tablet': 'tablet_screenshot_01_dashboard.png'
    },
    {
        'file': 'raw_pdf_suite_1080x1920.png',
        'title': 'Complete Private PDF Studio',
        'subtitle': 'Split, merge, reorder, sign, and convert documents locally',
        'out_phone': 'phone_screenshot_02_pdf_studio.png',
        'out_tablet': 'tablet_screenshot_02_pdf_studio.png'
    },
    {
        'file': 'raw_pipeline_1080x1920.png',
        'title': 'Smart Chain Pipeline Builder',
        'subtitle': 'Visual multi-step data transformation workflows',
        'out_phone': 'phone_screenshot_03_pipeline_builder.png',
        'out_tablet': 'tablet_screenshot_03_pipeline_builder.png'
    },
    {
        'file': 'raw_datetime_1080x1920.png',
        'title': 'Precision Date & Time Math',
        'subtitle': 'Unix epochs, durations, and dynamic date math arithmetic',
        'out_phone': 'phone_screenshot_04_datetime_calculator.png',
        'out_tablet': 'tablet_screenshot_04_datetime_calculator.png'
    },
    {
        'file': 'raw_tool_1_1080x1920.png',
        'title': 'Formatters & Encoders Hub',
        'subtitle': 'JSON, Base64, Hex, URL, JWT, and cryptography utilities',
        'out_phone': 'phone_screenshot_05_developer_suites.png',
        'out_tablet': 'tablet_screenshot_05_developer_suites.png'
    },
    {
        'file': 'raw_search_pdf_1080x1920.png',
        'title': 'Instant Search & Categorization',
        'subtitle': 'Find any utility instantly with zero latency indexing',
        'out_phone': 'phone_screenshot_06_instant_search.png',
        'out_tablet': 'tablet_screenshot_06_instant_search.png'
    }
]

font_bold_path = r'C:\Windows\Fonts\segoeuib.ttf'
font_reg_path = r'C:\Windows\Fonts\segoeui.ttf'

font_title_phone = ImageFont.truetype(font_bold_path, 48)
font_sub_phone = ImageFont.truetype(font_reg_path, 28)

font_title_tab = ImageFont.truetype(font_bold_path, 36)
font_sub_tab = ImageFont.truetype(font_reg_path, 22)

def make_framed_phone(item):
    # Canvas 1080 x 1920
    canvas = Image.new('RGB', (1080, 1920), color=(12, 15, 23))
    draw = ImageDraw.Draw(canvas)

    # Gradient background accent
    for y in range(300):
        alpha = int(35 * (1 - y / 300))
        draw.line([(0, y), (1080, y)], fill=(12 + alpha, 15 + alpha // 2, 23 + alpha * 2))

    # Title & Subtitle centered
    title = item['title']
    subtitle = item['subtitle']

    draw.text((540, 90), title, font=font_title_phone, fill=(255, 255, 255), anchor="mm")
    draw.text((540, 155), subtitle, font=font_sub_phone, fill=(160, 175, 205), anchor="mm")

    # Load source raw image
    src_path = os.path.join(SCREENSHOTS_DIR, item['file'])
    if not os.path.exists(src_path):
        return

    raw = Image.open(src_path).convert('RGBA')

    # Device mockup frame: width 920, scaled down proportionally
    target_w = 920
    target_h = int(raw.size[1] * (target_w / raw.size[0]))
    raw_scaled = raw.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Rounded corners mask for inner frame
    mask = Image.new('L', (target_w, target_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (target_w, target_h)], radius=36, fill=255)

    # Frame border and shadow
    fx = (1080 - target_w) // 2
    fy = 220

    # Draw border
    border = Image.new('RGBA', (target_w + 8, target_h + 8), (0, 0, 0, 0))
    bdraw = ImageDraw.Draw(border)
    bdraw.rounded_rectangle([(0, 0), (target_w + 7, target_h + 7)], radius=40, outline=(55, 65, 95, 255), width=3)

    canvas.paste(border, (fx - 4, fy - 4), border)
    canvas.paste(raw_scaled, (fx, fy), mask)

    out_path = os.path.join(SCREENSHOTS_DIR, item['out_phone'])
    canvas.save(out_path, format='PNG', optimize=True)
    print(f"Generated Phone Screenshot (1080x1920): {out_path}")

def make_framed_tablet(item):
    # Canvas 1280 x 800 (Fire Tablet standard)
    canvas = Image.new('RGB', (1280, 800), color=(12, 15, 23))
    draw = ImageDraw.Draw(canvas)

    # Top gradient
    for y in range(160):
        alpha = int(30 * (1 - y / 160))
        draw.line([(0, y), (1280, y)], fill=(12 + alpha, 15 + alpha // 2, 23 + alpha * 2))

    draw.text((640, 50), item['title'], font=font_title_tab, fill=(255, 255, 255), anchor="mm")
    draw.text((640, 95), item['subtitle'], font=font_sub_tab, fill=(160, 175, 205), anchor="mm")

    src_path = os.path.join(SCREENSHOTS_DIR, item['file'])
    if not os.path.exists(src_path):
        return

    raw = Image.open(src_path).convert('RGBA')

    # Display scaled phone screen on tablet landscape with nice frame
    target_h = 650
    target_w = int(raw.size[0] * (target_h / raw.size[1]))
    raw_scaled = raw.resize((target_w, target_h), Image.Resampling.LANCZOS)

    mask = Image.new('L', (target_w, target_h), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([(0, 0), (target_w, target_h)], radius=24, fill=255)

    fx = (1280 - target_w) // 2
    fy = 135

    canvas.paste(raw_scaled, (fx, fy), mask)

    out_path = os.path.join(SCREENSHOTS_DIR, item['out_tablet'])
    canvas.save(out_path, format='PNG', optimize=True)
    print(f"Generated Tablet Screenshot (1280x800): {out_path}")

for item in sources:
    make_framed_phone(item)
    make_framed_tablet(item)

print("All Amazon Appstore screenshots generated successfully!")
