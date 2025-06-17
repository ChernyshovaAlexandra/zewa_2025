import { PageContainer, Text } from '@/shared/ui';
import { useUserStore } from '@/shared/model';

export function ProfileScreen() {
  const user = useUserStore((s) => s.user);

  return (
    <PageContainer title="Личный кабинет" scrollable={false}>
      {user ? (
        <Text size="p4" color="#fff">
          {user.firstName || `ID: ${user.id}`}
        </Text>
      ) : (
        <Text size="p4" color="#fff">
          Пользователь не найден
        </Text>
      )}
    </PageContainer>
  );
}
