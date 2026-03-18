import { useEffect, useState } from "react";
import { X, Download, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AUTO_DISMISS_MS = 12_000;
const SHOW_DELAY_MS = 4_000; // wait a few seconds after login before showing

const PWAInstallPrompt = () => {
  const { canPrompt, isStandalone, triggerInstall, dismiss } = usePWAInstall();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  // Delayed reveal after login
  useEffect(() => {
    if (!canPrompt || isStandalone) return;
    const show = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(show);
  }, [canPrompt, isStandalone]);

  // Auto-dismiss countdown
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) return 0;
        return p - (100 / (AUTO_DISMISS_MS / 200));
      });
    }, 200);

    const timer = setTimeout(() => handleDismiss(), AUTO_DISMISS_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [visible]);

  const handleDismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      dismiss();
    }, 300);
  };

  const handleInstall = async () => {
    const accepted = await triggerInstall();
    if (accepted) {
      setExiting(true);
      setTimeout(() => setVisible(false), 300);
    }
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]",
        "bg-slate-900 border border-white/10 rounded-2xl shadow-2xl",
        "transition-all duration-300",
        exiting
          ? "opacity-0 translate-y-4 scale-95"
          : "opacity-100 translate-y-0 scale-100"
      )}
    >
      {/* Auto-dismiss progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl overflow-hidden bg-white/5">
        <div
          className="h-full bg-blue-500/60 transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-4 pt-5">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center">
            <Smartphone className="h-5 w-5 text-blue-400" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">Get the App</p>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
              Install NALUM for faster access, offline support, and a native
              feel.
            </p>
          </div>

          {/* Close */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors p-0.5"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            onClick={handleInstall}
            size="sm"
            className="flex-1 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Install
          </Button>
          <Button
            onClick={handleDismiss}
            size="sm"
            variant="ghost"
            className="flex-1 h-8 text-xs text-gray-400 hover:text-white hover:bg-white/10"
          >
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
