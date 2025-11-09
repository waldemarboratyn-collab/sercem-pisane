# generate_list.py
import os
import json
import re

# Ścieżka do folderu z obrazami
IMAGE_DIR = "images"

# Nazwa pliku wyjściowego
OUTPUT_FILE = os.path.join(IMAGE_DIR, "list.json")

def clean_title(filename):
    # Usuwa rozszerzenie i słowa "Komplet", "WB", "kompletne", itp.
    title = os.path.splitext(filename)[0]
    title = re.sub(r'\b[kK]omplet[WBwb]*\b', '', title)
    title = re.sub(r'\b[WBwb]\b', '', title)
    title = re.sub(r'\s+', ' ', title).strip()
    return title

def extract_number(filename):
    # Wydobywa numer z początku nazwy (np. "15 Zmierzchem.jpg" -> 15)
    match = re.match(r"^(\d+)", filename)
    return int(match.group(1)) if match else 9999

def main():
    files = [f for f in os.listdir(IMAGE_DIR) if f.lower().endswith(('.jpg', '.png', '.jpeg'))]
    files.sort(key=extract_number)

    data = []
    for f in files:
        data.append({
            "file": f,
            "title": clean_title(f)
        })

    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        json.dump(data, outfile, ensure_ascii=False, indent=2)

    print(f"✅ Zapisano {len(data)} pozycji do {OUTPUT_FILE}")

if __name__ == "__main__":
    main()

