import { telegramService } from '@/services';

type ImpactStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
type NotificationType = 'success' | 'error' | 'warning';

const getHaptic = () => telegramService.getWebApp()?.HapticFeedback;

const safeInvoke = (invoke: () => void) => {
  try {
    invoke();
  } catch {
    // silently ignore unsupported environments
  }
};

export const triggerImpactHaptic = (style: ImpactStyle = 'light') => {
  const haptic = getHaptic();
  if (!haptic?.impactOccurred) return;

  safeInvoke(() => haptic.impactOccurred?.(style));
};

export const triggerNotificationHaptic = (type: NotificationType = 'success') => {
  const haptic = getHaptic();
  if (!haptic?.notificationOccurred) return;

  safeInvoke(() => haptic.notificationOccurred?.(type));
};

export const triggerSelectionHaptic = () => {
  const haptic = getHaptic();
  if (!haptic?.selectionChanged) return;

  safeInvoke(() => haptic.selectionChanged?.());
};
