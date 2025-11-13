import { Text } from '@/shared/ui';
import { applyNbsp } from '@/utils';
import styled from 'styled-components';
import { faqItems } from './faqText';

interface FaqListProps {
  className?: string;
}

export function FaqList({ className }: FaqListProps) {
  return (
    <List className={className}>
      {faqItems.map((item, index) => (
        <FaqCard key={item.question}>
          <Question size="p3">
            <span>
              {String(index + 1)}. {item.question}
            </span>
          </Question>
          <Answer as="div" size="p4" dangerouslySetInnerHTML={{ __html: applyNbsp(item.answer) }} />
        </FaqCard>
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const FaqCard = styled.article`
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
`;

const Question = styled(Text)`
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
  line-height: 125%;

  span {
    flex: 1;
  }
`;

const Answer = styled(Text)`
  color: rgba(255, 255, 255, 0.9);
  line-height: 150%;
  white-space: normal;

  p + p {
    margin-top: 12px;
  }

  ul,
  ol {
    margin: 12px 0;
    padding-left: 20px;
  }

  li + li {
    margin-top: 6px;
  }

  a {
    color: #a6ddff;
    text-decoration: underline;
  }

  b,
  strong {
    color: #ffffff;
  }
`;
