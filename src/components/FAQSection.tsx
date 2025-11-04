import { motion } from 'motion/react';
import { Button } from './ui/button';
import { HelpCircle, MessageCircle } from 'lucide-react';

interface FAQSectionProps {
  openWhatsApp: () => void;
}

export function FAQSection({ openWhatsApp }: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <HelpCircle className="w-16 h-16 text-[#b89c57] mx-auto mb-6" />
            <h2 className="text-emerald-900 text-4xl md:text-5xl lg:text-6xl mb-6">
              יש שאלות? בואו נדבר!
            </h2>
            <div className="h-1 w-32 bg-[#b89c57] mx-auto"></div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-emerald-900 hover:bg-emerald-800 text-white px-10 py-7 text-xl"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                צור קשר
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-50 px-10 py-7 text-xl"
                onClick={openWhatsApp}
              >
                <MessageCircle className="ml-2" size={24} />
                שלח וואטסאפ
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
