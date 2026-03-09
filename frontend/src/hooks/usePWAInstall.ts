import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "pwa_prompt_last_seen";
const COOLDOWN_DAYS = 30;

interface UsePWAInstallReturn {
  canPrompt: boolean;
  isStandalone: boolean;
  triggerInstall: () => Promise<boolean>;
  dismiss: () => void;
}

export const usePWAInstall = (): UsePWAInstallReturn => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canPrompt, setCanPrompt] = useState(false);

  // Check if already running as installed PWA
  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true;

  // Check cooldown
  const isWithinCooldown = (): boolean => {
    const last = localStorage.getItem(STORAGE_KEY);
    if (!last) return false;
    const diff = Date.now() - parseInt(last, 10);
    return diff < COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
  };

  useEffect(() => {
    if (isStandalone || isWithinCooldown()) return;

    const handler = (e: Event) => {
      e.preventDefault(); // don't show browser's default mini-bar
      setDeferredPrompt(e);
      setCanPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isStandalone]);

  const triggerInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setCanPrompt(false);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    return outcome === "accepted";
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    setCanPrompt(false);
    setDeferredPrompt(null);
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  }, []);

  return { canPrompt, isStandalone, triggerInstall, dismiss };
};
