# 🏗️ AMS — Agent Management System

> Hệ thống quản lý kênh Affiliate dành cho mạng lưới Agent (đối tác giới thiệu) trong lĩnh vực giáo dục.

## 📸 Screenshots

### Dashboard — Tổng quan
- Revenue banner với breakdown chi tiết
- KPI cards: Qualified Lead, Đơn hàng, Hoa hồng, Việc cần làm
- Tier Progress (Bronze → Silver)
- Lead Pipeline trạng thái

### Chiến dịch
- Search & filter campaigns
- Featured campaign banner
- Campaign list với stats chi tiết
- Right panel: Saved filters, Recent, Deadlines

### Lead & Đơn hàng
- Pipeline flow (Mới → Đang gọi → Hợp lệ → Trùng → Xác minh → Bị loại)
- Data table với pagination
- Summary, High-score leads, Rejection reasons

### Tài nguyên nội dung
- Content kit library
- Resource cards với thumbnails
- Quick tools

### Chi tiết chiến dịch
- Campaign hero với KPIs
- Tracking links & Mã ưu đãi
- Cơ chế thù lao & Ranking
- Timeline tiến độ

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (Vanilla), JavaScript |
| Fonts | Inter (Google Fonts) |
| Icons | Font Awesome 6 |
| Design | Custom Design System |

## 📁 Project Structure

```
AMS-Affiliate/
├── index.html          # Dashboard - Tổng quan
├── campaigns.html      # Chiến dịch listing
├── leads.html          # Lead & Đơn hàng
├── resources.html      # Tài nguyên nội dung
├── campaign-detail.html # Chi tiết chiến dịch
├── style.css           # Base design system
├── campaigns.css       # Campaign page styles
├── leads.css           # Lead page styles
├── resources.css       # Resources page styles
├── detail.css          # Detail page styles
├── app.js              # Interactive logic
└── README.md
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/ams-affiliate.git

# Open in browser
# Simply open index.html, or use a local server:
npx serve .
```

## 📋 Pages

| Page | File | Description |
|------|------|-------------|
| Dashboard | `index.html` | KPIs, Revenue, Tier, Lead pipeline |
| Chiến dịch | `campaigns.html` | Campaign listing + filters |
| Lead & Đơn hàng | `leads.html` | Lead table + pipeline |
| Tài nguyên | `resources.html` | Content kit library |
| Chi tiết | `campaign-detail.html` | Campaign detail view |

## 📝 License

MIT License
