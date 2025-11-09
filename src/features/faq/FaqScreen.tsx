import { PageContainer, Text, ZewaButton } from '@/shared/ui';
import { applyNbsp } from '@/utils';
import { faqText } from './faqText';

export function FaqScreen() {
  return (
    <PageContainer title="FAQ" scrollable={true}>
      <div style={{ padding: '0 20px 30px' }}>
        <Text
          color="#fff"
          as="div"
          size="p4"
          style={{ padding: '0 10px' }}
          dangerouslySetInnerHTML={{ __html: applyNbsp(faqText) }}
        />
        <ZewaButton variant="white">Задать вопрос</ZewaButton>
      </div>
    </PageContainer>
  );
}
