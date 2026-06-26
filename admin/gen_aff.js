const fs = require('fs');

const firstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô'];
const middleNames = ['Thanh', 'Minh', 'Thị', 'Văn', 'Tuấn', 'Hải', 'Thùy', 'Ngọc', 'Hữu', 'Đức', 'Hoàng', 'Thế'];
const lastNames = ['Dung', 'Anh', 'Bình', 'Hương', 'Nam', 'Long', 'Trang', 'Linh', 'Khang', 'Tú', 'Khánh', 'My', 'Hưng'];

function rInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rItem(arr) {
  return arr[rInt(0, arr.length - 1)];
}

const affiliates = [];
const startCode = 11190;

for (let i = 1; i <= 20; i++) {
  const name = `${rItem(firstNames)} ${rItem(middleNames)} ${rItem(lastNames)}`;
  const emailPrefix = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 10);
  
  const leads = rInt(5, 200);
  const revenue = leads * rInt(300000, 2000000);
  const commission = revenue * 0.1;
  
  let tier = 'bronze';
  if (leads > 100) tier = 'gold';
  else if (leads > 30) tier = 'silver';

  const socialTypes = ['facebook.com', 'tiktok.com/@', 'youtube.com/@'];
  const social = `https://${rItem(socialTypes)}${emailPrefix}${rInt(10, 99)}`;

  affiliates.push({
    id: `aff-${String(i).padStart(3, '0')}`,
    name: name,
    code: `AFF${String(rInt(100, 999))}`,
    partner_code: String(startCode + i),
    tier: tier,
    email: `${emailPrefix}${rInt(1,99)}@gmail.com`,
    phone: `09${rInt(10000000, 99999999)}`,
    social_link: rInt(1, 10) > 2 ? social : "", // 80% have social links
    total_leads: leads,
    total_revenue: revenue,
    total_commission: commission,
    status: rInt(1, 10) > 1 ? 'active' : 'inactive' // 90% active
  });
}

// Add the original Dung
affiliates[0] = {
  id: "aff-001",
  name: "Hoàng Thanh Dung",
  code: "AFF123",
  partner_code: "11198",
  tier: "silver",
  email: "dunght@gmail.com",
  phone: "0912 345 678",
  social_link: "https://facebook.com/hoangthanhdung",
  total_leads: 52,
  total_revenue: 84200000,
  total_commission: 8420000,
  status: "active"
};

fs.writeFileSync('d:/AMS Affliate/admin/data/affiliates.json', JSON.stringify(affiliates, null, 2), 'utf-8');
console.log('Generated 20 affiliates.');
