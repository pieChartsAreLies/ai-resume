import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import svgPaths from '@/imports/svg-6anrar6boh';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

// Project 1 Images
import imgPowerQuality21 from "figma:asset/3e8ffe93bf6ea7d5d128b84169f9fca795318f04.png";
import imgPowerQuality11 from "figma:asset/46436a880e59d1983c65575980b30c3501c30d19.png";

// Project 2 Images
import imgResponseDashboard21 from "figma:asset/f1665a531d9140b1a9311b972bdcfbdea41d04ba.png";
import imgResponseDashboard11 from "figma:asset/a32d1ee4e55004126758cc18e732132207447af5.png";

// Project 3 Images
import imgCaseStudy001 from "figma:asset/0a3612b0ebd9324cd769d12831eb4cee15812e4b.png";
import imgCaseStudy002 from "figma:asset/a31e234ab5b4b09d86b23a38813661346776c45e.png";
import imgCaseStudy003 from "figma:asset/671585c4eebad88b63d890f0f4b92d8d2b73daf7.png";
import imgCaseStudy004 from "figma:asset/fd37f189550250c89a119eccb46ef68923f0e6fb.png";
import imgCaseStudy005 from "figma:asset/909a10ae6afd1d2c40480c93f9df4b8fa9eb98cd.png";
import imgCaseStudy006 from "figma:asset/a35d27b6f3336edec5dd91fee2c48e62970fbe1c.png";
import imgCaseStudy007 from "figma:asset/d2e8bdef90657d2de7276544f8d3f6dca61e701c.png";
import imgCaseStudy008 from "figma:asset/19f0ce715c7e44e916be30b4b81051545eb0e660.png";
import imgCaseStudy009 from "figma:asset/4e48e19c03e7aded0687222db09cd6b04a8bdc92.png";
import imgCaseStudy010 from "figma:asset/049d9c12e999ff0c3c3410e7898fb0f6b7cbda07.png";
import imgCaseStudy011 from "figma:asset/a5de8d756c8fc28c85a25505eb849dc7f0d47268.png";
import imgCaseStudy012 from "figma:asset/dfd9a0f93f29ea3fc6ab184982181017fae09cb5.png";
import imgCaseStudy013 from "figma:asset/ca6b54f74bbedda533151d6026a8b0e69527138b.png";
import imgCaseStudy014 from "figma:asset/11b361bacb50536b84df46e5894758718b5246e3.png";
import imgCaseStudy015 from "figma:asset/d37947853992e2332c09bd2e81c9342d4773005a.png";

export type ProjectType = 'power-quality' | 'demand-response' | 'case-study';

interface WorkDetailPanelProps {
  type: ProjectType;
  onClose: () => void;
  onNextProject?: () => void;
}

