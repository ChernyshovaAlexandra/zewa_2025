import { Icon24Copy } from '@vkontakte/icons';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PromoCodeContainer, PromoText } from './style';

type Codetype = {
  code: string;
};

const Code: React.FC<Codetype> = ({ code }) => {
  const handleCopy = React.useCallback(() => {}, []);

  return (
    <PromoCodeContainer>
      <PromoText>{code}</PromoText>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <Icon24Copy fill="#1945CB" />
      </CopyToClipboard>
    </PromoCodeContainer>
  );
};

export default Code;
