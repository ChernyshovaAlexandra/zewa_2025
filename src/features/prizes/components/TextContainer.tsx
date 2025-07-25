import { Spacing } from '@vkontakte/vkui';
import { ContainerForText, Description } from './style';
import { Text } from '@/shared/ui';
import { Flex } from 'antd';
import styled from 'styled-components';

type TextProps = {
  title: string;
  description: string;
  isOffline: boolean
};

export const Title = styled(Text)`
  color: #1235ab;
  font-feature-settings:
    'liga' off,
    'clig' off;

  /* P3 Black */
  font-family: 'Foco Trial';
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: 130%; /* 22.1px */
`;

const TextContainer: React.FC<TextProps> = ({ title, description, isOffline }) => {
  return (
    <ContainerForText>
      <Flex gap={'5px'} align="center" justify="space-between">
        <Flex gap={'5px'} align="center">
          <img src={isOffline? "/assets/images/offline-promo.svg":"/assets/images/online-promo.svg"} alt="" />
          <Title style={{ margin: 0, color: '#1235AB' }}>{title}</Title>
        </Flex>
        <Flex gap={'5px'} align="center">
          <img style={{ height: '1.5rem' }} src="/assets/images/zewa-logo.png" alt="" />
          <img style={{ height: '1.5rem' }} src="/assets/images/logo-magnit.svg" alt="" />
        </Flex>
      </Flex>
      <Spacing size={10} />
      <Description>{description}</Description>
    </ContainerForText>
  );
};

export default TextContainer;
