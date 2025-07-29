import QrScanner from 'qr-scanner';
import workerUrl from 'qr-scanner/qr-scanner-worker.min.js?url';

export const QR_REGEX = /t=\d{8}T\d{4}&s=\d+\.\d{2}&fn=\d{16}&i=\d+&fp=\d+&n=\d+/;

/** Конвертация File → Canvas */
const fileToCanvas = (file: File): Promise<HTMLCanvasElement> => {
  console.log('[QR] fileToCanvas: start for file', file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log('[QR] fileToCanvas: FileReader.onload');
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        console.log('[QR] fileToCanvas: Image.onload, size', img.width, img.height);
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(img, 0, 0);
          console.log('[QR] fileToCanvas: Canvas ready');
          resolve(canvas);
        } else {
          console.info('[QR] fileToCanvas: No 2D context');
          reject(new Error('Не удалось получить контекст 2D'));
        }
      };
      img.onerror = (err) => {
        console.info('[QR] fileToCanvas: Image.onerror', err);
        reject(err);
      };

      img.src = reader.result as string;
    };
    reader.onerror = (err) => {
      console.info('[QR] fileToCanvas: FileReader.onerror', err);
      reject(err);
    };
    reader.readAsDataURL(file);
  });
};

const worker = new Worker(workerUrl);

/** Проверка QR-кода по regex */
export async function validateQRCode(file: File): Promise<boolean> {
  console.log('[QR] validateQRCode: start', file);
  try {
    const canvas = await fileToCanvas(file);
    let scaled = canvas;
    if (canvas.width > 800) {
      const factor = 800 / canvas.width;
      const tmp = document.createElement('canvas');
      tmp.width = canvas.width * factor;
      tmp.height = canvas.height * factor;
      tmp.getContext('2d')!.drawImage(canvas, 0, 0, tmp.width, tmp.height);
      scaled = tmp;
    }
    console.log('[QR] validateQRCode: start', file);

    const region = {
      x: canvas.width * 0.7,
      y: canvas.height * 0.75,
      width: canvas.width * 0.25,
      height: canvas.height * 0.2,
    };

    const result = await QrScanner.scanImage(scaled, {
      qrEngine: worker,
      returnDetailedScanResult: true,
      alsoTryWithoutScanRegion: true,
      scanRegion: region,
    });
    console.log('[QR] validateQRCode: scanImage result', result);
    const data = typeof result === 'string' ? result : result.data;
    const match = QR_REGEX.test(data);
    console.log('[QR] validateQRCode: regex test', match, 'on', data);
    return match;
  } catch (err) {
    console.log('[QR] validateQRCode: error', err);
    return false;
  }
}
