import { useNavigate } from 'react-router-dom';
import { PageContainer, Text } from '@/shared/ui';
import { applyNbsp } from '@/utils/nbsp';
import { rulesText } from './gameRulesText';

export function GameRulesScreen() {
  const navigate = useNavigate();
  return (
    <PageContainer
      fullscreen
      title="Правила игры"
      onBack={() => {
        sessionStorage.setItem('cameFromRules', 'true');
        navigate(-1);
      }}
    >
      <Text
        color="#fff"
        as="div"
        size="p4"
        dangerouslySetInnerHTML={{ __html: applyNbsp(rulesText) }}
      />
    </PageContainer>
  );
}
