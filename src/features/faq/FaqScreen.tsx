import { PageContainer, ZewaButton } from '@/shared/ui';
import styled from 'styled-components';
import { FAQ_SUPPORT_URL } from './faqText';
import { FaqList } from './FaqList';

export function FaqScreen() {
  return (
    <PageContainer title="FAQ" scrollable={true}>
      <FaqWrapper>
        <StyledFaqList />
        <SupportLink href={FAQ_SUPPORT_URL} target="_blank" rel="noreferrer">
          <ZewaButton variant="white">Задать вопрос</ZewaButton>
        </SupportLink>
      </FaqWrapper>
    </PageContainer>
  );
}

const FaqWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SupportLink = styled.a`
  text-decoration: none;
  align-self: center;
  width: 100%;

  button {
    width: 100%;
  }
`;

const StyledFaqList = styled(FaqList)`
  padding: 0 10px;
`;
