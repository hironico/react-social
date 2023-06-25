import { useState, useEffect, useRef } from 'react';

export interface UseLoadGsiScriptOptions {
  scriptUrl: string,
  /**
   * Nonce applied to GSI script tag. Propagates to GSI's inline style tag
   */
  nonce?: string;
  /**
   * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script success
   */
  onScriptLoadSuccess?: () => void;
  /**
   * Callback fires on load [gsi](https://accounts.google.com/gsi/client) script failure
   */
  onScriptLoadError?: (message: string) => void;
}

export default function useLoadGsiScript(options: UseLoadGsiScriptOptions): boolean {
  const { scriptUrl, nonce, onScriptLoadSuccess, onScriptLoadError } = options;

  const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] = useState(false);

  const onScriptLoadSuccessRef = useRef(onScriptLoadSuccess);
  onScriptLoadSuccessRef.current = onScriptLoadSuccess;

  const onScriptLoadErrorRef = useRef(onScriptLoadError);
  onScriptLoadErrorRef.current = onScriptLoadError;

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = scriptUrl;
    scriptTag.async = true;
    scriptTag.defer = true;
    scriptTag.nonce = nonce;
    scriptTag.onload = () => {
      setScriptLoadedSuccessfully(true);
      onScriptLoadSuccessRef.current?.();
    };
    scriptTag.onerror = () => {
      setScriptLoadedSuccessfully(false);
      onScriptLoadErrorRef.current?.(`Load of ${scriptUrl} script has failed.`);
    };

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [scriptUrl, nonce]);

  return scriptLoadedSuccessfully;
}