interface LoadResourcesParams {
  isMobile?: boolean;
  imagePaths?: string[];
  modelPaths?: string[];
}
interface LoadedImageResources {
  images: Record<string, HTMLImageElement>;
}
interface LoadResourcesParams {
  audioPaths?: string[];
}
interface LoadedAudioResources {
  audios: { [key: string]: HTMLAudioElement | string };
}

class Helper {
  static loadAudio = (url: string, res: () => void) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => res();
    audio.onerror = () => res();
    audio.src = url;
  };

  static loadAudioResources = ({
    audioPaths = [],
  }: LoadResourcesParams): Promise<LoadedAudioResources> => {
    return new Promise((resolve) => {
      const resources: LoadedAudioResources = {
        audios: {},
      };

      let loadedCount = 0;
      const totalResources = audioPaths.length;

      if (totalResources === 0) {
        resolve(resources);
        return;
      }

      audioPaths.forEach((path) => {
        this.loadAudio(path, () => {
          loadedCount += 1;

          resources.audios[path] = path;

          if (loadedCount === totalResources) {
            resolve(resources);
          }
        });
      });
    });
  };

  static getCoinsForm(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'монет';
    }

    if (lastDigit === 1) {
      return 'монета';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'монеты';
    }

    return 'монет';
  }

  static getCorrectForm(tissues: number): string {
    const lastDigit = tissues % 10;
    const lastTwoDigits = tissues % 100;

    // Проверяем числа от 11 до 19, которые всегда имеют окончание "полотенец"
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'листов';
    }

    // Определяем форму на основе последней цифры
    switch (lastDigit) {
      case 1:
        return 'лист';
      case 2:
      case 3:
      case 4:
        return 'листа';
      default:
        return 'листов';
    }
  }

  static convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  static loadAndConvertImage = async (imagePath: string) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const file = new File([blob], 'image.png', { type: blob.type });
      const base64 = await this.convertImageToBase64(file);
      return base64;
    } catch (error) {
      console.error('Ошибка при загрузке и конвертации изображения:', error);
      return null;
    }
  };

  static getMeterText(count: number): string {
    const isDecimal = count % 1 !== 0;

    if (isDecimal) {
      // Для десятичных дробей всегда "метра"
      return 'метра';
    }

    // Приводим число к целому типу
    const integerCount = Math.floor(Math.abs(count));

    // Последняя цифра числа
    const lastDigit = integerCount % 10;
    // Последние две цифры числа
    const lastTwoDigits = integerCount % 100;

    // Для чисел, заканчивающихся на 11-19, всегда "метров"
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'метров';
    }

    // Определяем форму слова для остальных случаев
    switch (lastDigit) {
      case 1:
        return 'метр';
      case 2:
      case 3:
      case 4:
        return 'метра';
      default:
        return 'метров';
    }
  }

  static getPrizesText(count: number): string {
    if (count === 1) return 'приз';

    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'призов';
    }

    switch (lastDigit) {
      case 1:
        return 'приз';
      case 2:
      case 3:
      case 4:
        return 'приза';
      default:
        return 'призов';
    }
  }

  static formatDate = (dateString: string) => {
    if (dateString.length !== 13) {
      return dateString;
    }

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    return `${day}.${month}.${year}`;
  };

  static deFormatDate = (dateValue: Date) => {
    const year = dateValue.getFullYear();
    const month = (dateValue.getMonth() + 1).toString().padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    const day = dateValue.getDate().toString().padStart(2, '0');
    const hour = dateValue.getHours().toString().padStart(2, '0');
    const minute = dateValue.getMinutes().toString().padStart(2, '0');

    return `${year}${month}${day}T${hour}${minute}`;
  };

  static loadImageResources = ({
    imagePaths = [],
  }: LoadResourcesParams): Promise<LoadedImageResources> => {
    return new Promise((resolve, reject) => {
      const resources: LoadedImageResources = {
        images: {},
      };

      let loadedCount = 0;
      const totalResources = imagePaths.length;

      if (totalResources === 0) {
        resolve(resources);
        return;
      }

      imagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;

        img.onload = () => {
          resources.images[path] = img;
          loadedCount++;
          if (loadedCount === totalResources) {
            resolve(resources);
          }
        };

        img.onerror = () => {
          reject(new Error(`Ошибка загрузки изображения: ${path}`));
        };
      });
    });
  };

  static getRandomBooleanWithProbability(probabilityOfTrue = 0.6) {
    const random = Math.random() < probabilityOfTrue;
    return random;
  }
}

export default Helper;
