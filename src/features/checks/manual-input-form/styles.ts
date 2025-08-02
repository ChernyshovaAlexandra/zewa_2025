import styled from 'styled-components';
import { Div, Text } from '@vkontakte/vkui';

export const StyledForm = styled.form`
  text-align: left;
  > div {
    margin: 0 auto 5px;
    padding: 2px;
  }
`;

export const CenteredDiv = styled(Div)`
  text-align: center;
`;

export const CenteredTitle = styled(Text)`
  text-align: center;
  margin-bottom: 10px;
`;
