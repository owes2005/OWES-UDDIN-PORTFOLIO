import React, { useState } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Twitter,
} from "lucide-react";

// Utility to join classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Simple toast hook (logs + alerts)
const useToast = () => {
  return {
    toast: ({ title, description }) => {
      console.log(`Toast: ${title} - ${description}`);
      alert(`${title}\n${description}`);
    },
  };
};

export default function App() {
  return (
    <div className="bg-background text-foreground">
      <ContactSection />
    </div>
  );
}

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Send email using Web3Forms API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append("access_key", "fbb1f129-81b1-4cd6-b845-15d0f9651f0c"); 

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        e.target.reset();
      } else {
        toast({
          title: "Failed to send",
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send your message. Please try again later.",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="py-24 px-4 relative bg-background text-foreground"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-left">Email</h4>
                  <a
                    href="mailto:owesuddin.work@gmail.com"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  >
                    owesuddin.work@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-left">Phone</h4>
                  <a
                    href="tel:+91-9010273776"
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  >
                    +91-9010273776
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                </div>
                <div>
                  <h4 className="text-2xl font-semibold text-left">Location</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Hyderabad, India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 flex flex-col items-center w-full">
              <h4 className="text-2xl font-semibold text-center">
                Connect With Me
              </h4>
              <div className="flex space-x-4 mt-0 justify-center">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-transform duration-300 hover:scale-110"
                    aria-label={link.name}
                  >
                    <link.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
              Send a Message
            </h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  placeholder="your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                  placeholder="@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:text-white"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md text-white font-semibold transition-all duration-300",
                  "bg-blue-600 hover:bg-blue-700",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                  "disabled:bg-blue-400 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Social links
const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/owesuddin/",
    icon: Linkedin,
  },
  { name: "Twitter", href: "https://x.com/OwesUddin", icon: Twitter },
  {
    name: "Instagram",
    href: "https://www.instagram.com/owes.uddin/",
    icon: Instagram,
  },
  { name: "GitHub", href: "https://github.com/owes2005", icon: Github },
];
