import Button from './ui/Button';
import { useState, useEffect } from 'react';
const StickyFooter = ({ selectedSkip, onContinue, footerRef }) => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const target = footerRef.current;
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => setIsVisible(!entry.isIntersecting), { threshold: 0.1 });
        observer.observe(target);
        return () => observer.unobserve(target);
    }, [footerRef]);

    if (!selectedSkip) return null;
    return (
        <div className={`fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-slate-700 p-3 sm:p-4 transition-transform duration-300 ease-in-out z-40 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="container mx-auto max-w-7xl">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Selected:</p>
                        <p className="font-bold text-gray-900 dark:text-gray-100">{selectedSkip.size} - £{selectedSkip.price}</p>
                    </div>
                    <Button onClick={onContinue}>Continue →</Button>
                </div>
                <p className="text-center text-xs text-gray-500 dark:text-gray-500 mt-2 sm:mt-1">Imagery and information shown may not reflect the exact shape or size specification.</p>
            </div>
        </div>
    );
};

export default StickyFooter;