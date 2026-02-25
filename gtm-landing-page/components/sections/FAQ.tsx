'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { staggerItem, viewportOptions } from '@/lib/animations'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    id: 'no-meetings',
    question: 'What if I don\'t get any meetings?',
    answer: 'You don\'t pay. If meetings don\'t show up, we don\'t get paid. That\'s why we invest heavily in getting infrastructure, targeting, and messaging right before we launch a single email.',
  },
  {
    id: 'qualified-meeting',
    question: 'What counts as a "qualified" meeting?',
    answer: 'A decision-maker with budget and authority who matches your ICP and shows up to the call. Not no-shows, not tire-kickers, not people who "just want to learn more." We discuss your specific qualification criteria on the strategy call.',
  },
  {
    id: 'meeting-volume',
    question: 'How many meetings can you deliver per month?',
    answer: 'It depends on your ICP, offer, and market response. Some clients get 5-10 high-value meetings, others get 15-20+. We optimize for quality over quantity. On the strategy call, we\'ll give you realistic expectations based on your specific situation.',
  },
  {
    id: 'not-a-fit',
    question: 'Who is this NOT a fit for?',
    answer: 'If your customer LTV is under $3,000, you can\'t handle 15+ B2B sales calls per month, or you don\'t sell B2B with identifiable decision-makers, the economics won\'t work. We\'ll tell you honestly on the call if we\'re not a fit.',
  },
  {
    id: 'infrastructure',
    question: 'What\'s the infrastructure investment?',
    answer: 'We build dedicated sending infrastructure for each client - domains, inboxes, warmup, and tooling. This is a one-time investment that you own. We\'ll walk through the exact numbers on the call based on your target volume.',
  },
]

export function FAQ() {
  return (
    <section
      data-testid="faq-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-24 lg:py-36"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12 lg:mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
          Common Questions
        </h2>
        <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
          Got questions? We&apos;ve got answers.
        </p>
      </motion.div>

      {/* Accordion */}
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        variants={staggerItem}
      >
        <Accordion type="single" collapsible className="space-y-0">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              data-testid={`faq-item-${item.id}`}
              className="border-b border-border/50 px-2 data-[state=open]:border-b-accent/30"
            >
              <AccordionTrigger className="text-left text-lg font-medium text-text-primary hover:text-accent py-6">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-secondary text-base md:text-lg leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}

export default FAQ
