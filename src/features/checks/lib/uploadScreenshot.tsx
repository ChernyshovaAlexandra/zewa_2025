import jsQR from 'jsqr';
import { parseReceipt } from './parseReceipt';
import { showModal } from './showModal';

export async function uploadScreenshot(file: File) {
  showModal('Минутку', 'Отправляем чек на проверку. Это займет какое-то время.');

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    showModal('Чек не распознан', 'Произошла ошибка при обработке изображения.', true);
    return;
  }
  ctx.drawImage(bitmap, 0, 0);
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(new Uint8ClampedArray(data), width, height);

  if (!code) {
    showModal(
      'Чек не распознан',
      'QR-код не найден. Попробуйте снова или введите данные вручную.',
      true,
    );
    return;
  }

  showModal(
    'Проверка чека',
    'После проверки мы зарегистрируем чек, начислим вам снежинки и пришлём уведомление об этом.',
    true,
    'Хорошо',
  );

  try {
    parseReceipt(code.data);
    showModal(
      'Чек проверен',
      `Ваш чек зарегистрирован. В нём есть товар бренда ZEWA. Вы получаете в награду снежинки!`,
      true,
    );
  } catch {
    showModal(
      'Чек проверен',
      '😕 К сожалению, ваш чек не прошёл модерацию. Попробуйте загрузить ещё раз или ввести данные вручную.',
      true,
    );
  }
}
