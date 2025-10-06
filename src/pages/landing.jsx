import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link2, BarChart3, Shield, Zap, Globe, QrCode } from "lucide-react";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  const features = [
    {
      icon: <Link2 className="w-8 h-8" />,
      title: "Custom Short Links",
      description: "Create memorable, branded short URLs that reflect your identity"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Track clicks, locations, and devices with detailed insights"
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Code Generation",
      description: "Automatically generate QR codes for all your shortened links"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Your links are safe with enterprise-grade security"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Instant redirects with 99.9% uptime guarantee"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global CDN",
      description: "Fast access from anywhere in the world"
    }
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center space-y-8 my-16 px-4">
        <div className="inline-block">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
            ✨ The Modern URL Shortener
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-white font-extrabold leading-tight">
          Transform Your Links
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Into Something Magical
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Shorten, customize, and track your URLs with powerful analytics. 
          Perfect for marketers, businesses, and content creators.
        </p>
      </div>

      {/* URL Shortener Form */}
      <form
        onSubmit={handleShorten}
        className="w-full md:w-3/4 lg:w-2/4 px-4 mb-16"
      >
        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-2xl">
          <Input
            type="url"
            placeholder="✨ Paste your loooong URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="flex-1 h-14 bg-transparent border-0 text-white placeholder:text-gray-500 focus-visible:ring-0 text-lg"
          />
          <Button 
            type="submit" 
            className="h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Shorten Now! 🚀
          </Button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          No credit card required • Free forever • Cancel anytime
        </p>
      </form>

      {/* Features Grid */}
      <div className="w-full px-4 md:px-11 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Why Choose Shortiffy? 🎯
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full px-4 md:px-11 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center p-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-500/30">
            <div className="text-5xl font-bold text-white mb-2">10K+</div>
            <div className="text-gray-400">Links Shortened</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30">
            <div className="text-5xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-400">Total Clicks</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-pink-600/20 to-red-600/20 rounded-2xl border border-pink-500/30">
            <div className="text-5xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full px-4 md:px-11 mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Frequently Asked Questions 💬
        </h2>
        <Accordion type="multiple" className="w-full space-y-4">
          <AccordionItem value="item-1" className="bg-gray-800/50 border border-gray-700 rounded-xl px-6 hover:border-purple-500 transition-colors">
            <AccordionTrigger className="text-white text-lg hover:text-purple-400">
              How does Shortiffy URL shortener work?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              When you enter a long URL, our system generates a shorter version of
              that URL. This shortened URL redirects to the original long URL when
              accessed. You can also customize your short links and track their performance!
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="bg-gray-800/50 border border-gray-700 rounded-xl px-6 hover:border-purple-500 transition-colors">
            <AccordionTrigger className="text-white text-lg hover:text-purple-400">
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Yes. Creating an account allows you to manage your URLs, view
              analytics, customize your short URLs, and access advanced features like QR codes and detailed click tracking.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="bg-gray-800/50 border border-gray-700 rounded-xl px-6 hover:border-purple-500 transition-colors">
            <AccordionTrigger className="text-white text-lg hover:text-purple-400">
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              You can view the number of clicks, geolocation data of the clicks,
              device types (mobile/desktop), and detailed charts showing your link performance over time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="bg-gray-800/50 border border-gray-700 rounded-xl px-6 hover:border-purple-500 transition-colors">
            <AccordionTrigger className="text-white text-lg hover:text-purple-400">
              Can I customize my short URLs?
            </AccordionTrigger>
            <AccordionContent className="text-gray-400">
              Absolutely! You can create custom branded short URLs that are memorable and professional. 
              Make your links stand out with your own custom aliases.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 md:px-11 mb-16">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started? 🎉
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Shortiffy for their link management needs.
          </p>
          <Button 
            onClick={() => navigate("/auth")}
            className="h-14 px-12 bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Create Free Account →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;