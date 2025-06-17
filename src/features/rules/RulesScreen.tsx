import { rulesText } from './rulesText';
import { applyNbsp } from '@/utils';
import { PageContainer, Text, ZewaButton } from '@/shared/ui';
import { ButtonWrapper } from './RulesScreen.styles';

export function RulesScreen() {
  return (
    <PageContainer title="Правила участия" scrollable={true}>
      <Text
        color="#fff"
        as="div"
        size="p4"
        dangerouslySetInnerHTML={{ __html: applyNbsp(rulesText) }}
      />
      <ButtonWrapper>
        <ZewaButton variant="white">Понятно</ZewaButton>
      </ButtonWrapper>
    </PageContainer>
  );
}
