// frontend/src/components/Root.tsx (Create this file if not exists)
import React, { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Root({ children }: { children: ReactNode }) {
  const { siteConfig } = useDocusaurusContext();

  // Inject API key into window for client-side use
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).GEMINI_API_KEY = siteConfig.customFields?.geminiApiKey;
      (window as any).GEMINI_MODEL_NAME = siteConfig.customFields?.geminiModelName;
      (window as any).BACKEND_API_URL = siteConfig.customFields?.backendApiUrl;
    }
  }, [siteConfig]);

  return <>{children}</>;
}