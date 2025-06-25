import { PageContainer, Text } from '@/shared/ui';
import { useState } from 'react';
import * as S from '../tournament/TournamentScreen.styles';

export function PrizesScreen() {
  const [active, setActive] = useState<'promocodes' | 'prizes'>('promocodes');

  return (
    <PageContainer fullscreen title="Мои призы">
      <S.TabsWrapper>
        <S.Tabs>
          <S.TabButton $active={active === 'promocodes'} onClick={() => setActive('promocodes')}>
            Промокоды
          </S.TabButton>
          <S.TabButton $active={active === 'prizes'} onClick={() => setActive('prizes')}>
            Призы
          </S.TabButton>
        </S.Tabs>
      </S.TabsWrapper>
      {active === 'promocodes' ? (
        <>
          <Text weight={700} color="white" align="center">
            Промокодов пока нет
          </Text>
        </>
      ) : (
        <>
          <Text weight={700} color="white" align="center">
            Призов пока нет
          </Text>
        </>
      )}
    </PageContainer>
  );
}
