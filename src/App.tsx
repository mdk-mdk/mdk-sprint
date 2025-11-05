import { useState, useEffect, useRef } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { CheckCircle2, ArrowLeft, Phone, Mail, TrendingUp, Target, Users, Briefcase, Wrench, Rocket, Search, Map, Package, ClipboardList, Play, Gauge, RefreshCw, MessageCircle, AlertCircle, Clock, HelpCircle, Zap, ArrowDown, UserCheck, Award, Star, Quote, BarChart3, Shield, ChevronUp, Sparkles, TrendingDown, X } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'sonner';
import logo from 'figma:asset/aa236394a85839d09501bca626eae31c5d179ec4.png';
import sprintLogo from 'figma:asset/f54119a0a6b681dad2c885bd59b2f54d53912281.png';
import sprintTextGold from 'figma:asset/7c6dbce4ffd04d54e185014e2151233310a3023d.png';
import profilePhoto from 'figma:asset/126116c592ab5780f36d5a1ac3592f903761dc7d.png';
import certificate from 'figma:asset/4b44f5944476c7e9d414812864a27414fbcf002f.png';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { FAQSection } from './components/FAQSection';

// Counter Component with Animation
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loGoralText, setLoGoralText] = useState('');
  const [gamAfText, setGamAfText] = useState('');
  
  // Typewriter effect for "לא גורל." - loops forever
  useEffect(() => {
    const text = 'לא גורל.';
    let currentIndex = 0;
    let isDeleting = false;
    
    const typewriterLoop = setInterval(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentIndex <= text.length) {
          setLoGoralText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          // Pause at end, then start deleting
          setTimeout(() => {
            isDeleting = true;
          }, 1500);
        }
      } else {
        // Deleting backward
        if (currentIndex > 0) {
          currentIndex--;
          setLoGoralText(text.slice(0, currentIndex));
        } else {
          // Pause at start, then start typing again
          setTimeout(() => {
            isDeleting = false;
          }, 500);
        }
      }
    }, isDeleting ? 80 : 120);
    
    return () => clearInterval(typewriterLoop);
  }, []);

  // Typewriter effect for "גם אם ניסית הכל ולא עבד" - loops forever
  useEffect(() => {
    const text = 'גם אם ניסית הכל ולא עבד';
    let currentIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    const typewriterLoop = setInterval(() => {
      if (isPaused) return;
      
      if (!isDeleting) {
        // Typing forward
        if (currentIndex <= text.length) {
          setGamAfText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          // Pause at end, then start deleting
          isPaused = true;
          setTimeout(() => {
            isDeleting = true;
            isPaused = false;
          }, 500);
        }
      } else {
        // Deleting backward
        if (currentIndex > 0) {
          currentIndex--;
          setGamAfText(text.slice(0, currentIndex));
        } else {
          // NO pause at start - immediately start typing again
          isDeleting = false;
        }
      }
    }, isDeleting ? 60 : 100);
    
    return () => clearInterval(typewriterLoop);
  }, []);

  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_qk163ek';
  const EMAILJS_TEMPLATE_ID = 'template_hm8xf7m';
  const EMAILJS_PUBLIC_KEY = 'wugMsIka4GQkEjZ6n';

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_phone: formData.phone,
          from_email: formData.email,
          message: `פנייה חדשה מדף הנחיתה - ספרינט פריצה בהכנסות`,
        }
      );
      
      if (result.text === 'OK') {
        toast.success('תודה! קיבלנו את הפנייה ונחזור אליך תוך 24 שעות 🎉', {
          duration: 5000,
          style: {
            background: '#059669',
            color: 'white',
            fontSize: '16px',
            padding: '16px',
          },
        });
        
        setFormData({
          name: '',
          phone: '',
          email: ''
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('אופס! משהו השתבש. נסה שוב או צור קשר בוואטסאפ', {
        duration: 5000,
        style: {
          background: '#dc2626',
          color: 'white',
          fontSize: '16px',
          padding: '16px',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '972548456062';
    const message = encodeURIComponent('היי! אני מעוניין לשמוע עוד על ספרינט פריצה בהכנסות 🚀');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm sticky top-0 z-50 border-b-2 border-[#b89c57]/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src={logo} alt="MDK" className="h-9 md:h-11" />
            </motion.div>
            
            {/* Contact Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 md:gap-3"
            >
              {/* WhatsApp Button */}
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-2 text-emerald-900 hover:text-[#25D366] transition-colors px-3 py-2 hover:bg-emerald-50 rounded-lg"
                title="צור קשר בוואטסאפ"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="hidden sm:inline">וואטסאפ</span>
              </button>
              
              {/* Email/Form Button */}
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-emerald-900 hover:text-[#b89c57] transition-colors px-3 py-2 hover:bg-emerald-50 rounded-lg"
                title="מלא טופס יצירת קשר"
              >
                <Mail className="w-5 h-5" />
                <span className="hidden sm:inline">צור קשר</span>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-16 md:py-24 overflow-hidden min-h-[75vh] flex items-center">
        {/* Background Elements - Enhanced */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Trending Up - Top Right */}
          <motion.div
            className="absolute top-20 right-[10%] opacity-5"
            animate={{ 
              y: [0, -50, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <TrendingUp size={100} className="text-white" strokeWidth={2} />
          </motion.div>
          
          {/* Rocket - Bottom Left */}
          <motion.div
            className="absolute bottom-20 left-[15%] opacity-5"
            animate={{ 
              y: [0, 50, 0],
              x: [0, 30, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket size={90} className="text-white" strokeWidth={2} />
          </motion.div>
          
          {/* Target - Top Left */}
          <motion.div
            className="absolute top-32 left-[5%] opacity-5"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <Target size={70} className="text-white" strokeWidth={2} />
          </motion.div>
          
          {/* Zap - Middle Right */}
          <motion.div
            className="absolute top-1/3 right-[5%] opacity-5"
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.05, 0.08, 0.05]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap size={85} className="text-white" strokeWidth={2} />
          </motion.div>
          
          {/* Sprint Logo - Rotating */}
          <motion.div
            className="absolute top-1/2 left-[8%] opacity-5"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <img src={sprintLogo} alt="" className="w-40" />
          </motion.div>
          
          {/* CheckCircle - Bottom Right */}
          <motion.div
            className="absolute bottom-32 right-[20%] opacity-5"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <CheckCircle2 size={75} className="text-white" strokeWidth={2} />
          </motion.div>
          
          {/* TrendingUp - Bottom Center */}
          <motion.div
            className="absolute bottom-16 left-[45%] opacity-6"
            animate={{ 
              x: [-20, 20, -20],
              y: [0, -20, 0]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <TrendingUp size={65} className="text-white" strokeWidth={2} />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            {/* Pre-headline with flowing shimmer effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12 md:mb-16"
            >
              <div className="flex gap-4 items-center justify-center text-2xl md:text-3xl lg:text-4xl"
                style={{ 
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.02em'
                }}
              >
                <motion.span
                  className="relative"
                  style={{
                    background: 'linear-gradient(90deg, #ffffff 0%, #b89c57 25%, #ffffff 50%, #b89c57 75%, #ffffff 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  מכירות?
                </motion.span>
                
                <motion.span
                  className="relative"
                  style={{
                    background: 'linear-gradient(90deg, #ffffff 0%, #b89c57 25%, #ffffff 50%, #b89c57 75%, #ffffff 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.3
                  }}
                >
                  לקוחות?
                </motion.span>
              </div>
            </motion.div>

            {/* Main Headline - Bold and Clean */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight px-4 font-black">
                <span className="block mb-4">
                  זה לא מזל. <span className="text-[#b89c57] inline-block relative min-w-[180px] md:min-w-[250px]">
                    {loGoralText}
                    <motion.span
                      className="inline-block w-1 h-12 md:h-16 bg-[#b89c57] mr-1 align-middle"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  </span>
                </span>
                <span 
                  className="text-white inline-block text-5xl md:text-7xl lg:text-8xl"
                >
                  זו שיטה!
                </span>
              </h1>
            </motion.div>
              
            {/* Sprint Branding */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative inline-block">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed px-4">
                  12 שבועות שמייצרות <span className="relative inline-block">
                    <strong>תוצאות אמיתיות</strong>
                    {/* Campaign-style brush stroke highlight */}
                    <motion.svg
                      className="absolute left-0 right-0 -bottom-2 w-full h-6"
                      viewBox="0 0 200 24"
                      preserveAspectRatio="none"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                      {/* Brush stroke with downward belly curve */}
                      <motion.path
                        d="M 2 16 Q 100 3, 198 16"
                        stroke="#b89c57"
                        strokeWidth="10"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.3"
                      />
                      <motion.path
                        d="M 1 17 Q 100 5, 199 17"
                        stroke="#b89c57"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.5"
                      />
                      <motion.path
                        d="M 3 18 Q 100 6, 197 18"
                        stroke="#b89c57"
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        opacity="0.7"
                        style={{
                          filter: 'drop-shadow(0 0 8px rgba(184,156,87,0.6))'
                        }}
                      />
                    </motion.svg>
                  </span> שנשמרות
                </h2>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="pt-12 flex flex-col gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                whileHover={{ scale: 1.08 }} 
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#b89c57] hover:bg-[#a08a4d] text-white px-12 py-8 text-2xl shadow-2xl rounded-xl group relative overflow-hidden"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="flex items-center gap-3 relative z-10">
                    <span>אני רוצה להגדיל הכנסות</span>
                    <motion.span
                      animate={{ 
                        x: [0, -5, 0],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Zap size={28} className="fill-white" />
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1
                    }}
                  />
                </Button>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Powerful Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <motion.div
                className="inline-block mb-6"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <AlertCircle className="w-20 h-20 md:w-24 md:h-24 text-emerald-900 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-emerald-900 text-4xl md:text-5xl lg:text-6xl mb-6">
                מכיר את זה?
              </h2>
              <div className="h-2 w-32 bg-gradient-to-r from-emerald-900 via-[#b89c57] to-emerald-900 mx-auto rounded-full"></div>
            </motion.div>

            {/* Pain Points Grid - Dynamic and Bold */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                { 
                  icon: TrendingDown, 
                  text: "ההכנסות לא צומחות למרות כל המאמצים", 
                  gradient: "from-emerald-900 to-emerald-800",
                  animation: { x: -80, rotate: -5 }
                },
                { 
                  icon: HelpCircle, 
                  text: "ניסית שיווק, סדנאות, טיפים… וההכנסות לא באמת זזות", 
                  gradient: "from-emerald-800 to-emerald-700",
                  animation: { x: 80, rotate: 5 }
                },
                { 
                  icon: Clock, 
                  text: "הכל עלי, ואין לי רגע לבחון מה עם ההכנסות.", 
                  gradient: "from-emerald-900 via-emerald-800 to-emerald-900",
                  animation: { y: 60, scale: 0.8 }
                },
                { 
                  icon: Zap, 
                  text: "לא מחפש עוד עצות – מחפש תוצאות", 
                  gradient: "from-emerald-800 to-emerald-900",
                  animation: { y: 60, opacity: 0 }
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: item.animation.opacity !== undefined ? item.animation.opacity : 0,
                    scale: item.animation.scale || 1,
                    y: item.animation.y || 0,
                    x: item.animation.x || 0,
                    rotate: item.animation.rotate || 0
                  }}
                  whileInView={{ opacity: 1, scale: 1, y: 0, x: 0, rotate: 0 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 150,
                    damping: 15
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  className="relative group h-full"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                  
                  {/* Card - Green Background with White Text */}
                  <div className={`relative bg-gradient-to-br ${item.gradient} rounded-2xl shadow-2xl overflow-hidden h-full flex flex-col`}>
                    {/* Gold Accent Strip */}
                    <div className="h-2 bg-[#b89c57] flex-shrink-0"></div>
                    
                    <div className="p-6 md:p-8 flex-1 flex items-center">
                      <div className="flex items-center gap-4 text-right w-full">
                        {/* Icon */}
                        <motion.div 
                          className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center order-2"
                          animate={{ 
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut" 
                          }}
                        >
                          <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </motion.div>
                        
                        {/* Text */}
                        <p className="text-white text-xl md:text-2xl leading-snug font-semibold order-1 flex-1">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Typing Effect Messages */}
            <motion.div
              className="text-center space-y-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <div className="relative inline-block">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-emerald-700/30 to-emerald-900/20 blur-xl"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.4, 0.6, 0.4],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <p className="relative text-3xl md:text-4xl lg:text-5xl text-emerald-900 min-h-[3rem] px-6 py-3 border-r-4 border-emerald-900 bg-gradient-to-l from-emerald-50/50 to-transparent shadow-lg">
                  <span className="drop-shadow-[0_2px_4px_rgba(6,78,59,0.3)]">{gamAfText}</span>
                </p>
              </div>
              <motion.p 
                className="text-4xl md:text-5xl text-[#b89c57]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
                viewport={{ once: false }}
              >
                ספרינט, אחת ולתמיד!
              </motion.p>
            </motion.div>

            {/* Solution Promise - Side by Side Design */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
                {/* First Box - 12 weeks */}
                <motion.div
                  className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-5 md:p-6 shadow-xl border-2 border-[#b89c57] relative overflow-hidden"
                  initial={{ x: -50, opacity: 0, rotate: -2 }}
                  whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-[#b89c57]/10"
                    animate={{
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <p className="text-xl md:text-2xl leading-snug text-white relative z-10">
                    <strong>12 שבועות של עבודה ממוקדת שינוי אמיתי{'    '}
                    <motion.span
                      className="inline-block text-[#b89c57]"
                      animate={{
                        scale: [1, 1.15, 1],
                        textShadow: [
                          '0 0 10px rgba(184, 156, 87, 0.5)',
                          '0 0 30px rgba(184, 156, 87, 0.9)',
                          '0 0 10px rgba(184, 156, 87, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      שלא נעצר
                    </motion.span></strong>
                  </p>
                </motion.div>

                {/* Second Box - Process description */}
                <motion.div
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-xl border-2 border-emerald-900 relative overflow-hidden"
                  initial={{ x: 50, opacity: 0, rotate: 2 }}
                  whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.7, type: "spring", stiffness: 100, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-full h-full bg-emerald-900/5"
                    animate={{
                      opacity: [0.05, 0.15, 0.05]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  />
                  <p className="text-xl md:text-2xl text-emerald-900 leading-snug relative z-10">
                    <strong>לא סדנה, לא קורס,{' '}
                    <span className="text-[#b89c57]">תהליך מדויק</span> להגדלת הכנסות ויצירת מערכת עסקית שעובדת.</strong>
                  </p>
                </motion.div>
              </div>

              {/* Animated Arrow Pointing to Button */}
              <motion.div
                className="flex justify-center pt-4"
                animate={{
                  y: [0, 10, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowDown size={48} className="text-[#b89c57]" strokeWidth={3} />
              </motion.div>

              {/* CTA Button - Centered */}
              <div className="pt-2 flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-[#b89c57] hover:bg-[#a08a4d] text-white px-12 py-7 text-2xl shadow-2xl hover:shadow-[#b89c57]/50 transition-all duration-300 relative group overflow-hidden"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="flex items-center gap-3 relative z-10">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-7 h-7" />
                    </motion.div>
                    רוצה לשמוע עוד
                    <motion.div
                      animate={{
                        x: [0, -5, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowLeft className="w-7 h-7" />
                    </motion.div>
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Compact Accordion Design */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Header with Creative Design */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6">
                איך הספרינט עובד?
              </h2>
              
              <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#b89c57] to-transparent mx-auto mb-8"></div>
              
              <p className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-6">
                זה לא קורס ולא סדנה <span className="text-[#b89c57] text-2xl md:text-3xl">זו שיטה שעובדת בשטח!</span>
              </p>
              <p className="text-white text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                במהלך 12 שבועות של ליווי צמוד, אנחנו בונים יחד תהליך מכירה מדויק,<br />
                מיישמים אותו בפועל, ומוודאים שכל צעד מייצר תוצאה אמיתית בהכנסות.
              </p>
            </motion.div>

            {/* Steps Grid - Two Columns */}
            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
                {[
                  {
                    icon: Search,
                    title: "ניתוח עומק",
                    description: "מי אתה, איפה העסק עומד, ומה עוצר את הצמיחה",
                    detail: "כולל מיפוי סל מוצרים/שירותים ומיפוי יחידות רווח.",
                    fullWidth: false
                  },
                  {
                    icon: Map,
                    title: "מפת יעדים והכנסות",
                    description: "הצבת יעדים מציאותיים ובניית תוכנית פעולה מדויקת ומעשית.",
                    detail: "",
                    fullWidth: false
                  },
                  {
                    icon: Package,
                    title: "פיתוח והצעת ערך",
                    description: "פיתוח שירותים ומוצרים, תמחור, חבילות/באנדלים, Upsell & Cross-sell.",
                    detail: "",
                    fullWidth: false
                  },
                  {
                    icon: ClipboardList,
                    title: "תוכנית מכירות ישימה",
                    description: "פעולות יומיות מותאמות אישית, שמניעות תוצאות מיידיות שנמשכות.",
                    detail: "",
                    fullWidth: false
                  },
                  {
                    icon: Play,
                    title: "יישום בשטח",
                    description: "ביצועים ותוצאות עם פידבק וליווי שוטף.",
                    detail: "",
                    fullWidth: false
                  },
                  {
                    icon: Gauge,
                    title: "דיוק והאצה",
                    description: "משפרים מה שעובד ומחזקים את התוצאות.",
                    detail: "",
                    fullWidth: false
                  },
                  {
                    icon: RefreshCw,
                    title: "הפיכה לשגרה",
                    description: "הפעולות שמייצרות הכנסות הופכות להרגל קבוע עם ניהול יציב ותוצאות צפויות.",
                    detail: "",
                    fullWidth: true
                  }
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={`step-${index}`} className={step.fullWidth ? "md:col-span-2" : ""}>
                      <Accordion type="single" collapsible>
                        <AccordionItem 
                          value={`item-${index}`}
                          className={`backdrop-blur-sm rounded-2xl border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                            step.fullWidth 
                              ? "border-[#b89c57] bg-gradient-to-r from-emerald-800 to-emerald-700" 
                              : "border-[#b89c57]/30 hover:border-[#b89c57] bg-white/95"
                          }`}
                        >
                          <AccordionTrigger className={`px-4 hover:no-underline group ${step.fullWidth ? "py-3 md:py-3" : "py-3"}`}>
                            <div className="flex items-center gap-3 w-full">
                              {/* Number Badge */}
                              <div className={`flex-shrink-0 rounded-full bg-gradient-to-br from-[#b89c57] to-[#8a7645] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform ${
                                step.fullWidth ? "w-11 h-11" : "w-9 h-9"
                              }`}>
                                <span className={`text-white ${step.fullWidth ? "text-base" : "text-sm"}`}>{index + 1}</span>
                              </div>
                              
                              {/* Icon */}
                              <div className={`flex-shrink-0 rounded-full flex items-center justify-center transition-colors ${
                                step.fullWidth 
                                  ? "bg-white/20 group-hover:bg-white/30 w-10 h-10" 
                                  : "bg-emerald-50 group-hover:bg-emerald-100 w-8 h-8"
                              }`}>
                                <Icon className={`${step.fullWidth ? "text-white w-5 h-5" : "text-emerald-700 w-4 h-4"}`} strokeWidth={2.5} />
                              </div>
                              
                              {/* Title */}
                              <div className="flex-1 text-right">
                                <h3 className={`transition-colors ${
                                  step.fullWidth 
                                    ? "text-white group-hover:text-[#b89c57] text-lg md:text-xl" 
                                    : "text-emerald-900 group-hover:text-[#b89c57]"
                                }`}>
                                  {step.title}
                                </h3>
                              </div>
                              
                              {/* Final Step Badge */}
                              {step.fullWidth && (
                                <Badge className="bg-[#b89c57] hover:bg-[#a08a4d] text-white border-0">
                                  שלב סיום
                                </Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-3">
                            <div className={`text-right ${step.fullWidth ? "pr-24 md:pr-32" : "pr-20"}`}>
                              <p className={`leading-relaxed ${
                                step.fullWidth 
                                  ? "text-white/90 text-base" 
                                  : "text-slate-700 text-sm"
                              }`}>
                                {step.description}
                              </p>
                              {step.detail && (
                                <p className={`mt-2 pt-2 border-t ${
                                  step.fullWidth 
                                    ? "text-white/80 border-white/20 text-base" 
                                    : "text-slate-600 border-[#b89c57]/20 text-sm"
                                }`}>
                                  {step.detail}
                                </p>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Closing Statement with Creative Design */}
            <motion.div
              className="text-center mt-12 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <div className="relative bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#b89c57]/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#b89c57]/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <Zap className="w-12 h-12 text-[#b89c57] mx-auto mb-4" strokeWidth={2} />
                  
                  <p className="text-[#b89c57] text-2xl md:text-3xl lg:text-4xl mb-6">
                    ספרינט קצר. תוצאה גדולה.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-[#b89c57] hover:bg-[#a08a4d] text-white px-10 py-6 text-xl shadow-2xl hover:shadow-[#b89c57]/50 transition-all duration-300"
                      onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      בואו נדבר
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-[#b89c57] px-10 py-6 text-xl"
                      onClick={openWhatsApp}
                    >
                      <MessageCircle className="ml-2" size={24} />
                      שלח וואטסאפ
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section - NEW */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-16 h-16 text-[#b89c57] mx-auto mb-6" />
              <h2 className="text-emerald-900 text-4xl md:text-5xl lg:text-6xl mb-6">
                מה תקבל בספרינט?
              </h2>
              <div className="h-1 w-32 bg-[#b89c57] mx-auto"></div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-center text-2xl text-emerald-900 mb-12 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              הגדלת הכנסות כחלק מהשגרה הקבועה!
            </motion.p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Map,
                  title: "מפת מכירות מדויקת",
                  subtitle: "תדע בדיוק מה היתרון הייחודי שלך. מה אתה מוכר. באיזה מחיר אתה מוכר. למי אתה מעוניין למכור, ולמי ממש לא.",
                  description: "תדע מראש איך תגיע ליעדים שלך."
                },
                {
                  icon: Target,
                  title: "תוכנית פעולה שמכניסה תוצאות",
                  subtitle: "לא דיבורים, צעדים.",
                  description: "תוכנית שבועית שמתרגמת מטרות להכנסות, עם מדדים ברורים שמראים התקדמות בזמן אמת."
                },
                {
                  icon: Shield,
                  title: "מבנה יציב שמחזיק הכנסות",
                  subtitle: "ניצור מערכת מכירה קבועה, חוזרת, מדידה.",
                  description: "בלי תלות במזל או במצב הרוח, אלא בשיטה שעובדת."
                },
                {
                  icon: BarChart3,
                  title: "מדידה ושיפור רציף",
                  subtitle: "כל צעד נמדד. כל פעולה נבחנת.",
                  description: "תלמד לעבוד מתוך נתונים, להבין מה באמת עובד ולחזק רק את מה שמכניס."
                },
                {
                  icon: Users,
                  title: "ליווי אישי ואימון יישומי",
                  subtitle: "ליווי אחד על אחד לכל אורך הדרך.",
                  description: "ביחד נבצע, נתקן ונשפר עד שהתוצאות מדברות בעצמן."
                },
                {
                  icon: Award,
                  title: "שליטה וביטחון עסקי",
                  subtitle: "תצא עם שקט. בהירות.",
                  description: "יכולת לדעת בכל רגע איפה אתה עומד, ומה הצעד הבא שמגדיל את ההכנסה שלך."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full border-2 border-slate-100 hover:border-[#b89c57] transition-all duration-300 shadow-lg hover:shadow-2xl">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="w-8 h-8 text-[#b89c57]" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-emerald-900 text-xl mb-2">
                        {benefit.title}
                      </h3>
                      <div className="h-0.5 w-16 bg-[#b89c57] mx-auto mb-4"></div>
                      <p className="text-slate-700 leading-relaxed mb-2">
                        {benefit.subtitle}
                      </p>
                      <p className="text-slate-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-emerald-900 hover:bg-emerald-800 text-white px-12 py-8 text-2xl shadow-2xl hover:shadow-emerald-900/50 transition-all duration-300 relative group overflow-hidden border-2 border-emerald-700"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {/* Animated background shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 border-4 border-[#b89c57] rounded-md"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <span className="flex items-center gap-4 relative z-10">
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-[#b89c57]" />
                    </motion.div>
                    
                    מעניין אותי!
                    
                    <motion.div
                      animate={{
                        x: [0, -8, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowLeft className="w-8 h-8 text-[#b89c57]" />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Bottom tagline */}
            <motion.p
              className="text-center text-2xl text-emerald-900 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              לא עובדים קשה. <span className="text-[#b89c57]">עובדים נכון!</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
              {/* Right Side - Title in Speech Bubble */}
              <motion.div
                className="lg:w-1/4 flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -40, 0] }}
                transition={{ 
                  opacity: { duration: 0.6 },
                  x: { duration: 0.6 },
                  y: {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="relative">
                  {/* Speech Bubble with Arrow */}
                  <div className="relative bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 lg:p-10 shadow-2xl">
                    {/* Decorative glow */}
                    <div className="absolute inset-0 bg-[#b89c57]/20 rounded-3xl blur-xl"></div>
                    
                    {/* Icon at top */}
                    <div className="relative z-10 flex justify-center mb-6">
                      <div className="w-16 h-16 bg-[#b89c57] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <UserCheck className="w-8 h-8 text-emerald-900" strokeWidth={2.5} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <div className="relative z-10 text-center">
                      <h2 className="text-white text-3xl md:text-4xl mb-4">
                        למי זה מתאים?
                      </h2>
                      <div className="h-1 w-24 bg-[#b89c57] mx-auto"></div>
                    </div>
                    
                    {/* Arrow pointing left (towards cards) - hidden on mobile */}
                    <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
                      <svg width="60" height="60" viewBox="0 0 60 60" className="text-emerald-900">
                        <path 
                          d="M 0 30 L 30 15 L 30 22 L 60 22 L 60 38 L 30 38 L 30 45 Z" 
                          fill="currentColor"
                          className="drop-shadow-lg"
                        />
                      </svg>
                    </div>
                    
                    {/* Arrow pointing down on mobile */}
                    <div className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full">
                      <svg width="40" height="40" viewBox="0 0 40 40" className="text-emerald-900">
                        <path 
                          d="M 20 40 L 5 10 L 13 10 L 13 0 L 27 0 L 27 10 L 35 10 Z" 
                          fill="currentColor"
                          className="drop-shadow-lg"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Left Side - 3 Clean Cards */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="relative h-full bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-12 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 text-center flex flex-col items-center justify-between h-full min-h-[320px]">
                      <div className="w-24 h-24 rounded-2xl bg-[#b89c57] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500">
                        <Users className="w-12 h-12 text-emerald-900" strokeWidth={2.5} />
                      </div>
                      
                      <div>
                        <h3 className="text-white text-3xl mb-4">
                          נותני שירות
                        </h3>
                        <div className="h-0.5 w-20 bg-[#b89c57] mx-auto mb-6"></div>
                        <p className="text-white text-xl leading-relaxed">
                          מומחים. יועצים, מטפלים שרוצים למכור/ להרוויח יותר מהשירותים שלהם.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="relative h-full bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-12 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]">
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 text-center flex flex-col items-center justify-between h-full min-h-[320px]">
                      <div className="w-24 h-24 rounded-2xl bg-[#b89c57] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500">
                        <Briefcase className="w-12 h-12 text-emerald-900" strokeWidth={2.5} />
                      </div>
                      
                      <div>
                        <h3 className="text-white text-3xl mb-4">
                          בעלי עסקים
                        </h3>
                        <div className="h-0.5 w-20 bg-[#b89c57] mx-auto mb-6"></div>
                        <p className="text-white text-xl leading-relaxed">
                          חנויות, משרדים, קבלנים ועסקים שמחפשים גידול בהכנסות.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div className="relative h-full bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-12 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]">
                    <div className="absolute top-0 left-0 w-48 h-48 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
                    
                    <div className="relative z-10 text-center flex flex-col items-center justify-between h-full min-h-[320px]">
                      <div className="w-24 h-24 rounded-2xl bg-[#b89c57] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500">
                        <Rocket className="w-12 h-12 text-emerald-900" strokeWidth={2.5} />
                      </div>
                      
                      <div>
                        <h3 className="text-white text-3xl mb-4">
                          עצמאים
                        </h3>
                        <div className="h-0.5 w-20 bg-[#b89c57] mx-auto mb-6"></div>
                        <p className="text-white text-xl leading-relaxed">
                          פרילנסרים, בעלי מוצרים דיגיטליים וכל מי שמעוניין בצמיחה אמיתית.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Uniqueness Section - NEW */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Award className="w-16 h-16 text-[#b89c57] mx-auto mb-6" />
              <h2 className="text-emerald-900 text-4xl md:text-5xl lg:text-6xl mb-6">
                למה דווקא ספרינט?
              </h2>
              <div className="h-1 w-32 bg-[#b89c57] mx-auto"></div>
            </motion.div>

            {/* Comparison Grid */}
            <div className="space-y-6">
              {[
                {
                  wrong: "לא קורס שמלמד תיאוריה",
                  right: "תהליך מעשי שמיושם בשטח"
                },
                {
                  wrong: "לא טיפים כלליים 'שמתאימים לכולם'",
                  right: "תוכנית מותאמת אישית לעסק שלך"
                },
                {
                  wrong: "לא 'תעשה את זה לבד'",
                  right: "ליווי צמוד 12 שבועות עד לתוצאות"
                },
                {
                  wrong: "לא עוד סדנה שנגמרת ואתה שוכח",
                  right: "מערכת שנשארת איתך לצמיתות"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {/* Wrong Way */}
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 flex items-center gap-4 opacity-60">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center">
                      <X className="w-6 h-6 text-slate-600" strokeWidth={3} />
                    </div>
                    <p className="text-slate-700 text-lg text-right">
                      {item.wrong}
                    </p>
                  </div>

                  {/* Right Way */}
                  <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-6 flex items-center gap-4 shadow-lg hover:shadow-2xl transition-shadow">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#b89c57] rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-900" strokeWidth={3} />
                    </div>
                    <p className="text-white text-xl font-semibold text-right">
                      {item.right}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p className="text-emerald-900 text-2xl md:text-3xl mb-6">
                <strong>ספרינט זו לא הבטחה. זו <span className="text-[#b89c57]">שיטה מוכחת</span>.</strong>
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#b89c57] hover:bg-[#a08a4d] text-white px-10 py-7 text-xl shadow-xl relative overflow-hidden group"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Rocket className="w-6 h-6 inline" />
                  </motion.span>
                  אני רוצה לנסות
                  <motion.span
                    className="inline-block mr-2"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-5 h-5 inline" />
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection openWhatsApp={openWhatsApp} />

      {/* About Me Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#b89c57] text-3xl md:text-4xl lg:text-5xl">
                מאחורי הספרינט
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Image with Name and Badge */}
              <motion.div 
                className="order-2 md:order-1"
                initial={{ opacity: 0, x: -60, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#b89c57] to-emerald-900 rounded-2xl transform rotate-3"></div>
                    <img 
                      src={profilePhoto}
                      alt="מרדכי דניאל קליין"
                      className="relative rounded-2xl shadow-2xl w-full object-cover"
                    />
                  </div>
                  
                  {/* Name */}
                  <div className="text-center">
                    <p className="text-emerald-900 text-lg md:text-xl">
                      מרדכי דניאל קליין | מומחה לאפקטיביות עסקית
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div 
                className="order-1 md:order-2 space-y-6 text-right"
                initial={{ opacity: 0, x: 60, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 90 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed text-justify">
                  ב־15 השנים האחרונות אני מלווה בעלי עסקים בתהליכי שינוי אמיתיים, מתמחה במיקוד עסקי, בבניית תהליכי מכירה שעובדים, בהגדלת הכנסות, וביצירת מומנטום עסקי.
                </p>
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed text-justify">
                  הספרינט נולד מהשטח ממאות עסקים שפועלים מדויק ואפקטיבי, וייצבו את ההכנסות שלהם לטווח ארוך.
                </p>
                <div className="bg-emerald-50 border-r-4 border-[#b89c57] p-6 rounded-lg">
                  <p className="text-emerald-900 text-xl md:text-2xl text-center">
                    <strong>המטרה שלי פשוטה, להפוך את המכירות שלך למדויקות, עקביות ורווחיות בלי תלות במזל.</strong>
                  </p>
                </div>

                {/* Stats and Certification */}
                <div className="space-y-4">
                  {/* Certification Badge - Full Width */}
                  <div className="flex justify-center">
                    <Badge 
                      variant="outline" 
                      className="border-[#b89c57] text-[#b89c57] px-6 py-3 text-sm w-full justify-center bg-gradient-to-r from-amber-50 via-white to-amber-50 cursor-pointer hover:bg-gradient-to-r hover:from-amber-100 hover:via-white hover:to-amber-100 transition-all"
                      onClick={() => setShowCertificate(true)}
                    >
                      <Award className="ml-2 h-4 w-4" />
                      חבר בלשכת היועצים העסקיים בישראל
                    </Badge>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    className="border-2 border-emerald-900 p-4 rounded-xl text-center bg-white hover:bg-emerald-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-emerald-900 text-3xl"><AnimatedCounter value={15} suffix="+" /></div>
                    <div className="text-emerald-900 text-sm mt-1">שנות ניסיון</div>
                  </motion.div>
                  
                  <motion.div 
                    className="border-2 border-[#b89c57] p-4 rounded-xl text-center bg-white hover:bg-amber-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-[#b89c57] text-3xl"><AnimatedCounter value={300} suffix="+" /></div>
                    <div className="text-[#b89c57] text-sm mt-1">עסקים שליוויתי</div>
                  </motion.div>
                  
                  <motion.div 
                    className="border-2 border-emerald-900 p-4 rounded-xl text-center bg-white hover:bg-emerald-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-emerald-900 text-3xl"><AnimatedCounter value={100} suffix="%" /></div>
                    <div className="text-emerald-900 text-sm mt-1">מחויבות להצלחה</div>
                  </motion.div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-emerald-900 hover:bg-emerald-800 text-white px-8 py-6 text-lg"
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    קבע שיחת ייעוץ
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-50 px-8 py-6 text-lg"
                    onClick={openWhatsApp}
                  >
                    <MessageCircle className="ml-2" size={20} />
                    שלח וואטסאפ
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <img src={sprintLogo} alt="" className="absolute top-10 right-10 w-32 h-32" />
          <img src={sprintLogo} alt="" className="absolute bottom-10 left-10 w-40 h-40" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
              תפסיק לחכות שזה יקרה.<br />
              תגרום לזה לקרות.
            </h2>
            
            <div className="h-1 w-24 bg-[#b89c57] mx-auto"></div>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed">
              ספרינט זו לא עוד הבטחה, <span className="text-[#b89c57] text-2xl md:text-3xl lg:text-4xl">זו שיטה</span>.
            </p>

            <motion.div
              className="pt-4"
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-[#b89c57] text-2xl md:text-3xl lg:text-4xl">
                <strong>תוכנית שמובילה לתוצאות אמיתיות!</strong>
              </p>
            </motion.div>

            <div className="pt-4">
              <p className="text-white text-2xl md:text-3xl lg:text-4xl mb-8">
                <strong>12 שבועות להכנסות שעובדות.</strong>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-[#b89c57] hover:bg-[#a08a4d] text-white px-10 py-8 text-2xl shadow-2xl"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="flex items-center gap-3">
                    <span>אני מוכן להתחיל</span>
                    <ArrowLeft size={28} />
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-emerald-900 text-3xl md:text-4xl mb-4">
                מוכן לספרינט? בואו נדבר
              </h2>
              <p className="text-slate-600 text-lg">
                השאר פרטים ואחזור אליך תוך 24 שעות
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card className="shadow-xl border-2 border-slate-100">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-slate-700 mb-2 text-right">
                        שם מלא *
                      </label>
                      <Input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="text-right"
                        placeholder="איך קוראים לך?"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-2 text-right">
                        טלפון *
                      </label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="text-right"
                        placeholder="050-1234567"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-2 text-right">
                        אימייל
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="text-right"
                        placeholder="email@example.com"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-6 text-xl"
                    >
                      {isSubmitting ? 'שולח...' : 'שלח פנייה'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <img src={logo} alt="MDK" className="h-12 mb-4" />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 text-center md:text-right">
                <button
                  onClick={openWhatsApp}
                  className="flex items-center gap-2 text-[#d4bc7e] hover:text-[#25D366] transition-colors justify-center md:justify-start"
                >
                  <MessageCircle size={20} />
                  <span>שלח וואטסאפ</span>
                </button>
                <a 
                  href="mailto:mdk@mdk.org.il" 
                  className="flex items-center gap-2 text-[#d4bc7e] hover:text-[#b89c57] transition-colors justify-center md:justify-start"
                >
                  <Mail size={20} />
                  mdk@mdk.org.il
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-white">
              <p>© 2025 MDK - דיוק ואפקטיביות עסקית. כל הזכויות שמורות.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        onClick={openWhatsApp}
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-8 h-8" strokeWidth={2} />
        
        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 0, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-right">
          שלח הודעה בוואטסאפ
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      </motion.button>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 left-6 z-50 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full p-3 shadow-xl transition-all duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: showScrollTop ? 1 : 0, 
          opacity: showScrollTop ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronUp className="w-6 h-6" strokeWidth={2.5} />
      </motion.button>
      
      {/* Certificate Dialog */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">תעודת חבר בלשכת היועצים העסקיים בישראל</DialogTitle>
            <DialogDescription className="text-center">
              תעודת הסמכה רשמית מלשכת היועצים העסקיים בישראל
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center p-4">
            <img
              src={certificate}
              alt="תעודת הסמכה - לשכת היועצים העסקיים בישראל"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Toast Notifications */}
      <Toaster position="top-center" dir="rtl" />
    </div>
  );
}
