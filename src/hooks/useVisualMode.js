import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (second, replace=false) => {
    if (!replace) {
      setHistory(prev => [...prev, mode]);
    }
    setMode(second);
  };

  const back = () => {
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
}
