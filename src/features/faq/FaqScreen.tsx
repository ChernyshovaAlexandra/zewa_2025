import { PageContainer, Text } from '@/shared/ui';
import { applyNbsp } from '@/utils';
import { faqText } from './faqText';

export function FaqScreen() {
  return (
    <PageContainer title="FAQ" scrollable={true}>
      <Text
        color="#fff"
        as="div"
        size="p4"
        dangerouslySetInnerHTML={{ __html: applyNbsp(faqText) }}
      />
    </PageContainer>
  );
}
