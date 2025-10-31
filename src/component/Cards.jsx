import { title } from "framer-motion/client";

// src/component/Cards.jsx
export default function Cards({ data }) {
  return (
    <div className="h-[50vh] md:h-[70vh] w-[min(980px,92vw)] p-8 bg-white rounded-3xl drop-shadow-2xl border border-gray-100 flex  md:flex-row flex-col items-center justify-between md:justify-center">
      <div className="w-full md:p-8 md:w-1/2 h-fit gap-8 md:h-full flex flex-col justify-between">
        <h2 className="text-3xl">{data.title}</h2>
        <p className="text-sm text-gray-400">{data.subtitle}</p>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-full p-4 bg-[#F6F6F6] rounded-xl"></div>
    </div>
  );
}
