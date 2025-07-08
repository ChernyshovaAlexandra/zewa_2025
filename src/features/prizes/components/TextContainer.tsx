import { Spacing } from '@vkontakte/vkui';
import { ContainerForText, Description } from './style';
import { Heading } from '@/shared/ui';

type TextProps = {
  title: string;
  description: string;
};

const TextContainer: React.FC<TextProps> = ({ title, description }) => {
  return (
    <ContainerForText>
      <Heading size="h4">{title}</Heading>
      <Spacing size={10} />
      <Description>{description}</Description>
    </ContainerForText>
  );
};

export default TextContainer;
