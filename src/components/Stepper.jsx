import React from 'react';
import { CheckIcon } from './ui/Icons';
import { PROCESS_STEPS } from '../config'; // 


const Stepper = ({ steps, currentStep }) => {
    return (
        <nav aria-label="Progress" className="mb-16 mt-8">
            <ol role="list" className="flex items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step}>
                        <li className="relative flex flex-col items-center justify-start flex-shrink-0">
                            <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 font-bold transition-colors duration-300 ${index < currentStep ? 'bg-blue-600 border-blue-600' : ''} ${index === currentStep ? 'bg-white dark:bg-slate-900 border-blue-600' : ''} ${index > currentStep ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700' : ''}`}>
                                {index < currentStep ? <CheckIcon className="w-5 h-5 text-white" /> : <span className={index === currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>{index + 1}</span>}
                            </div>
                            <p className={`hidden sm:block text-center mt-2 text-xs whitespace-nowrap ${index === currentStep ? 'text-blue-600 font-bold' : 'text-gray-500 dark:text-gray-400'}`}>{step}</p>
                        </li>
                        {index < steps.length - 1 && (
                            <li className="flex-1 h-1 mx-2 bg-gray-200 dark:bg-gray-700 rounded"><div className={`h-full rounded ${index < currentStep ? 'bg-blue-600' : ''}`} /></li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Stepper;