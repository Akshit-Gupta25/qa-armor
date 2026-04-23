import { useCallback, useState } from "react";

interface UseMockRunnerOptions {
  onComplete?: () => void;
}

export function useMockRunner(options: UseMockRunnerOptions = {}) {
  const [isRunning, setIsRunning] = useState(false);

  const startRun = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      options.onComplete?.();
    }, 3000);
  }, [isRunning, options]);

  return { isRunning, startRun };
}
