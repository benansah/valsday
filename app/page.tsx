"use client";
import { useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const noRef = useRef<HTMLButtonElement>(null);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const isMobile = typeof window !== 'undefined' && "ontouchstart" in window;

  const moveNo = () => {
    if (!noRef.current) return;

    const card = noRef.current.closest('.card');
    if (!card) return;

    const buttonWidth = 130;
    const buttonHeight = 60;
    const margin = 15;

    // Get the card's actual inner dimensions
    const cardRect = card.getBoundingClientRect();

    // Calculate available space within the card
    const maxX = Math.max(0, cardRect.width - buttonWidth - margin);
    const maxY = Math.max(0, cardRect.height - buttonHeight - margin);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noRef.current.style.position = 'absolute';
    noRef.current.style.left = `${x}px`;
    noRef.current.style.top = `${y-300}px`;

    setStep((prev) => (prev < 2 ? prev + 1 : prev));
  };

  const yesClicked = () => {
    confetti({
      particleCount: 250,
      spread: 90,
      origin: { y: 0.6 }
    });

    alert(
      name
        ? `Then it’s settled, ${name} ❤️`
        : "Then it’s settled ❤️"
    );
  };

  if (!started) {
    return (
      <>
        <div className="background" />
        <div className="card">
          <p className="intro">Before I ask…</p>
          <input
            className="name-input"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="yes" onClick={() => setStarted(true)}>
            Continue 🌹
          </button>
        </div>
      </>
    );
  }

  const noButtonStyle = {};

  return (
    <>
      <div className="background" />

      <div className="card">
        <p className="intro">{messages[step].intro}</p>
        <p className="sub">{messages[step].sub}</p>

        <h1 className="question">
          Will you be my Valentine{ name ? `, ${name}` : "" }? ❤️
        </h1>

        <div className="buttons">
          <button className="yes" onClick={yesClicked}>
            Yes 💖
          </button>

          <button
            ref={noRef}
            className="no"
            style={noButtonStyle}
            onMouseEnter={!isMobile ? moveNo : undefined}
            onTouchStart={isMobile ? moveNo : undefined}
          >
            {step < 2 ? "No 💔" : "Still no? 😅"}
          </button>
        </div>
      </div>
    </>
  );
}

const messages = [
  {
    intro: "I won’t write a long story.",
    sub: "I just want to ask you one simple question."
  },
  {
    intro: "This took courage to send…",
    sub: "So please answer honestly."
  },
  {
    intro: "Life is short.",
    sub: "So here goes nothing."
  }
];
