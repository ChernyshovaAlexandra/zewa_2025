export interface Receipt {
  date: string;
  totalSum: number;
  shopId: string;
  [key: string]: unknown;
}

export const SHOP_ID_PATTERN = /^\d{6}$/;

export function parseReceipt(raw: string): Receipt {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error('Некорректный формат данных');
  }

  if (
    typeof data !== 'object' ||
    data === null ||
    !('date' in data) ||
    !('totalSum' in data) ||
    !('shopId' in data)
  ) {
    throw new Error('Отсутствуют обязательные поля');
  }

  const receipt = data as Receipt;
  if (!SHOP_ID_PATTERN.test(receipt.shopId)) {
    throw new Error('shopId не соответствует формату');
  }

  return receipt;
}
