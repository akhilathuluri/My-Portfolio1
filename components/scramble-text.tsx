"use client";

import * as React from "react";

type ScrambleTextProps = {
  text: string;
  className?: string;
  startDelay?: number;
  duration?: number;
  stepMs?: number;
};

const RANDOM_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

function randomChar() {
  return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
}

function makeScrambled(target: string, revealCount: number) {
  let output = "";

  for (let i = 0; i < target.length; i += 1) {
    const ch = target[i];

    if (ch === " ") {
      output += " ";
      continue;
    }

    output += i < revealCount ? ch : randomChar();
  }

  return output;
}

export default function ScrambleText({
  text,
  className,
  startDelay = 0,
  duration = 1200,
  stepMs = 40,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = React.useState(text);

  React.useEffect(() => {
    const totalSteps = Math.max(1, Math.floor(duration / stepMs));
    let step = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      setDisplayText(makeScrambled(text, 0));

      intervalId = setInterval(() => {
        step += 1;
        const revealCount = Math.floor((step / totalSteps) * text.length);
        setDisplayText(makeScrambled(text, revealCount));

        if (step >= totalSteps) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          setDisplayText(text);
        }
      }, stepMs);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [duration, startDelay, stepMs, text]);

  return <span className={className}>{displayText}</span>;
}
