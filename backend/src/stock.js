import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'stock.json');

export const defaultStock = () => ({
  lot: '',
  tested: '',
  primary: [
    { name: 'Organic carbon matter', value: '', unit: '%' },
    { name: 'Moisture', value: '', unit: '%' },
    { name: 'Nitrogen (N)', value: '', unit: '%' },
    { name: 'Phosphorus (P) / Phosphate (P2O5)', value: '', unit: '%' },
    { name: 'Potassium (K)', value: '', unit: '%' },
    { name: 'C:N ratio', value: '', unit: '' },
    { name: 'NPK ratio', value: '', unit: '' },
    { name: 'pH', value: '', unit: '' },
  ],
  micro: [
    { name: 'Calcium (Ca), Magnesium (Mg), Sulphur (S)', value: '', unit: '' },
    { name: 'Copper (Cu)', value: '', unit: 'ppm' },
    { name: 'Zinc (Zn)', value: '', unit: 'ppm' },
    { name: 'Sodium (Na)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Boron (B)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Molybdenum (Mo)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Iron (Fe)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Manganese (Mn)', value: '', unit: 'ppm' },
  ],
});

const cleanRows = (rows) => {
  if (!Array.isArray(rows)) return [];
  return rows.slice(0, 40).map((row) => ({
    name: String(row?.name ?? '').trim().slice(0, 160),
    value: String(row?.value ?? '').trim().slice(0, 40),
    unit: String(row?.unit ?? '').trim().slice(0, 16),
  })).filter((row) => row.name);
};

export const readStock = () => {
  if (!fs.existsSync(filePath)) return defaultStock();
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return {
      lot: String(parsed.lot ?? '').slice(0, 80),
      tested: String(parsed.tested ?? '').slice(0, 40),
      primary: cleanRows(parsed.primary).length ? cleanRows(parsed.primary) : defaultStock().primary,
      micro: cleanRows(parsed.micro),
    };
  } catch {
    return defaultStock();
  }
};

export const writeStock = (input) => {
  const stock = {
    lot: String(input?.lot ?? '').trim().slice(0, 80),
    tested: String(input?.tested ?? '').trim().slice(0, 40),
    primary: cleanRows(input?.primary),
    micro: cleanRows(input?.micro),
  };
  if (!stock.primary.length) {
    const error = new Error('Add at least one primary parameter.');
    error.status = 400;
    throw error;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(stock, null, 2));
  return stock;
};
