import re

with open('style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace root variables
root_match = re.search(r':root\{.*?\}', content, re.DOTALL)
if root_match:
    old_root = root_match.group(0)
    new_root = """:root{--navy:#0f172a;--navy-dark:#020617;--navy-light:#1e293b;--orange:#ea580c;--green:#10b981;--green-dk:#047857;--blue:#2563eb;--teal:#0d9488;--red:#ef4444;--purple:#7c3aed;--yellow:#f59e0b;--txt:#0f172a;--txt2:#475569;--txt3:#94a3b8;--bg:#f8fafc;--card:#ffffff;--border:#e2e8f0;--border-lt:#f1f5f9;--sh-sm:0 4px 6px -1px rgba(0,0,0,.05), 0 2px 4px -2px rgba(0,0,0,.05);--sh-md:0 10px 25px -5px rgba(0,0,0,.05), 0 8px 10px -6px rgba(0,0,0,.05);--sh-lg:0 20px 25px -5px rgba(0,0,0,.05), 0 8px 10px -6px rgba(0,0,0,.05);--r-sm:10px;--r-md:16px;--r-lg:24px;--r-xl:32px;--r-full:100px;--sidebar:260px;--header:64px;--tr:.3s cubic-bezier(.4,0,.2,1)}"""
    content = content.replace(old_root, new_root)

# Replace Font
content = content.replace(
    "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');"
)
content = content.replace(
    "body{font-family:'Inter',sans-serif;",
    "body{font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:-0.2px;"
)

# Upgrade s-promo
old_promo = ".s-promo{margin:8px 12px 0;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:var(--r-lg);padding:18px 14px;color:#fff;position:relative;overflow:hidden;box-shadow:0 8px 24px rgba(139,92,246,.25)}"
new_promo = ".s-promo{margin:8px 12px 0;background:linear-gradient(135deg,#1e3a8a,#3b82f6);border-radius:var(--r-lg);padding:18px 14px;color:#fff;position:relative;overflow:hidden;box-shadow:0 8px 24px rgba(37,99,235,.25)}"
content = content.replace(old_promo, new_promo)

# Upgrade db-kpi-card
old_kpi_card = ".db-kpi-card { border: 1px solid var(--border); border-radius: var(--r-lg); padding: 20px; position: relative; }"
new_kpi_card = ".db-kpi-card { background: var(--card); border: 1px solid rgba(255,255,255,0.8); border-radius: var(--r-lg); padding: 22px; position: relative; box-shadow: var(--sh-md); overflow: hidden; }"
content = content.replace(old_kpi_card, new_kpi_card)

# Upgrade db-camp-card
old_camp_card = ".db-camp-card { background: #fff; border: 1px solid var(--border); border-radius: var(--r-lg); padding: 22px; display: flex; flex-direction: column; position: relative; }"
new_camp_card = ".db-camp-card { background: #fff; border: 1px solid var(--border); border-radius: var(--r-lg); padding: 22px; display: flex; flex-direction: column; position: relative; box-shadow: var(--sh-md); transition: var(--tr); }"
content = content.replace(old_camp_card, new_camp_card)

# Upgrade db-widget
old_widget = ".db-widget { background: #fff; border: 1px solid var(--border); border-radius: var(--r-lg); padding: 20px; display: flex; flex-direction: column; }"
new_widget = ".db-widget { background: #fff; border: 1px solid var(--border); border-radius: var(--r-lg); padding: 20px; display: flex; flex-direction: column; box-shadow: var(--sh-md); }"
content = content.replace(old_widget, new_widget)

# Refine .blue, .green, .orange, .purple backgrounds for db-kpi-card to be more premium
content = content.replace(
    ".db-kpi-card.blue { background: #f0f9ff; border-color: #bae6fd; }",
    ".db-kpi-card.blue { background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-color: #bae6fd; }"
)
content = content.replace(
    ".db-kpi-card.green { background: #f0fdf4; border-color: #bbf7d0; }",
    ".db-kpi-card.green { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #bbf7d0; }"
)
content = content.replace(
    ".db-kpi-card.orange { background: #fff7ed; border-color: #fed7aa; }",
    ".db-kpi-card.orange { background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-color: #fed7aa; }"
)
content = content.replace(
    ".db-kpi-card.purple { background: #faf5ff; border-color: #e9d5ff; }",
    ".db-kpi-card.purple { background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); border-color: #e9d5ff; }"
)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(content)

