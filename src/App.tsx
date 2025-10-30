import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { CheckCircle2, ArrowLeft, Phone, Mail, TrendingUp, Target, Users, Briefcase, Wrench, Rocket, Search, Map, Package, ClipboardList, Play, Gauge, RefreshCw, MessageCircle, AlertCircle, Clock, HelpCircle, Zap, ArrowDown, UserCheck, Award } from 'lucide-react';
import { motion } from 'motion/react';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'sonner';
import logo from 'figma:asset/aa236394a85839d09501bca626eae31c5d179ec4.png';
import sprintLogo from 'figma:asset/f54119a0a6b681dad2c885bd59b2f54d53912281.png';
import sprintTextGold from 'figma:asset/7c6dbce4ffd04d54e185014e2151233310a3023d.png';
import profilePhoto from 'figma:asset/126116c592ab5780f36d5a1ac3592f903761dc7d.png';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  
  // Typewriter effect for "אבל נתקע" - loops forever
  useEffect(() => {
    const text = 'אבל נתקע?';
    let currentIndex = 0;
    let isDeleting = false;
    
    const typewriterLoop = setInterval(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentIndex <= text.length) {
          setTypewriterText(text.slice(0, currentIndex));
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
          setTypewriterText(text.slice(0, currentIndex));
        } else {
          // Pause at start, then start typing again
          setTimeout(() => {
            isDeleting = false;
          }, 300);
        }
      }
    }, isDeleting ? 60 : 100);
    
    return () => clearInterval(typewriterLoop);
  }, []);

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
            
            {/* Phone + CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3 md:gap-6"
            >
              {/* Phone Number */}
              <a 
                href="tel:0548456062" 
                className="flex items-center gap-2 text-emerald-900 hover:text-[#b89c57] transition-colors"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">054-8456062</span>
              </a>
              
              {/* CTA Button */}
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact-form');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#b89c57] hover:bg-[#a08847] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 whitespace-nowrap flex items-center gap-2"
              >
                <span className="hidden md:inline">הכנסות שלא נעצרות! מתחילים עכשיו</span>
                <span className="md:hidden">מתחילים עכשיו</span>
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
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
            className="absolute top-20 right-[10%] opacity-10"
            animate={{ 
              y: [0, -50, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <TrendingUp size={100} className="text-[#b89c57]" strokeWidth={2} />
          </motion.div>
          
          {/* Rocket - Bottom Left */}
          <motion.div
            className="absolute bottom-20 left-[15%] opacity-10"
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
            className="absolute top-32 left-[5%] opacity-8"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <Target size={70} className="text-[#b89c57]" strokeWidth={2} />
          </motion.div>
          
          {/* Zap - Middle Right */}
          <motion.div
            className="absolute top-1/3 right-[5%] opacity-8"
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Zap size={85} className="text-[#b89c57]" strokeWidth={2} />
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
            className="absolute bottom-32 right-[20%] opacity-8"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -15, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <CheckCircle2 size={75} className="text-[#b89c57]" strokeWidth={2} />
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
            {/* Main Headline - Bold and Clean */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl leading-tight px-4 font-black">
                חייב יותר הכנסות <span className="text-[#b89c57] whitespace-nowrap inline-block">{typewriterText}
                <motion.span
                  className="inline-block w-1 h-12 md:h-20 bg-[#b89c57] mr-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                /></span>
              </h1>
            </motion.div>
              
            {/* Pain Points - Creative Design */}
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
                <motion.div
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 bg-white/5 border-r-4 border-[#b89c57] px-6 py-3 rounded-lg hover:bg-white/10 transition-all">
                    <Clock className="w-6 h-6 text-[#b89c57] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-xl whitespace-nowrap">אין לך זמן</span>
                  </div>
                </motion.div>

                <motion.div
                  className="hidden md:block text-[#b89c57]/60 text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  •
                </motion.div>

                <motion.div
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 bg-white/5 border-r-4 border-[#b89c57] px-6 py-3 rounded-lg hover:bg-white/10 transition-all">
                    <HelpCircle className="w-6 h-6 text-[#b89c57] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-xl whitespace-nowrap">אין לך כיוון</span>
                  </div>
                </motion.div>

                <motion.div
                  className="hidden md:block text-[#b89c57]/60 text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  •
                </motion.div>

                <motion.div
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 bg-white/5 border-r-4 border-[#b89c57] px-6 py-3 rounded-lg hover:bg-white/10 transition-all">
                    <Target className="w-6 h-6 text-[#b89c57] flex-shrink-0" strokeWidth={2.5} />
                    <span className="text-white text-xl whitespace-nowrap">מאיפה מתחילים</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Sprint Branding */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white drop-shadow-[0_0_30px_rgba(184,156,87,0.5)] leading-relaxed">
                <strong>
                  <span className="block mb-4">
                    <motion.span 
                      className="text-[#b89c57] inline-block ml-3"
                      animate={{ 
                        textShadow: [
                          '0 0 20px rgba(184,156,87,0.5)',
                          '0 0 40px rgba(184,156,87,0.8)',
                          '0 0 20px rgba(184,156,87,0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ספרינט™
                    </motion.span>
                    {' – '}תהליך יישומי ומדויק
                  </span>
                  <span className="block">
                    שמגדיל{' '}
                    <motion.span 
                      className="text-[#b89c57] inline-block"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        textShadow: [
                          '0 0 10px rgba(184,156,87,0.5)',
                          '0 0 30px rgba(184,156,87,1)',
                          '0 0 10px rgba(184,156,87,0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      הכנסות
                    </motion.span>
                    {' '}ומחזיר{' '}
                    <motion.span 
                      className="text-[#b89c57] inline-block"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        textShadow: [
                          '0 0 10px rgba(184,156,87,0.5)',
                          '0 0 30px rgba(184,156,87,1)',
                          '0 0 10px rgba(184,156,87,0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    >
                      שליטה
                    </motion.span>
                    {' '}לעסק שלך
                  </span>
                </strong>
              </h2>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="pt-12 flex flex-col gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
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

              {/* Tagline */}
              <motion.p 
                className="text-white text-xl md:text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                לא תיאוריה. רק תוצאות.
              </motion.p>
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
              viewport={{ once: true }}
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
                  icon: TrendingUp, 
                  text: "רוצה להגדיל הכנסות אבל לא יודע מאיפה להתחיל?", 
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
                  text: "הכול עליך ואתה לא מצליח לעצור לרגע לבחון את ההכנסות", 
                  gradient: "from-emerald-900 via-emerald-800 to-emerald-900",
                  animation: { y: 60, scale: 0.8 }
                },
                { 
                  icon: Zap, 
                  text: "לא מחפש עוד עצות – מחפש שיטה שמביאה", 
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
                  viewport={{ once: true, amount: 0.3 }}
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

            {/* Solution Promise */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-emerald-900">
                  <span className="text-[#b89c57]">ספרינט</span> – והכל משתנה מייד!
                </h2>
              </div>
              
              <div className="h-1 w-32 bg-[#b89c57] mx-auto"></div>
              
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-[#b89c57] max-w-4xl mx-auto"
                initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-emerald-900">
                  <strong>12 שבועות של עבודה ממוקדת<br />שמייצרת שינוי אמיתי{' '}
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

              {/* New Section - Added Below Box */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-2xl md:text-3xl text-emerald-900 leading-relaxed max-w-4xl mx-auto">
                  לא סדנה, לא קורס, אלא{' '}
                  <span className="text-[#b89c57]">תהליך מדויק</span> להגדלת הכנסות ויצירת מערכת עסקית שעובדת.
                </p>
              </motion.div>

              {/* Animated Arrow Pointing to Button */}
              <motion.div
                className="flex justify-center pt-6"
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
                  className="bg-[#b89c57] hover:bg-[#a08a4d] text-white px-12 py-7 text-2xl shadow-2xl hover:shadow-[#b89c57]/50 transition-all duration-300"
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  יאללה, אני מתחיל את הספרינט!
                </Button>
              </div>
              
              {/* New Tagline - Below Button */}
              <motion.p 
                className="text-[#b89c57] text-lg md:text-xl mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                הכנסות שלא נעצרות – מתחילות עכשיו.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 md:py-24 bg-white">
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

              {/* Left Side - Bento Grid Layout */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 - Large - Spans 2 columns */}
              <motion.div
                className="md:col-span-2 group"
                initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative h-full bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-8 md:p-10 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  {/* Decorative Background Pattern */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    {/* Header with Icon - Centered */}
                    <div className="flex flex-col items-center gap-3 mb-4 text-center">
                      <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-[#b89c57] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500">
                        <Users className="w-10 h-10 text-emerald-900" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-white text-2xl md:text-3xl">
                        נותני שירות
                      </h3>
                    </div>
                    
                    {/* Two Column Grid - RTL Aligned */}
                    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">יועצים עסקיים ואסטרטגיים</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">רופאים ומטפלים</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">מאמנים אישיים ועסקיים</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">עורכי דין ורואי חשבון</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">מעצבים ואדריכלים</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">מומחים בתחומים שונים</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Small - 1 column */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: -60, x: 40 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 120 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative h-full bg-[#b89c57] rounded-2xl p-10 md:p-12 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-900/20 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-emerald-900 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500">
                      <Briefcase className="w-12 h-12 text-[#b89c57]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-emerald-900 text-3xl mb-4">
                      בעלי עסקים
                    </h3>
                    <p className="text-emerald-900/80 text-lg leading-relaxed">
                      חנויות, משרדים וכל מי שמוכר מוצרים או פתרונות.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 - Small - 1 column */}
              <motion.div
                className="group"
                initial={{ opacity: 0, y: 80, rotate: 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.25, type: "spring", stiffness: 100 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative h-full bg-[#b89c57] rounded-2xl p-10 md:p-12 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-900/20 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-emerald-900 flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500">
                      <Wrench className="w-12 h-12 text-[#b89c57]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-emerald-900 text-3xl mb-4">
                      אנשי מקצוע
                    </h3>
                    <p className="text-emerald-900/80 text-lg leading-relaxed">
                      קבלנים, משפצים, מתקינים ובעלי מקצוע מהשטח.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 4 - Large - Spans 2 columns */}
              <motion.div
                className="md:col-span-2 group"
                initial={{ opacity: 0, x: -70, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.35, type: "spring", stiffness: 110 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative h-full bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-8 md:p-10 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  {/* Decorative Background Pattern */}
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10">
                    {/* Header with Icon - Centered */}
                    <div className="flex flex-col items-center gap-3 mb-4 text-center">
                      <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-[#b89c57] flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-500">
                        <Rocket className="w-10 h-10 text-emerald-900" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-white text-2xl md:text-3xl">
                        כל מי שרוצה לצמוח
                      </h3>
                    </div>
                    
                    {/* Two Column Grid - RTL Aligned */}
                    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">סטארטאפים וחברות צומחות</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">בעלי קורסים ותכנים</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">פרילנסרים ועצמאים מנוסים</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">כל מי שמוכן להשקיע בצמיחה</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">בעלי עסקים משפחתיים</p>
                      </div>
                      <div className="flex items-start gap-2 text-right">
                        <CheckCircle2 className="w-5 h-5 text-[#b89c57] flex-shrink-0 mt-0.5" />
                        <p className="text-emerald-50">עסקים שרוצים פריצת דרך</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Creative Timeline Design */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b89c57]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Header with Creative Design */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#b89c57]/20 backdrop-blur-sm rounded-full px-8 py-3 mb-6">
                <span className="text-[#b89c57] text-lg">12 שבועות של שינוי אמיתי</span>
              </div>
              
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

            {/* Journey Title */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-[#b89c57] text-2xl md:text-3xl lg:text-4xl">
                המסע שלך בספרינט:
              </h3>
            </motion.div>

            {/* Creative Timeline with Vertical Line */}
            <div className="relative max-w-5xl mx-auto">
              {/* Vertical Golden Line - Hidden on mobile */}
              <div className="hidden md:block absolute right-1/2 translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#b89c57] via-[#b89c57]/50 to-[#b89c57]"></div>

              {/* Timeline Steps */}
              <div className="space-y-12 md:space-y-16">
                {[
                {
                  icon: Search,
                  title: "ניתוח עומק",
                  description: "מי אתה, איפה העסק עומד, ומה עוצר את הצמיחה",
                  detail: "כולל מיפוי סל מוצרים/שירותים ויחידות רווח.",
                  color: "blue",
                  side: "right"
                },
                {
                  icon: Map,
                  title: "מפת יעדים והכנסות",
                  description: "הצבת יעדים מציאותיים ובניית תוכנית פעולה מדויקת ומעשית.",
                  detail: "",
                  color: "emerald",
                  side: "left"
                },
                {
                  icon: Package,
                  title: "פיתוח והצעת ערך",
                  description: "פיתוח שירותים ומוצרים, תמחור, חבילות/באנדלים, Upsell & Cross-sell.",
                  detail: "",
                  color: "purple",
                  side: "right"
                },
                {
                  icon: ClipboardList,
                  title: "תוכנית מכירות ישימה",
                  description: "פעולות יומיות מותאמות אישית, שמניעות תוצאות מיידיות שנמשכות.",
                  detail: "",
                  color: "amber",
                  side: "left"
                },
                {
                  icon: Play,
                  title: "יישום בשטח",
                  description: "ביצועים ותוצאות עם פידבק וליווי שוטף.",
                  detail: "",
                  color: "red",
                  side: "right"
                },
                {
                  icon: Gauge,
                  title: "דיוק והאצה",
                  description: "משפרים מה שעובד ומחזקים את התוצאות.",
                  detail: "",
                  color: "indigo",
                  side: "left"
                },
                {
                  icon: RefreshCw,
                  title: "הפיכה לשגרה",
                  description: "הפעולות שמייצרות הכנסות הופכות להרגל קבוע עם ניהול יציב ותוצאות צפויות.",
                  detail: "",
                  color: "teal",
                  side: "right"
                }
              ].map((step, index) => {
                const animations = [
                  { x: -100, rotate: -8, scale: 0.7 },
                  { x: 100, rotate: 8, scale: 0.7 },
                  { y: 80, scale: 0.8, opacity: 0 },
                  { x: -90, y: 40, rotate: -5 },
                  { x: 90, y: -30, rotate: 5 },
                  { y: 70, scale: 0.85 },
                  { x: -80, scale: 0.9, opacity: 0.3 }
                ];
                const anim = animations[index] || { y: 50 };
                
                return (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${
                      step.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ 
                      opacity: anim.opacity !== undefined ? anim.opacity : 0,
                      x: anim.x || 0,
                      y: anim.y || 0,
                      scale: anim.scale || 1,
                      rotate: anim.rotate || 0
                    }}
                    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.7, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {/* Spacer for alternating layout on desktop */}
                    <div className="hidden md:block flex-1"></div>

                    {/* Center Icon with Number */}
                    <div className="relative flex-shrink-0 z-20">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Large decorative number in background */}
                        <div className="absolute -top-8 -right-8 text-9xl font-black text-[#b89c57]/10 select-none">
                          {index + 1}
                        </div>
                        
                        {/* Icon Circle */}
                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#b89c57] to-[#8a7645] flex items-center justify-center shadow-2xl border-4 border-white/20">
                          <step.icon className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={2.5} />
                          
                          {/* Small number badge */}
                          <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-emerald-900 border-2 border-[#b89c57] rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-[#b89c57] font-black text-lg">{index + 1}</span>
                          </div>
                        </div>

                        {/* Pulse effect */}
                        <div className="absolute inset-0 rounded-full bg-[#b89c57]/30 animate-ping opacity-75"></div>
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1">
                      <motion.div
                        className={`relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-[#b89c57]/20 hover:border-[#b89c57] transition-all duration-300 ${
                          step.side === 'left' ? 'md:text-left' : 'md:text-right'
                        } text-right group`}
                        whileHover={{ scale: 1.02, y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Decorative corner accent */}
                        <div className={`absolute top-0 ${step.side === 'left' ? 'left-0' : 'right-0'} w-20 h-20 bg-gradient-to-br from-[#b89c57]/20 to-transparent rounded-tl-3xl ${step.side === 'right' ? 'rounded-tr-3xl rounded-tl-none' : ''}`}></div>
                        
                        <div className="relative z-10">
                          <h4 className="text-emerald-900 text-2xl md:text-3xl mb-3 group-hover:text-[#b89c57] transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-slate-700 text-lg md:text-xl leading-relaxed mb-2">
                            {step.description}
                          </p>
                          {step.detail && (
                            <p className="text-slate-600 leading-relaxed mt-3 pt-3 border-t border-[#b89c57]/20">
                              {step.detail}
                            </p>
                          )}
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#b89c57]/0 to-[#b89c57]/0 group-hover:from-[#b89c57]/5 group-hover:to-transparent transition-all duration-300"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
              </div>
            </div>

            {/* Closing Statement with Creative Design */}
            <motion.div
              className="text-center mt-20 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#b89c57]/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-[#b89c57]/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <Zap className="w-16 h-16 text-[#b89c57] mx-auto mb-6" strokeWidth={2} />
                  
                  <p className="text-[#b89c57] text-3xl md:text-4xl lg:text-5xl mb-8">
                    ספרינט קצר. תוצאות אמיתיות שנשארות.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-[#b89c57] hover:bg-[#a08a4d] text-white px-10 py-7 text-xl shadow-2xl hover:shadow-[#b89c57]/50 transition-all duration-300"
                      onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      בואו נתחיל!
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-[#b89c57] px-10 py-7 text-xl"
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

      {/* About Me Section */}
      <section className="py-16 md:py-24 bg-white">
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
                  <p className="text-emerald-900 text-xl md:text-2xl">
                    <strong>המטרה שלי פשוטה:</strong> להפוך את המכירות שלך למדויקות, עקביות ורווחיות בלי תלות במזל.
                  </p>
                </div>

                {/* Stats and Certification */}
                <div className="space-y-4">
                  {/* Certification Badge - Full Width */}
                  <div className="flex justify-center">
                    <Badge variant="outline" className="border-[#b89c57] text-[#b89c57] px-6 py-3 text-sm w-full justify-center bg-gradient-to-r from-amber-50 via-white to-amber-50">
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
                    <div className="text-emerald-900 text-3xl">15+</div>
                    <div className="text-emerald-900 text-sm mt-1">שנות ניסיון</div>
                  </motion.div>
                  
                  <motion.div 
                    className="border-2 border-[#b89c57] p-4 rounded-xl text-center bg-white hover:bg-amber-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-[#b89c57] text-3xl">300+</div>
                    <div className="text-[#b89c57] text-sm mt-1">עסקים שליוויתי</div>
                  </motion.div>
                  
                  <motion.div 
                    className="border-2 border-emerald-900 p-4 rounded-xl text-center bg-white hover:bg-emerald-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-emerald-900 text-3xl">100%</div>
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
                    צור קשר
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
                בואו נתחיל
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
              
              <div className="flex flex-col md:flex-row gap-6 text-center md:text-right">
                <a 
                  href="mailto:mdk@mdk.org.il" 
                  className="flex items-center gap-2 text-[#d4bc7e] hover:text-[#b89c57] transition-colors"
                >
                  <Mail size={20} />
                  mdk@mdk.org.il
                </a>
                <a 
                  href="tel:054-8456062" 
                  className="flex items-center gap-2 text-[#d4bc7e] hover:text-[#b89c57] transition-colors"
                >
                  <Phone size={20} />
                  054-8456062
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-emerald-100">
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
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          שלח הודעה בוואטסאפ
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </div>
      </motion.button>
      
      {/* Toast Notifications */}
      <Toaster position="top-center" dir="rtl" />
    </div>
  );
}
