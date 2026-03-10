// Real-looking SVG app icons for the macOS dock

export function FinderIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="fi-bg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#72BAFF" />
          <stop offset="100%" stopColor="#1C6EE8" />
        </linearGradient>
        <linearGradient id="fi-handle" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="100" height="100" rx="22" fill="url(#fi-bg)" />
      
      {/* Magnifying glass lens */}
      <circle cx="42" cy="42" r="22" fill="rgba(255,255,255,0.95)" stroke="rgba(30,58,138,0.3)" strokeWidth="2" />
      <circle cx="42" cy="42" r="17" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="2" />
      
      {/* Inner glass reflection */}
      <path d="M 32 35 Q 38 32 44 35" stroke="rgba(147,197,253,0.6)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="36" cy="38" r="3" fill="rgba(255,255,255,0.8)" />
      
      {/* Handle */}
      <path 
        d="M 58 58 L 75 75" 
        stroke="url(#fi-handle)" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
      <path 
        d="M 58 58 L 75 75" 
        stroke="rgba(255,255,255,0.3)" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
      
      {/* Handle shadow */}
      <path 
        d="M 59 60 L 76 77" 
        stroke="rgba(0,0,0,0.15)" 
        strokeWidth="9" 
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SafariIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="saf-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#58D8FE" />
          <stop offset="100%" stopColor="#0066FF" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#saf-bg)" />
      {/* Compass circle */}
      <circle cx="50" cy="50" r="32" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
      {/* Tick marks */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const r1 = 29, r2 = i % 2 === 0 ? 25 : 27;
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={50 + r1 * Math.sin(rad)}
            y1={50 - r1 * Math.cos(rad)}
            x2={50 + r2 * Math.sin(rad)}
            y2={50 - r2 * Math.cos(rad)}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={i % 2 === 0 ? 1.5 : 1}
          />
        );
      })}
      {/* Compass needle — red (N) */}
      <path d="M50 50 L56 32 L50 36 Z" fill="#FF3B30" />
      {/* Compass needle — white (S) */}
      <path d="M50 50 L44 68 L50 64 Z" fill="white" />
      <path d="M50 50 L56 32 L44 68 Z" fill="rgba(0,0,0,0.15)" />
      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill="white" />
      {/* Outer rim */}
      <circle cx="50" cy="50" r="32" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function VSCodeIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="vsc-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2B8FEF" />
          <stop offset="100%" stopColor="#0E52B2" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#vsc-bg)" />
      {/* VS Code logo paths */}
      <path
        d="M73.5 18L54 37.5L38.5 24.5L30 29.5L44 50L30 70.5L38.5 75.5L54 62.5L73.5 82L82 76V24L73.5 18Z"
        fill="rgba(255,255,255,0.15)"
      />
      <path
        d="M73.5 18L54 37.5L38.5 24.5L30 29.5L44 50L30 70.5L38.5 75.5L54 62.5L73.5 82L82 76V24L73.5 18Z"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
      <path d="M73.5 18L54 37.5V62.5L73.5 82L82 76V24L73.5 18Z" fill="rgba(255,255,255,0.9)" />
      <path d="M30 29.5L44 50L30 70.5L38.5 75.5L60 50L38.5 24.5L30 29.5Z" fill="white" />
    </svg>
  );
}

export function SpotifyIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="100" height="100" rx="22" fill="#191414" />
      {/* Spotify circle */}
      <circle cx="50" cy="50" r="30" fill="#1DB954" />
      {/* Sound wave lines */}
      <path d="M31 41 C40 37 56 37 68 42" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <path d="M34 52 C43 48 55 48 66 53" stroke="white" strokeWidth="5" strokeLinecap="round" />
      <path d="M37 63 C44 60 54 60 63 64" stroke="white" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="100" height="100" rx="22" fill="#161B22" />
      {/* GitHub Octocat path (simplified but recognizable) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M50 18C32.33 18 18 32.67 18 50.66C18 65.19 27.29 77.44 40.23 81.69C41.88 81.99 42.5 80.97 42.5 80.1C42.5 79.31 42.47 77.06 42.45 74.07C33.68 75.94 31.77 70 31.77 70C30.27 66.29 28.14 65.28 28.14 65.28C25.21 63.3 28.36 63.35 28.36 63.35C31.6 63.58 33.3 66.74 33.3 66.74C36.17 71.71 40.89 70.24 42.57 69.4C42.86 67.31 43.68 65.84 44.58 65.01C37.53 64.17 30.13 61.43 30.13 48.9C30.13 45.4 31.42 42.55 33.37 40.31C33.05 39.47 31.91 36.22 33.67 31.83C33.67 31.83 36.41 30.94 42.41 35.08C44.9 34.34 47.45 33.97 50 33.96C52.55 33.97 55.11 34.34 57.6 35.08C63.59 30.94 66.33 31.83 66.33 31.83C68.09 36.22 66.95 39.47 66.63 40.31C68.59 42.55 69.87 45.4 69.87 48.9C69.87 61.46 62.46 64.16 55.39 64.98C56.52 65.99 57.53 67.98 57.53 71.01C57.53 75.38 57.49 78.91 57.49 80.1C57.49 80.98 58.1 82.01 59.78 81.69C72.72 77.43 82 65.19 82 50.66C82 32.67 67.67 18 50 18Z"
        fill="white"
      />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="100" height="100" rx="22" fill="#0A66C2" />
      {/* in text */}
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize="46"
        fontWeight="700"
        fill="white"
        letterSpacing="-2"
      >
        in
      </text>
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="mail-bg" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6CB8FF" />
          <stop offset="100%" stopColor="#1877F2" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#mail-bg)" />
      {/* Envelope body */}
      <rect x="17" y="31" width="66" height="44" rx="5" fill="white" />
      {/* Envelope flap (V-fold) */}
      <path d="M17 31 L50 58 L83 31Z" fill="#D6E8FF" />
      <path d="M17 31 L50 58 L83 31" stroke="#B8D5FF" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function TerminalIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="term-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3A3A3C" />
          <stop offset="100%" stopColor="#1C1C1E" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#term-bg)" />
      {/* > prompt */}
      <path d="M22 46 L36 54 L22 62" stroke="#33FF44" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Cursor line */}
      <rect x="42" y="51" width="22" height="5" rx="2" fill="#33FF44" opacity="0.8" />
    </svg>
  );
}

