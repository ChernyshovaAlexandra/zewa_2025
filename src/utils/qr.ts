import QrScanner from 'qr-scanner';

export const QR_REGEX = /t=\d{8}T\d{4}&s=\d+\.\d{2}&fn=\d{16}&i=\d+&fp=\d+&n=\d+/;

/** Конвертация File → Canvas */
export async function fileToCanvas(file: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) reject(new Error('Не удалось получить 2D-контекст'));
        ctx?.drawImage(img, 0, 0);
        resolve(canvas);
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Проверка QR-кода по regex */
export async function validateQRCode(file: File): Promise<boolean> {
  try {
    const canvas = await fileToCanvas(file);
    const result = await QrScanner.scanImage(canvas);
    return QR_REGEX.test(result);
  } catch {
    return false;
  }
}