export function WorkDetailPanel({ type, onClose, onNextProject }: WorkDetailPanelProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const content = {
    'power-quality': {
      title: 'Power Quality Management',
      problem: 'Our clients didn’t have a simple way to see where power quality issues were occuring in there electrical systems. These issues lead to unplanned costs in the form of inefficient operations, damaged equipment, and high utility bills.',
      outcome: 'A graphical interface that resembles the electrical diagrams these users are accustomed to referencing that allows users to see real time and trending data about system performance, as well as AI generated analysis and recommendations.',
      images: [imgPowerQuality11, imgPowerQuality21]
    },
    'demand-response': {
      title: 'Demand Response Dashboard',
      problem: 'Our industrial clients didn’t have a simple way to view the performance of energy curtailment actions across facilities. Adherence to these programs can save a single facility hundreds of thousands of dollars per year, so it is crucial to monitor all aspects of these porgrams in real time.',
      outcome: 'A graphical interface that shows pertinent information like predictive analysis of peak energy use days and times, cross-facility comparisons, and performance metrics. This data can be drilled into for more detail about a specific facility’s performance, and allows regional managers to find problem facilities to address, or outstanding facilities to study.',
      images: [imgResponseDashboard11, imgResponseDashboard21]
    },
    'case-study': {
      title: 'Case Study: Mfg Admin Dashboard',
      images: [
        imgCaseStudy001, imgCaseStudy002, imgCaseStudy003, imgCaseStudy004, imgCaseStudy005,
        imgCaseStudy006, imgCaseStudy007, imgCaseStudy008, imgCaseStudy009, imgCaseStudy010,
        imgCaseStudy011, imgCaseStudy012, imgCaseStudy013, imgCaseStudy014, imgCaseStudy015
      ]
    }
  };

  const data = content[type];

  return (
    <>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-x-0 bottom-0 z-[100] flex justify-center px-4 pb-4"
      >
      <div className="bg-[#4a4a4a] w-full max-w-[650px] max-h-[90vh] overflow-y-auto rounded-[16px] shadow-[2px_-4px_30px_0px_rgba(0,0,0,0.5)] flex flex-col relative custom-scrollbar" ref={scrollContainerRef}>
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#87b7ff] origin-left z-[110]"
          style={{ scaleX, position: 'absolute' }}
        />

        {/* Header - Sticky and flush to top */}
        <div className="sticky top-0 bg-[#4a4a4a] z-10 px-6 md:px-10 pt-6 md:pt-10 pb-4 border-b border-white/5">
          <div className="flex justify-between items-start gap-4">
            <h2 className="font-['Montserrat',sans-serif] font-medium text-[24px] md:text-[31px] text-white leading-tight">
              {data.title}
            </h2>
            <button 
              onClick={onClose}
              className="flex items-center gap-2 group cursor-pointer shrink-0"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d={svgPaths.p3f70cf00} fill="white" />
                </svg>
              </div>
              <span className="font-['Montserrat',sans-serif] font-medium text-[18px] text-white group-hover:text-[#87b7ff] transition-colors">
                Back
              </span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col p-6 md:p-10 pt-6 md:pt-6">
          <div className="flex flex-col gap-6 mb-8">
            {'problem' in data && data.problem && (
              <div className="flex flex-col gap-4">
                <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] leading-relaxed">
                  <span className="font-medium text-white">Problem:</span> {data.problem}
                </p>
                <p className="font-['Montserrat',sans-serif] font-light text-[16px] text-[#d9d9d9] leading-relaxed">
                  <span className="font-medium text-white">Outcome:</span> {data.outcome}
                </p>
              </div>
            )}

            {/* Images */}
            <div className="flex flex-col gap-4">
              {data.images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className="w-full rounded-lg overflow-hidden shadow-lg border border-white/10 cursor-zoom-in hover:border-white/30 transition-colors group relative"
                >
                  <ImageWithFallback src={img} alt={`${data.title} view ${idx + 1}`} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-black/40 text-white px-3 py-1 rounded-full text-xs transition-opacity">
                      Click to zoom
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-auto flex flex-col md:flex-row gap-4 pt-8 border-t border-white/10">
            <button 
              onClick={onClose}
              className="flex-1 h-[44px] border border-white/30 rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-white text-[16px] hover:bg-white/5 transition-colors"
            >
              Close
            </button>
            {onNextProject && (
              <button 
                onClick={onNextProject}
                className="flex-1 h-[44px] border border-[#87b7ff] rounded-[50px] flex items-center justify-center font-['Montserrat',sans-serif] font-medium text-[#87b7ff] text-[16px] hover:bg-[#87b7ff]/10 transition-colors"
              >
                Next Project
              </button>
            )}
          </div>
        </div>
      </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-full max-h-full"
            >
              <ImageWithFallback src={selectedImage} alt="Zoomed view" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
              <button 
                className="absolute -top-12 right-0 text-white font-['Montserrat',sans-serif] text-lg hover:text-[#87b7ff] transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                Close Full View
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
