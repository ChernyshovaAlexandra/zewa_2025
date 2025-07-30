import { rulesText } from './rulesText';
import { applyNbsp } from '@/utils';
import { PageContainer, Text, ZewaButton } from '@/shared/ui';
import { ButtonWrapper } from './RulesScreen.styles';
import { TabButton, Tabs, TabsWrapper } from '../tournament/TournamentScreen.styles';
import { faqText } from '../faq/faqText';
import { useState } from 'react';

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
        </>
      ) : (
        <Text
          color="#fff"
          as="div"
          size="p4"
          dangerouslySetInnerHTML={{ __html: applyNbsp(faqText) }}
        />
      )}
    </PageContainer>
  );
}
