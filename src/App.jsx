import React, { useState, useEffect, useRef } from 'react';

import useTheme from './hooks/useTheme';
import useSkips from './hooks/useSkips';
import RecommendationModal from './components/RecommendationModal';
import SkipOption from './components/SkipOption';
import Stepper from './components/Stepper';
import StickyFooter from './components/StickyFooter';
import ThemeToggle from './components/ThemeToggle';
import Button from './components/ui/Button';
import { SparklesIcon, LoadingSpinner } from './components/ui/Icons';
 
import { PROCESS_STEPS, CURRENT_STEP_INDEX } from './config';

export default function App() {
  const [theme, setTheme] = useTheme();
  const { skipOptions, isLoading, error } = useSkips();
  const [selectedSkipId, setSelectedSkipId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainFooterRef = useRef(null);
  
  useEffect(() => {
      if (!isLoading && !error && skipOptions.length > 0 && !selectedSkipId) {
          setSelectedSkipId(skipOptions[0].id);
      }
  }, [isLoading, error, skipOptions, selectedSkipId]);

  const handleApplyRecommendation = (recommendedId) => {
      setSelectedSkipId(recommendedId);
      setIsModalOpen(false);
  };

  const handleContinue = () => {
    const selectedSkip = skipOptions.find(s => s.id === selectedSkipId);
    if (selectedSkip) alert(`Proceeding to next step with the ${selectedSkip.size}.`);
  };

  const handleBack = () => alert("Going back to the previous step."); 

  const selectedSkip = skipOptions.find(s => s.id === selectedSkipId);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen font-sans antialiased text-gray-800 dark:text-gray-200">
      <RecommendationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onApplyRecommendation={handleApplyRecommendation} skipOptionsData={skipOptions} />
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <main className="max-w-7xl mx-auto pb-20">
          <div className="flex justify-end"><ThemeToggle theme={theme} setTheme={setTheme} /></div>
          <Stepper steps={PROCESS_STEPS} currentStep={CURRENT_STEP_INDEX} />
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Choose Your Skip Size</h1>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-400">Select the skip size that best suits your needs.</p>
          </div>
          <div className="text-center mb-10">
            <Button variant="ghost" onClick={() => setIsModalOpen(true)} disabled={isLoading || !!error}>
                <SparklesIcon className="h-5 w-5 text-blue-500"/>Need help choosing?
            </Button>
          </div>
          
          {isLoading && <div className="flex justify-center items-center h-64"><LoadingSpinner className="h-12 w-12 animate-spin text-blue-600" /></div>}
          {error && <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-lg"><strong>Error:</strong> Could not load skip options. {error}</div>}
          
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {skipOptions.map((option) => (
                <SkipOption key={option.id} option={option} isSelected={selectedSkipId === option.id} onSelect={() => setSelectedSkipId(option.id)}/>
              ))}
            </div>
          )}

          <footer ref={mainFooterRef} className="border-t border-gray-200 dark:border-slate-700 pt-6">
             <p className="text-center text-xs text-gray-500 dark:text-gray-500 mb-6">Imagery and information shown may not reflect the exact shape or size specification.</p>
            <div className="flex flex-col sm:flex-row-reverse gap-4">
              <Button onClick={handleContinue} disabled={!selectedSkipId}>Continue →</Button>
              <Button onClick={handleBack} variant="secondary">Back</Button>
            </div>
          </footer>
        </main>
      </div>
      <StickyFooter footerRef={mainFooterRef} selectedSkip={selectedSkip} onContinue={handleContinue}/>
    </div>
  );
}