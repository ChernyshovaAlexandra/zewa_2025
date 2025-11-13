import { rulesText } from './rulesText';
import { applyNbsp } from '@/utils';
import { PageContainer, Text } from '@/shared/ui';
import { TabButton, Tabs, TabsWrapper } from '../tournament/TournamentScreen.styles';
import { FAQ_RULES_URL, FAQ_SUPPORT_URL } from '../faq/faqText';
import { useState } from 'react';
import styled from 'styled-components';
import { FaqList } from '../faq/FaqList';

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
            <Linked style={{ width: '200px' }} href={FAQ_RULES_URL} target="_blank" rel="noreferrer">
              Полные правила
            </Linked>
          </>
        ) : (
          <>
            <FaqListWrapper />
            <Linked href={FAQ_SUPPORT_URL} target="_blank" rel="noreferrer">
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
  white-space: normal;

  ol {
    margin: 18px 0;
    padding-left: 28px;
  }

  li {
    padding-left: 4px;
  }

  li + li {
    margin-top: 14px;
  }

  p {
    margin: 12px 0;
  }

  .faq-divider {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    margin: 18px 0;
    opacity: 0.6;
  }
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

const FaqListWrapper = styled(FaqList)`
  padding: 10px 10px 0;
`;
