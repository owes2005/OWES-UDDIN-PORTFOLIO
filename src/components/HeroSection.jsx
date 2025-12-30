import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import profilpic from "../assets/owes_profile.jpg";

const roles = ["Full Stack Developer", "Fast Learner","Problem Solver"];

export const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000); // Change role every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      <div className="container max-w-6xl mx-auto z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Text */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm</span>
            <br />
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              OWES UDDIN
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            I'm a
            <span className="text-primary ml-2 transition-all duration-500">
              {roles[currentRole]}
            </span>
            .
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
            <a
              href="https://drive.google.com/file/d/1OIyK89VV_4qpB7beAzgKUNg5XGexkI-l/view?usp=sharing"
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
            >
              Resume
            </a>
          </div>
        </div>
         

        {/* Right: Image */}
        <div className="flex justify-center">
          <img
            src={profilpic}
            alt="Owes Uddin"
            className="rounded-full shadow-lg w-74 h-74 object-cover border-4 border-primary"
          />
        </div>
      </div>

      {/* Scroll Icon */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};