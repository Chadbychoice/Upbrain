import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ComicPanel from '../components/ComicPanel';
import { Brain, Zap, Dumbbell, Layout } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Knowledge: React.FC = () => {
  const [activeTab, setActiveTab] = useState('science');
  
  const articles = {
    science: {
      title: "The Science of Habit Change",
      icon: Brain,
      content: `
# Rewiring Your Neural Pathways

When you engage in any behavior repeatedly, your brain forms neural pathways that make this behavior automatic. This is how habits form - both good and bad ones.

## The Habit Loop

The habit loop consists of three main components:

1. **Trigger** - The cue that initiates the behavior
2. **Routine** - The behavior itself
3. **Reward** - The benefit you get from the behavior

To break a negative habit, you need to identify these components and replace the routine with something healthier while keeping the same trigger and reward.

> **SCIENCE FACT:** Research shows that it takes about 66 days (not just 21!) to form a new habit fully.
      `
    },
    strategies: {
      title: "Effective Strategies",
      icon: Zap,
      content: `
# Proven Strategies That Work

Breaking free from unwanted habits requires both planning and persistence. Here are science-backed approaches:

## Implementation Intentions

Research shows that planning exactly *when* and *where* you'll take a specific action dramatically increases success rates.

**Example:** "When I feel an urge, I will immediately go for a 5-minute walk outside."

## Habit Stacking

Connect new behaviors to existing routines to make them stick:

1. **Identify a current habit** you do daily
2. **Stack your new behavior** right after the existing one
3. **Keep consistent** until it becomes automatic

> **PRO TIP:** The most effective way to overcome urges is to have pre-planned responses ready to go immediately.
      `
    },
    exercises: {
      title: "Daily Exercises",
      icon: Dumbbell,
      content: `
# Mind & Body Strengthening

Regular exercises that build your mental resilience and physical discipline:

## Urge Surfing (3-5 minutes)

When an urge hits:
1. Close your eyes and breathe deeply
2. Notice the sensations in your body without judgment
3. Visualize the urge as a wave that rises, peaks, and then subsides
4. Remind yourself that urges always pass, typically within 15 minutes

## Values Reflection (5 minutes daily)

1. Write down your top 3 values (e.g., health, integrity, family)
2. For each value, note one way your current choices align with it
3. Visualize how quitting porn supports these values

> **REMEMBER:** Urges are temporary, but the benefits of overcoming them last forever.
      `
    },
    success: {
      title: "Success Stories",
      icon: Layout,
      content: `
# Real Stories of Transformation

*"After struggling with porn addiction for 7 years, I committed to a 90-day reboot. The first two weeks were the hardest, but by month two, I noticed significant improvements in my energy levels, social confidence, and overall mood. Now 6 months clean, my relationship with my partner has never been better."* - Alex, 29

*"I used to rely on porn as a stress relief, which only made my anxiety worse over time. Using the minigame feature in this app as an immediate replacement helped break that connection. Four months later, I have better coping strategies and much less anxiety."* - Jordan, 25

> **ENCOURAGEMENT:** Every person featured here started exactly where you are now - with the decision to make a change and take it one day at a time.
      `
    }
  };
  
  const activeArticle = articles[activeTab as keyof typeof articles];
  
  return (
    <div className="space-y-6">
      <header className="text-center">
        <motion.h1 
          className="font-bangers text-4xl md:text-6xl text-primary mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          KNOWLEDGE BASE
        </motion.h1>
        <p className="font-comic text-xl text-comic-black">
          Learn the science and strategies to rewire your brain
        </p>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(articles).map(([key, article]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`
              comic-btn font-comic flex items-center justify-center 
              ${activeTab === key ? 'bg-secondary' : 'bg-comic-gray-700'}
              ${activeTab === key ? 'shadow-[5px_5px_0px_#000]' : 'shadow-[3px_3px_0px_#000]'}
            `}
          >
            <article.icon size={20} className="mr-2 hidden md:inline" />
            {article.title.split(' ')[0]}
          </button>
        ))}
      </div>
      
      <ComicPanel className="bg-comic-white">
        <div className="flex items-center mb-4">
          <activeArticle.icon size={32} className="text-primary mr-3" />
          <h2 className="font-bangers text-3xl text-primary">
            {activeArticle.title}
          </h2>
        </div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="prose prose-lg max-w-full"
        >
          <div className="markdown-content font-comic">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="font-bangers text-3xl text-secondary my-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="font-bangers text-2xl text-primary my-3" {...props} />,
                h3: ({node, ...props}) => <h3 className="font-bangers text-xl text-accent my-2" {...props} />,
                p: ({node, ...props}) => <p className="font-comic text-lg my-4" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 my-4" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-4" {...props} />,
                li: ({node, ...props}) => <li className="font-comic my-2" {...props} />,
                blockquote: ({node, ...props}) => (
                  <div className="comic-panel bg-accent my-4 p-4" {...props} />
                ),
              }}
            >
              {activeArticle.content}
            </ReactMarkdown>
          </div>
        </motion.div>
      </ComicPanel>
    </div>
  );
};

export default Knowledge;