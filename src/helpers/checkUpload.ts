import React from 'react';
import ApiHelper, { CheckData } from '@/helpers/ApiHelper';
import { useModal } from '@/contexts/ModalContext';
import useAuth from '@/contexts/AuthProvider';
import bridge from '@vkontakte/vk-bridge';
import useGlobal from '@/contexts/GlobalProvider';
import { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import Helper from './Helper';

type UseCheckUploadReturn = {
  handleScanCheck: (scanData: CheckData) => void;
  handleManualCheck: () => void;
  handlePhotoUpload: (photoFile: File) => void;
  validateField: (field: keyof ManualCheckData, value: string) => string;
  validateDate: (date: Date | null) => string;
  handleChange: (field: keyof ManualCheckData, value: string) => void;
  handleDateChange: (value?: Date) => void;
  formData: ManualCheckData;
  errors: Record<keyof ManualCheckData, string>;
  isFormValid: boolean;
  pending: boolean;
  error: string | null;
  message: string | null;
  openVKCodeReader: () => void;
  closeScaner: () => void;
  handleNotVKScan: (detectedCodes: IDetectedBarcode[]) => void;
  useCameraPermissions: (onGranted: () => void) => () => void;
  closeScan: () => void;
  title: string | null;
  setError: (arg: string) => void;
  setTitle: (arg: string) => void;
};

type ManualCheckData = {
  fn: string;
  fd: string;
  fp: string;
  sumRub: string;
  sumCop: string;
  date: Date | null;
};

const useCheckUpload = (): UseCheckUploadReturn => {
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState<null | string>(null);
  const [formData, setFormData] = React.useState<ManualCheckData>({
    fn: '',
    fd: '',
    fp: '',
    sumRub: '',
    sumCop: '',
    date: null,
  });
  const [errors, setErrors] = React.useState<Record<keyof ManualCheckData, string>>({
    fn: '',
    fd: '',
    fp: '',
    sumRub: '',
    sumCop: '',
    date: '',
  });
  const [isFormValid, setIsFormValid] = React.useState(false);
  const { setActivePanel } = useGlobal();
  const { hideModal, setScannerNotAllowed, scanerNotAllowed } = useModal();
  const { vkUserData, authData } = useAuth();
  const [cameraStream, setCameraStream] = React.useState<MediaStream | null>(null); // Управление потоком камеры

  // Функция остановки камеры
  const stopCamera = React.useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  }, [cameraStream]);

  const handleApiResponse = React.useCallback(
    (response: any) => {
      if (response.success) {
        setMessage('Чек успешно отправлен на модерацию');
        setError(null);
      } else {
        const message = response.message
          ? response.message
          : response.response.data.message
            ? response.response.data.message
            : 'Ошибка добавления чека';
        setMessage(message);
        setError(response.response.data.message || 'Произошла ошибка');
      }
      setPending(false);
      stopCamera(); // Остановка камеры после ответа
    },
    [stopCamera],
  );

  const validateField = (field: keyof ManualCheckData, value: string): string => {
    if (!value.trim()) {
      return 'Обязательное поле';
    }
    if (!/^\d+$/.test(value)) {
      return 'Допустимы только цифры';
    }
    if ((field === 'sumRub' || field === 'sumCop') && value.length < 2) {
      return 'Минимум 2 цифры';
    }
    if (field === 'sumRub' && (parseInt(value, 10) <= 0 || value[0] === '0')) {
      return 'Некорректная сумма чека';
    }
    return '';
  };

  const closeScan = () => {
    hideModal();
    setActivePanel('main');
    if (scanerNotAllowed) {
      setScannerNotAllowed(false);
    }
    stopCamera(); // Остановка камеры при закрытии
  };

  const handleScanCheck = React.useCallback(
    async (scanData: CheckData) => {
      if (!vkUserData) {
        setError('Пользователь не авторизован');
        return;
      }
      setPending(true);
      try {
        scanData.telegram_id = authData.id;
        scanData.hash = authData.hash;
        scanData.payload = authData.payload;
        scanData.ts = authData.ts;

        const response = await ApiHelper.checkScanData(scanData);
        handleApiResponse(response);
      } catch (error: any) {
        setError(error.message ? error.message : 'Ошибка при обработке сканированных данных');
        setPending(false);
        stopCamera(); // Остановка камеры при ошибке
      }
    },
    [vkUserData, handleApiResponse, stopCamera],
  );
  const validateDate = (date: Date | null): string => {
    if (!date) {
      return 'Выберите дату';
    }
    const now = new Date();
    if (date > now) {
      return 'Дата не может быть в будущем';
    }
    return '';
  };
  const sendDataToServer = React.useCallback(
    (rawValue: string) => {
      if (!vkUserData) return;
      const qrCodePattern = /t=\d{8}T\d{4}&s=\d+\.\d{2}&fn=\d{16}&i=\d+&fp=\d+&n=\d+/;
      if (!qrCodePattern.test(rawValue)) {
        setError('Некорректный формат qr-кода. Пожалуйста, используйте валидный чек.');
        return;
      }
      const data = ApiHelper.parseQRCode(rawValue);
      handleScanCheck(data);
    },
    [vkUserData, handleScanCheck, stopCamera],
  );

  const openVKCodeReader = React.useCallback(() => {
    bridge
      .send('VKWebAppOpenCodeReader')
      .then((data) => {
        if (data.code_data) {
          sendDataToServer(data.code_data);
        }
      })
      .catch((error) => {
        console.error(error);
        stopCamera(); // Остановка камеры при ошибке
      });
  }, [sendDataToServer, stopCamera]);

  const handleChange = (field: keyof ManualCheckData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleDateChange = (value?: Date) => {
    setFormData((prev) => ({ ...prev, date: value || null }));
    setErrors((prev) => ({ ...prev, date: validateDate(value || null) }));
  };

  React.useEffect(() => {
    const isValid = Object.values(errors).every((error) => error === '') && formData.date !== null;
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleManualCheck = React.useCallback(async () => {
    if (Object.values(errors).some((error) => error !== '')) return;
    const emptyFields = Object.keys(formData).filter((key) => {
      const value = formData[key as keyof typeof formData];
      return value === null || (typeof value === 'string' && value.trim() === '');
    });

    if (emptyFields.length > 0 || !formData.date) {
      const newErrors = { ...errors };

      emptyFields.forEach((field) => {
        newErrors[field as keyof typeof formData] = 'Обязательное поле';
      });

      if (!formData.date) {
        newErrors.date = 'Выберите дату';
      }
      setErrors(newErrors);
      return;
    }

    if (!vkUserData) {
      setError('Пользователь не авторизован');
      return;
    }

    setPending(true);
    try {
      const formattedDate = Helper.deFormatDate(formData.date);
      const sum = `${formData.sumRub}${formData.sumCop}`;
      const response = await ApiHelper.checkScanData({
        telegram_id: authData.id,
        hash: authData.hash,
        payload: authData.payload,
        ts: authData.ts,
        fn: formData.fn,
        fd: formData.fd,
        fp: formData.fp,
        sum,
        date: formattedDate,
      });
      handleApiResponse(response);
    } catch (error) {
      setError('Ошибка при обработке данных ручного ввода.');
      setPending(false);
      stopCamera(); // Остановка камеры при ошибке
    }
  }, [vkUserData, formData, errors, handleApiResponse]);

  const handlePhotoUpload = React.useCallback(
    async (photoFile: File) => {
      if (!vkUserData) {
        setError('Пользователь не авторизован');
        return;
      }

      setPending(true);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const imgBase64 = reader.result as string;
        try {
          const response = await ApiHelper.addCheckImageManual({
            imgBase64,
            telegram_id: authData.id,
            hash: authData.hash,
            payload: authData.payload,
            ts: authData.ts,
          });

          handleApiResponse(response);
        } catch (error) {
          setError('Ошибка при загрузке фото чека');
          setPending(false);
          stopCamera(); // Остановка камеры при ошибке
        }
      };

      reader.onerror = () => {
        setError('Ошибка при конвертации файла.');
        setPending(false);
        stopCamera(); // Остановка камеры при ошибке
      };

      reader.readAsDataURL(photoFile);
    },
    [vkUserData, handleApiResponse, stopCamera],
  );

  const handleNotVKScan = React.useCallback(
    (detectedCodes: IDetectedBarcode[]) => {
      if (detectedCodes.length > 0) {
        sendDataToServer(detectedCodes[0].rawValue);
      }
    },
    [sendDataToServer],
  );

  const closeScaner = React.useCallback(() => {
    hideModal();
    setActivePanel('main');
    stopCamera(); // Остановка камеры при закрытии
  }, [hideModal, setActivePanel, stopCamera]);

  const useCameraPermissions = (onGranted: () => void) => {
    const requestCameraPermission = React.useCallback(() => {}, [
      onGranted,
      navigator,
      setCameraStream,
      setTitle,
      setError,
      setScannerNotAllowed,
    ]);

    return requestCameraPermission;
  };

  return {
    handleScanCheck,
    handleManualCheck,
    handlePhotoUpload,
    validateField,
    validateDate,
    handleChange,
    handleDateChange,
    formData,
    errors,
    isFormValid,
    pending,
    error,
    useCameraPermissions,
    message,
    openVKCodeReader,
    closeScaner,
    handleNotVKScan,
    closeScan,
    title,
    setError,
    setTitle,
  };
};

export default useCheckUpload;
