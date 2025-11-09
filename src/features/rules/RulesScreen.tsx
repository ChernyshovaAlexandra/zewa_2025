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
      <div style={{ paddingBottom: '60px' }}>
        {active === 'rules' ? (
          <>
            <RulesText
              as="div"
              style={{ padding: '0 10px' }}
              size="p4"
              dangerouslySetInnerHTML={{ __html: applyNbsp(rulesText) }}
            />
            <Linked
              style={{ width: '200px' }}
              href="https://back.zemma-chatbot.ru/docs/Правила_акции Zewa_Магнит.pdf"
              target="_blank"
            >
              Полные правила
            </Linked>
          </>
        ) : (
          <>
            <RulesText
              as="div"
              size="p4"
              style={{ padding: '0 10px' }}
              dangerouslySetInnerHTML={{ __html: applyNbsp(faqText) }}
            />
            <Linked href="https://t.me/zemma_zewa_support" target="_blank">
              Задать вопрос
            </Linked>
          </>
        )}
      </div>
    </PageContainer>
  );
}

const RulesText = styled(Text)`
  color: #fff;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const Linked = styled.a`
  border-radius: 10px;
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  box-shadow:
    0 -2px 3px 0 #b3c7e9 inset,
    0 3px 0 0 #b3c7e9,
    0 5px 5px 0 rgba(0, 53, 116, 0.5);
  width: 180px;
  height: 48px;
  padding: 14px 24px;
  justify-content: center;
  align-items: center;
  display: block;
  text-align: center;
  color: #1235ab;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  text-decoration: none;
  margin: 17px auto 0;
`;