export function NotionIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="100" height="100" rx="22" fill="#FAFAF8" />
      {/* Notion N logo */}
      <path
        d="M28 24H58C61 24 64 25.5 66 27.5L72 35C74 37 75 40 75 43V76C75 78.2 73.2 80 71 80H40C37.8 80 36 78.2 36 76V70H28C25.8 70 24 68.2 24 66V28C24 25.8 25.8 24 28 24Z"
        fill="white"
        stroke="#E5E5E0"
        strokeWidth="2"
      />
      {/* Page fold */}
      <path d="M63 24V36H75L63 24Z" fill="#E5E5E0" />
      {/* N letter */}
      <path
        d="M33 62V34L44 34L55 52V34H62V62H51L40 44V62H33Z"
        fill="#1A1A1A"
      />
    </svg>
  );
}

export function PhotosIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="100" height="100" rx="22" fill="#111" />
      {/* Photos pinwheel petals */}
      {/* Red */}
      <ellipse cx="50" cy="32" rx="10" ry="18" fill="#FF3B30" transform="rotate(0 50 50)" />
      {/* Orange */}
      <ellipse cx="50" cy="32" rx="10" ry="18" fill="#FF9500" transform="rotate(60 50 50)" />
      {/* Yellow */}
      <ellipse cx="50" cy="32" rx="10" ry="18" fill="#FFCC00" transform="rotate(120 50 50)" />
      {/* Green */}
      <ellipse cx="50" cy="32" rx="10" ry="18" fill="#34C759" transform="rotate(180 50 50)" />
      {/* Blue */}
      <ellipse cx="50" cy="32" rx="10" ry="18" fill="#007AFF" transform="rotate(240 50 50)" />
      {/* Purple */}
      <ellipse cx="50" cy="32" rx="10" ry="18" fill="#AF52DE" transform="rotate(300 50 50)" />
      {/* Center white */}
      <circle cx="50" cy="50" r="10" fill="white" />
    </svg>
  );
}

export function FolderIcon({ label }: { label?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={`fold-body-${label}`} x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5EB5FF" />
          <stop offset="100%" stopColor="#1A7AE8" />
        </linearGradient>
        <linearGradient id={`fold-tab-${label}`} x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#82CBFF" />
          <stop offset="100%" stopColor="#3A9FFF" />
        </linearGradient>
        <linearGradient id={`fold-shine-${label}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.30" />
          <stop offset="100%" stopColor="white" stopOpacity="0.00" />
        </linearGradient>
      </defs>

      {/* Tab (top left flap) */}
      <path
        d="M10 36 L10 30 Q10 26 14 26 L38 26 Q42 26 44 30 L47 36Z"
        fill={`url(#fold-tab-${label})`}
      />

      {/* Main folder body */}
      <rect x="10" y="34" width="80" height="52" rx="6" fill={`url(#fold-body-${label})`} />

      {/* Inner shadow line at top of body */}
      <rect x="10" y="34" width="80" height="3" rx="0" fill="rgba(0,0,0,0.10)" />

      {/* Shine overlay */}
      <rect x="10" y="34" width="80" height="26" rx="6"
        fill={`url(#fold-shine-${label})`} />

      {/* Subtle bottom reflection */}
      <rect x="14" y="78" width="72" height="5" rx="3" fill="rgba(255,255,255,0.10)" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="ig-bg" cx="30%" cy="107%" r="130%">
          <stop offset="0%" stopColor="#FED373" />
          <stop offset="25%" stopColor="#F15245" />
          <stop offset="50%" stopColor="#D92E7F" />
          <stop offset="75%" stopColor="#9B36B7" />
          <stop offset="100%" stopColor="#515BD4" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#ig-bg)" />
      {/* Outer square */}
      <rect x="22" y="22" width="56" height="56" rx="14" stroke="white" strokeWidth="5" fill="none" />
      {/* Lens circle */}
      <circle cx="50" cy="50" r="14" stroke="white" strokeWidth="5" fill="none" />
      {/* Top-right dot */}
      <circle cx="68" cy="32" r="4" fill="white" />
    </svg>
  );
}