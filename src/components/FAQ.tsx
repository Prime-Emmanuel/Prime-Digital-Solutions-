import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Absolutely. We view launch as the beginning, not the end. We offer dedicated support retainers, ongoing performance optimization, and regular structural updates to ensure your digital platform scales alongside your business."
  },
  {
    question: "How do you handle project pricing?",
    answer: "Our pricing is value-based and transparent. We don't believe in hidden fees. After our initial discovery phase, we provide a customized proposal detailing the exact scope, timeline, and investment required to achieve your specific objectives."
  },
  {
    question: "Can I host my website/app on my own servers?",
    answer: "Yes. While we provide premium, fully managed cloud hosting solutions customized for performance and security, you maintain full ownership of your code and can choose to self-host if your infrastructure requires it."
  },
  {
    question: "What if I already have a design and just need development?",
    answer: "We frequently partner with internal design teams or external agencies. We can take your existing Figma files or prototypes and engineer them into robust, high-performance applications with exact precision."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines vary based on scope and complexity. A standard corporate website might take 4-6 weeks, while a custom web application or e-commerce platform generally requires 2-4 months from initial strategy to final deployment."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-zinc-950 relative z-10 rounded-[2rem] md:rounded-[3rem] my-16 mx-4 md:mx-8 lg:mx-12 border border-white/10 shadow-2xl">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm font-semibold tracking-widest text-indigo-400 uppercase mb-4 inline-block drop-shadow-md">
            Clarity & Confidence
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
            Frequently Asked <span className="text-zinc-500">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/5 shadow-[0_0_30px_rgba(34,211,238,0.05)]' : 'bg-transparent hover:bg-white/[0.02]'}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-zinc-200 pr-8">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${openIndex === index ? 'border-cyan-500/50 text-cyan-400 bg-cyan-400/10' : 'border-white/20 text-zinc-400'}`}>
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-zinc-400 font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
