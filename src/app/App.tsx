import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { MacOSLockScreen } from "./components/MacOSLockScreen";
import { MacOSDesktop } from "./components/MacOSDesktop";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="size-full relative overflow-hidden" style={{ background: "#04040f" }}>
      <AnimatePresence mode="sync">
        {!isUnlocked ? (
          <MacOSLockScreen key="lockscreen" onUnlock={() => setIsUnlocked(true)} />
        ) : (
          <MacOSDesktop key="desktop" />
        )}
      </AnimatePresence>
    </div>
  );
}