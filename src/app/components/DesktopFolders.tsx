import { useState } from "react";
import { motion } from "motion/react";
import { FolderIcon } from "./DockIcons";

interface DesktopFolder {
  id: string;
  label: string;
  x: string; // CSS left
  y: string; // CSS top
}

interface DesktopFoldersProps {
  onOpenApp: (appId: string) => void;
}

const FOLDERS: DesktopFolder[] = [
  { id: "broke2broker",       label: "broke2broker",       x: "calc(100% - 200px)", y: "120px" },
  { id: "waqt",               label: "waqt",               x: "calc(100% - 120px)", y: "280px" },
  { id: "causalitychallenge", label: "causality challenge", x: "calc(100% - 170px)", y: "440px" },
];

export function DesktopFolders({ onOpenApp }: DesktopFoldersProps) {
  return (
    <>
      {FOLDERS.map((folder, i) => (
        <DesktopFolderIcon
          key={folder.id}
          folder={folder}
          delay={0.55 + i * 0.08}
          onOpen={() => onOpenApp(folder.id)}
        />
      ))}
    </>
  );
}

function DesktopFolderIcon({
  folder,
  delay,
  onOpen,
}: {
  folder: DesktopFolder;
  delay: number;
  onOpen: () => void;
}) {
  const [selected, setSelected] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 320, damping: 22 }}
      className="mobile-folder"
      style={{
        position: "fixed",
        left: folder.x,
        top: folder.y,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: "default",
        userSelect: "none",
        width: 76,
      }}
      onClick={() => setSelected(true)}
      onDoubleClick={() => {
        setSelected(false);
        onOpen();
      }}
      onBlur={() => setSelected(false)}
      tabIndex={0}
    >
      {/* Icon wrapper */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="mobile-folder-icon"
        style={{
          width: 64,
          height: 64,
          borderRadius: 10,
          padding: 2,
          background: selected ? "rgba(99,130,255,0.25)" : "transparent",
          boxShadow: selected ? "0 0 0 2px rgba(99,130,255,0.55)" : "none",
          transition: "background 0.15s, box-shadow 0.15s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mobile-folder-icon-inner" style={{ width: 60, height: 60, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.55))" }}>
          <FolderIcon label={folder.id} />
        </div>
      </motion.div>

      {/* Label */}
      <div
        className="mobile-folder-label"
        style={{
          background: selected ? "rgba(99,130,255,0.75)" : "rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: 4,
          padding: "1px 6px",
          color: "rgba(255,255,255,0.92)",
          fontSize: 11,
          fontFamily: "var(--font-sf-text, system-ui)",
          fontWeight: 400,
          textAlign: "center",
          whiteSpace: "nowrap",
          wordBreak: "normal",
          letterSpacing: "0.01em",
          textShadow: selected ? "none" : "0 1px 3px rgba(0,0,0,0.8)",
          maxWidth: 90,
          lineHeight: 1.3,
          transition: "background 0.15s",
        }}
      >
        {folder.label}
      </div>
    </motion.div>
  );
}