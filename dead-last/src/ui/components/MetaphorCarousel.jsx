import React, { useState } from "react";
import "./MetaphorCarousel.css";

const slides = [
  {
    title: "Introduction to HCI",
    bullets: [
      "Define Human–Computer Interaction (HCI)",
      "Discuss its importance in the tech industry",
      "Introduce the chameleon metaphor – adaptation in nature",
    ],
  },
  {
    title: "The Role of Intuitive Interfaces",
    bullets: [
      "Explain what intuitive interfaces are",
      "Discuss examples of intuitive design in technology",
      "Relate intuitive interfaces to how chameleons adapt their colors",
    ],
  },
  {
    title: "User-Centered Design Principles",
    bullets: [
      "Define user-centered design (UCD)",
      "Outline key principles of UCD",
      "Connect these principles to the chameleon’s blending mechanism",
    ],
  },
  {
    title: "Seamless User Experience (UX)",
    bullets: [
      "Define seamless user experience (UX)",
      "Discuss the impact of seamless UX on user satisfaction",
      "Use the chameleon metaphor to illustrate blending with technology",
    ],
  },
  {
    title: "Future Trends in HCI",
    bullets: [
      "Explore emerging trends in HCI",
      "Discuss the relationship between technology evolution and human adaptation",
      "Conclude with the importance of continued adaptation, similar to chameleons",
    ],
  },
];

export default function MetaphorCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : slides.length - 1));
  const next = () => setIndex((i) => (i < slides.length - 1 ? i + 1 : 0));

  return (
    <div className="carousel">
      <div className="slide">
        <h2>{slides[index].title}</h2>
        <ul>
          {slides[index].bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>

      <div className="controls">
        <button onClick={prev}>‹ Prev</button>
        <button onClick={next}>Next ›</button>
      </div>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
