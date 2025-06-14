import { useState, useEffect } from 'react';
import { ChevronDown, Upload, Brain, BarChart3, Shield, Zap, Users, ArrowRight, Menu, X, CheckCircle, Star } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({
    hero: true, // Hero should be visible immediately
    features: false,
    'how-it-works': false,
    benefits: false,
    testimonials: false
  });

  const testimonials = [
    {
      name: "Dr. Hammadi Nabila",
      role: "Geologist",
      content: "Drill Rock has revolutionized our lithology analysis workflow. What used to take days now takes minutes with better coming accuracy.",
      rating: 5
    },
    {
      name: "Algerian Startups Minster",
      role: "",
      content: "This Project Should Continue.",
      rating: 5
    },

  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Analysis",
      description: "Get accurate lithology predictions in seconds, not hours"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Recognition",
      description: "Advanced machine learning algorithms trained on millions of samples"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detailed Analytics",
      description: "Comprehensive reports with confidence scores and visual insights"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with on-premises deployment options"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const sections = ['features', 'how-it-works', 'benefits', 'testimonials'];
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    // Fallback: trigger animations on scroll if intersection observer fails
    const handleScroll = () => {
      const sections = ['features', 'how-it-works', 'benefits', 'testimonials'];
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
          if (isInViewport) {
            setIsVisible(prev => ({
              ...prev,
              [id]: true
            }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const NavBar = () => (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-gray-900" />
            </div>
            <span className="text-xl font-bold text-white">Drill Rock</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-yellow-400 transition-colors">How It Works</a>
            <a href="#testimonials" className="text-gray-300 hover:text-yellow-400 transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors">Contact</a>

          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Features</a>
            <a href="#how-it-works" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">How It Works</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Testimonials</a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Contact</a>
            <button className="w-full mt-2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold">
              Request Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  const Hero = () => (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Revolutionizing
              <span className="text-yellow-400 block">Lithology Detection</span>
              with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your geological analysis with cutting-edge AI technology. 
              Get instant, accurate lithology recognition from rock samples and core images.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 flex items-center justify-center group">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-8 shadow-2xl">
                <div className="bg-gray-900 rounded-lg p-6 text-center">
                  <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <div className="text-white text-lg font-semibold mb-2">AI Analysis Complete</div>
                  <div className="text-gray-300 text-sm mb-4">Sample: Sandstone Core #47</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Confidence:</span>
                      <span className="text-yellow-400 font-semibold">94.7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Processing Time:</span>
                      <span className="text-yellow-400 font-semibold">2.3s</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-yellow-400" />
      </div>
    </section>
  );

  const Features = () => (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Geology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced AI technology meets geological expertise to deliver unprecedented accuracy and speed
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-yellow-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const HowItWorks = () => (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple, fast, and accurate in just three steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Upload className="w-12 h-12" />, title: "Upload Sample", desc: "Upload your rock sample images or core photos" },
            { icon: <Brain className="w-12 h-12" />, title: "AI Analysis", desc: "Our AI processes and analyzes your geological data" },
            { icon: <BarChart3 className="w-12 h-12" />, title: "Get Results", desc: "Receive detailed lithology reports with confidence scores" }
          ].map((step, index) => (
            <div
              key={index}
              className={`text-center relative transition-all duration-1000 ${
                isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-yellow-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-yellow-600">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 text-lg">{step.desc}</p>
              {index < 2 && (
                <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-yellow-400 transform translate-x-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Benefits = () => (
    <section className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible.benefits ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose <span className="text-yellow-400">Drill Rock</span>?
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Fast, Accurate Predictions</h3>
                  <p className="text-gray-300">Get results in seconds with 95%+ accuracy backed by machine learning</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Seamless Integration</h3>
                  <p className="text-gray-300">Works with your existing GIS systems and laboratory workflows</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Cloud or On-Premises</h3>
                  <p className="text-gray-300">Deploy in the cloud or on your own infrastructure for maximum security</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible.benefits ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gray-700 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">95%+</div>
                  <div className="text-gray-300">Accuracy Rate</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">2.3s</div>
                  <div className="text-gray-300">Avg. Processing</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">1M+</div>
                  <div className="text-gray-300">Samples Analyzed</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600">Trusted by leading geological organizations worldwide</p>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl text-gray-700 mb-6 italic">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeTestimonial ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const CTA = () => (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Geological Analysis?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of professionals who trust Drill Rock for accurate lithology detection
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105">
            Start Free Trial
          </button>
          <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 hover:text-gray-900 transition-all">
            Schedule Demo
          </button>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-xl font-bold">Drill Rock</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advanced AI-powered lithology recognition for the modern geological industry.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">API</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Drill Rock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <Features />
      <HowItWorks />
      <div id="benefits">
        <Benefits />
      </div>
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default App;