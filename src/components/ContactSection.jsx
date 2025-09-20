import React, { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github, Send } from "lucide-react";
import { motion } from "framer-motion";

// -------------------- Utility --------------------
const cn = (...classes) => classes.filter(Boolean).join(" ");

// -------------------- FormInput --------------------
const FormInput = React.forwardRef(
  ({ label, type = "text", name, placeholder, rows, isTextarea = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
      <div className="relative w-full">
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            rows={rows || 4}
            ref={ref}
            placeholder=" "
            className={cn(
              "w-full px-4 pt-5 pb-2 rounded-md border-b-2 border-gray-300 dark:border-gray-500",
              "bg-gray-50 dark:bg-black text-gray-900 dark:text-white",
              "placeholder-transparent focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all duration-300 resize-none"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value !== "");
            }}
            {...props}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            ref={ref}
            placeholder=" "
            className={cn(
              "w-full px-4 pt-5 pb-2 rounded-md border-b-2 border-gray-300 dark:border-gray-500",
              "bg-gray-50 dark:bg-black text-gray-900 dark:text-white",
              "placeholder-transparent focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-all duration-300"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value !== "");
            }}
            {...props}
          />
        )}

        <label
          htmlFor={name}
          className={cn(
            "absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm transition-all duration-300 pointer-events-none",
            (isFocused || hasValue) && "text-xs top-1.5 text-blue-600 dark:text-blue-400"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

// -------------------- FormButton --------------------
const FormButton = ({ children, isSubmitting, ...props }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={cn(
      "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold transition-all duration-300",
      "bg-blue-600 text-white hover:bg-blue-700",
      "dark:bg-white dark:text-black dark:hover:bg-gray-200 dark:hover:shadow-md dark:hover:-translate-y-1",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white",
      "disabled:bg-gray-400 disabled:cursor-not-allowed"
    )}
    {...props}
  >
    {isSubmitting ? "Sending..." : children}
  </button>
);

// -------------------- Contact Info --------------------
const ContactInfo = ({ icon: Icon, title, value, href }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
      <Icon className="h-6 w-6 text-blue-600 dark:text-blue-500" />
    </div>
    <div>
      <h4 className="text-2xl font-semibold">{title}</h4>
      {href ? (
        <a
          href={href}
          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">{value}</p>
      )}
    </div>
  </div>
);

// -------------------- Animations --------------------
const fadeIn = (direction = "up", distance = 30) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -distance : direction === "right" ? distance : 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
});

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// -------------------- Main Component --------------------
export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/owesuddin/", icon: Linkedin },
    { name: "Twitter", href: "https://x.com/OwesUddin", icon: Twitter },
    { name: "Instagram", href: "https://www.instagram.com/owes.uddin/", icon: Instagram },
    { name: "GitHub", href: "https://github.com/owes2005", icon: Github },
  ];

  const toast = ({ title, description }) => alert(`${title}\n${description}`);

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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        toast({ title: "Message Sent!", description: "Thank you for your message. I'll get back to you soon." });
        e.target.reset();
      } else {
        toast({ title: "Failed to send", description: "Something went wrong. Please try again." });
      }
    } catch {
      toast({ title: "Error", description: "Could not send your message. Please try again later." });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-background text-foreground">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out. I'm always open to discussing new opportunities.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Left Column */}
          <motion.div className="space-y-8" variants={fadeIn("left")}>
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <ContactInfo icon={Mail} title="Email" value="owesuddin.work@gmail.com" href="mailto:owesuddin.work@gmail.com" />
            <ContactInfo icon={Phone} title="Phone" value="+91-9010273776" href="tel:+91-9010273776" />
            <ContactInfo icon={MapPin} title="Location" value="Hyderabad, India" />

            <div className="pt-8 flex flex-col items-center w-full">
              <h4 className="text-2xl font-semibold text-center">Connect With Me</h4>
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
          </motion.div>

          {/* Right Column: Form */}
          <motion.div className="bg-white dark:bg-black p-8 rounded-lg shadow-lg" variants={fadeIn("right")}>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send a Message</h3>
            <motion.form
              className="space-y-6"
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn("up")}>
                <FormInput label="Your Name" name="name"  required />
              </motion.div>

              <motion.div variants={fadeIn("up")}>
                <FormInput type="email" label="Your Email" name="email" placeholder="@example.com" required />
              </motion.div>

              <motion.div variants={fadeIn("up")}>
                <FormInput label="Your Message" name="message" placeholder="Hello, I'd like to talk about..." isTextarea required />
              </motion.div>

              <motion.div variants={fadeIn("up")}>
                <FormButton isSubmitting={isSubmitting}>
                  Send Message <Send size={18} />
                </FormButton>
              </motion.div>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
