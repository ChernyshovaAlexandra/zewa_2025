import { Icon24Copy } from "@vkontakte/icons";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useGlobal from "@/contexts/GlobalProvider";
import { CopyButton, PromoCodeContainer, PromoText } from "./style";

type Codetype = {
    code: string;
    showSnackbar: (message: string) => void;
};

const Code: React.FC<Codetype> = ({ code, showSnackbar }) => {
    const { audioManager } = useGlobal();

    const handleCopy = React.useCallback(() => {
        audioManager.playClickSound();
        showSnackbar('Промокод скопирован в буфер обмена');
    }, [audioManager, showSnackbar]);

    return (
        <PromoCodeContainer>
            <PromoText>{code}</PromoText>
            <CopyToClipboard text={code} onCopy={handleCopy}>
                <CopyButton variant="accent">
                    <Icon24Copy fill="#ffffff" />
                </CopyButton>
            </CopyToClipboard>
        </PromoCodeContainer>
    );
};

export default Code;
