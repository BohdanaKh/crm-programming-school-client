import { useState } from 'react';

 export const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copyToClipboard = (text:string) => {
        navigator.clipboard.writeText(text)
            .then(() => setIsCopied(true))
            .catch(() => setIsCopied(false));
    };

    return { isCopied, copyToClipboard };
};

