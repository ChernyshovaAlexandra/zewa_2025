import { rulesText } from './rulesText';
import { applyNbsp } from '@/utils';
import { PageContainer, Text } from '@/shared/ui';
import { TabButton, Tabs, TabsWrapper } from '../tournament/TournamentScreen.styles';
import { faqText } from '../faq/faqText';
import { useState } from 'react';
import styled from 'styled-components';

export function RulesScreen() {
  const [active, setActive] = useState<'rules' | 'faq'>('rules');

  return (
    <PageContainer
      fullscreen
      withPadding={false}
      title={active === 'rules' ? 'Правила участия' : 'FAQ'}
      scrollable={true}
    >
      <TabsWrapper>
        <Tabs>
          <TabButton $active={active === 'rules'} onClick={() => setActive('rules')}>
            Правила участия
          </TabButton>
          <TabButton $active={active === 'faq'} onClick={() => setActive('faq')}>
            FAQ
          </TabButton>
        </Tabs>
      </TabsWrapper>
      {active === 'rules' ? (
        <>
          <Text
            color="#fff"
            as="div"
            size="p4"
            dangerouslySetInnerHTML={{ __html: applyNbsp(rulesText) }}
          />
          <Linked
            href="https://back.zemma-chatbot.ru/docs/Правила_акции Zewa_Магнит.pdf"
            target="_blank"
          >
            Полные правила
          </Linked>
        </>
      ) : (
        <>
          <Text
            color="#fff"
            as="div"
            size="p4"
            dangerouslySetInnerHTML={{ __html: applyNbsp(faqText) }}
          />
          <Linked href="https://t.me/zemma_zewa_support">Задать вопрос</Linked>
        </>
      )}
    </PageContainer>
  );
}

const Linked = styled.a`
  display: flex;
  align-items: center;
  font-family: 'Foco Trial';
  justify-content: center;
  border-radius: 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
  gap: 10px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  width: fit-content;
  margin: 2rem auto 0;
  padding: 6px 12px;
  font-size: 14px;
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);

  color: #193F74 !important;
  font-weight: 700;

  box-shadow:
    0px -2px 3px 0px #b3c7e9 inset,
    0px 3px 0px 0px #b3c7e9,
    0px 5px 5px 0px rgba(0, 53, 116, 0.5);
`;
