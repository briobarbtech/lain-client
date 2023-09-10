import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function TextToSpeech() {
  const context = useContext(AppContext);
  const speakMessage = () => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(context.voice);
      window.speechSynthesis.speak(speech);
    } else {
      console.error("La síntesis de voz no es compatible con este navegador.");
    }
  };
  useEffect(() => {
    speakMessage();
  }, [context.voice]);
  return (
    <div>
      
    </div>
  );
}

export default TextToSpeech;
