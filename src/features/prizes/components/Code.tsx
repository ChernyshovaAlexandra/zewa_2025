import { Icon24Copy } from '@vkontakte/icons';
import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useGlobal from '@/contexts/GlobalProvider';
import { PromoCodeContainer, PromoText } from './style';

type Codetype = {
  code: string;
};

const Code: React.FC<Codetype> = ({ code }) => {
  const { audioManager } = useGlobal();

  const handleCopy = React.useCallback(() => {
    audioManager.playClickSound();
  }, [audioManager]);

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
