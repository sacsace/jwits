from PIL import Image
from pathlib import Path

src = Path(r"D:\Software Project\JWITS\public\logo-horizontal.png")
# Prefer original source if available for cleaner processing
img_dir = Path(r"D:\Software Project\JWITS\img")
candidates = [
    p for p in img_dir.glob("Logo * (JWITS).png")
    if p.name != "Logo (JWITS).png"
]
if candidates:
    src_file = candidates[0]
else:
    src_file = src

img = Image.open(src_file).convert("RGBA")
pixels = img.load()
w, h = img.size

threshold = 245
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r >= threshold and g >= threshold and b >= threshold:
            pixels[x, y] = (255, 255, 255, 0)
        elif r < 40 and g < 40 and b < 40:
            # match site ink color so it blends with header gray
            pixels[x, y] = (26, 29, 36, 255)

out = Path(r"D:\Software Project\JWITS\public\logo-horizontal.png")
img.save(out, "PNG")
print(f"saved {out} from {src_file.name} ({w}x{h})")
