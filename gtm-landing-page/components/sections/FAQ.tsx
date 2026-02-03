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
    answer: 'Then we\'re working at cost. We invest in infrastructure setup and cover monthly tool costs, but we only profit on performance fees. If meetings don\'t show up, we don\'t make money. We\'re incentivized to deliver results, not send activity reports.',
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
    answer: 'If your customer LTV is under $3,000, you can\'t handle 10+ sales calls per month, or your total addressable market is under 30,000 accounts, the economics won\'t work. We\'ll tell you honestly on the call if we\'re not a fit.',
  },
]

export function FAQ() {
  return (
    <section
      data-testid="faq-section"
      className="max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-32"
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
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              data-testid={`faq-item-${item.id}`}
              className="border border-border rounded-card px-6 data-[state=open]:border-l-accent data-[state=open]:border-l-2"
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
