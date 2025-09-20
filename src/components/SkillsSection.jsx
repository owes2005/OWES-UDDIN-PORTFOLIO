import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Languages
  //{ name: "C", level: 60, category: "languages" },
  { name: "C++", level: 40, category: "languages" },
  { name: "Python", level: 70, category: "languages" },
  { name: "Java", level: 55, category: "languages" },
  { name: "HTML", level: 80, category: "languages" },
  { name: "CSS", level: 75, category: "languages" },
  { name: "JavaScript", level: 72, category: "languages" },

  // Frameworks & Libraries
  { name: "Bootstrap", level: 70, category: "frameworks-libraries" },
  { name: "Tailwind CSS", level: 65, category: "frameworks-libraries" },
  { name: "Pandas", level: 66, category: "frameworks-libraries" },
  { name: "NumPy", level: 64, category: "frameworks-libraries" },
  { name: "Matplotlib / Seaborn", level: 40, category: "frameworks-libraries" },
  { name: "React.js", level: 70, category: "frameworks-libraries" },
  { name: "Express.js", level: 65, category: "frameworks-libraries" },
  { name: "Node.js", level: 65, category: "frameworks-libraries" },

  // Tools
  { name: "Git", level: 85, category: "tools" },
  { name: "GitHub", level: 88, category: "tools" },
  { name: "Jupyter Notebook", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "MongoDB", level: 80, category: "tools" },
  { name: "MySQL", level: 55, category: "tools" },
  { name: "Render", level: 65, category: "tools" },
  { name: "Netlify", level: 70, category: "tools" },
  { name: "Vercel", level: 75, category: "tools" },
  { name: "PostgreSQL", level: 20, category: "tools" },
];

const categories = ["languages", "frameworks-libraries", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("languages");

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category.replace("-", " & ")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>
              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
