declare global {
  interface Window {
    __LEAD_FORMS__?: {
      openContact?: () => void;
      // Add other properties if needed
    };
  }
}

export {};
