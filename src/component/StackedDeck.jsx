// src/component/StackedDeck.jsx
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Cards from "./Cards";

const COUNT = 3;
const NUMBERS = [1, 2, 3];
const STACK_GAP = 16;
const FRAME_TOP_VH = 10; // slightly tighter pin
const FRAME_H_VH = 60; // was 76
const EXIT_DISTANCE = -80; // was -120 (shorter exit so less scroll needed)

// Give each card a modest amount of scroll space beyond the sticky frame.
// This keeps the whole section compact while still letting every card fully animate.
const PER_CARD_SCROLL_VH = 40;
// Total section height = sticky frame + a little top padding + per-card scroll budget
const SECTION_H_VH =
  FRAME_TOP_VH +
  FRAME_H_VH +
  (COUNT - 1) * (STACK_GAP / 2) +
  PER_CARD_SCROLL_VH * COUNT;

const data = [
  {
    title: "Stay motivated and reach your goals",
    subtitle:
      "SpeakTutor helps you stay motivated and accountable to reach your goals. Learning a language is better with someone by your side.",
  },
  {
    title: "Talk about anything, anytime, anywhere",
    subtitle:
      "SpeakTutor is your on-the-go conversational partner—practice any topic anytime, no matter how niche.",
  },
  {
    title: "Build a relationship with your tutor",
    subtitle:
      "SpeakTutor designs a personalized curriculum as unique as you are by getting to know you on a surprisingly deep level.",
  },
];

function DeckCard({ i, total, progress }) {
  const step = 1 / total;
  const start = i * step;
  const end = start + step;

  const y = useTransform(progress, [start, end], ["0vh", `${EXIT_DISTANCE}vh`]);
  const scale = useTransform(progress, [start, end], [1, 0.97]);

  const milestones = Array.from({ length: total + 1 }, (_, n) =>
    Math.min(1, n * step)
  );
  const scaleXOutputs = milestones.map((_, n) => 1 - Math.max(0, i - n) * 0.05);
  const scaleX = useTransform(progress, milestones, scaleXOutputs);

  const overlayAlphaOutputs = milestones.map((_, n) => {
    const stackIndex = Math.max(0, i - n);
    if (stackIndex === 0) return 0.0;
    if (stackIndex === 1) return 0.06;
    return 0.12;
  });
  const overlayAlpha = useTransform(progress, milestones, overlayAlphaOutputs);
  const overlayColor = useMotionTemplate`rgba(99, 102, 241, ${overlayAlpha})`;

  return (
    <motion.div
      className="absolute left-0 right-0 flex justify-center items-start pointer-events-none"
      style={{ top: i * STACK_GAP, y, scale, zIndex: total - i }}
    >
      <motion.div
        className="pointer-events-auto relative"
        style={{ transformOrigin: "top center", scaleX }}
      >
        <div className="relative rounded-2xl">
          <Cards data={data[i]} />
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ backgroundColor: overlayColor }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StackedDeck() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: `${SECTION_H_VH}vh` }}
    >
      <div
        className="sticky mx-auto max-w-3xl w-full flex justify-center items-start relative"
        style={{ top: `${FRAME_TOP_VH}vh`, height: `${FRAME_H_VH}vh` }}
      >
        {Array.from({ length: COUNT }).map((_, i) => (
          <DeckCard key={i} i={i} total={COUNT} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
