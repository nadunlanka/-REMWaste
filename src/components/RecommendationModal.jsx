import { useState, useEffect } from 'react';

const RecommendationModal = ({ isOpen, onClose, onApplyRecommendation, skipOptionsData }) => {
    const [projectDescription, setProjectDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState('');
    useEffect(() => { if(isOpen) { setProjectDescription(''); setIsLoading(false); setRecommendation(null); setError(''); } }, [isOpen]);
    const handleGetRecommendation = async () => {
        if (!projectDescription.trim()) { setError('Please describe your project.'); return; }
        setIsLoading(true); setError(''); setRecommendation(null);
        const prompt = `You are a helpful skip hire assistant. A user needs to select a skip. Based on their project description, recommend the most suitable skip size from the list provided.
        Project Description: "${projectDescription}"
        Available Skips:
        ${skipOptionsData.map(s => `- ID: ${s.id}, Size: ${s.size}, Details: ${s.description}`).join('\n')}
        Your task is to respond with ONLY a JSON object containing "recommendedId" and "explanation". The "recommendedId" must be one of the IDs from the list. The "explanation" should be a short, friendly message (max 30 words) explaining why that size is a good fit.`;
        try {
            const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = ""; // API key is left empty as required by the environment
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            const result = await response.json();
            if (result.candidates && result.candidates[0].content.parts[0].text) {
                let textResult = result.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
                const parsedResult = JSON.parse(textResult);
                if (parsedResult.recommendedId && parsedResult.explanation && skipOptionsData.find(s => s.id === parsedResult.recommendedId)) { setRecommendation(parsedResult); } 
                else { throw new Error("Received an invalid recommendation from the AI."); }
            } else { throw new Error("Could not get a recommendation from the AI."); }
        } catch (err) { console.error(err); setError(err.message || 'An unexpected error occurred. Please try again.'); } 
        finally { setIsLoading(false); }
    };
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">&times;</button>
                <div className="flex items-center gap-3 mb-4"><SparklesIcon className="h-8 w-8 text-blue-500" /><h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Get an AI Recommendation</h2></div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Describe your project, and we'll suggest the best skip size for you.</p>
                { !recommendation && (<>
                    <textarea value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} placeholder="e.g., 'Renovating a small bathroom', 'Clearing out the garage'" className="w-full p-3 bg-white dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-800 dark:text-gray-200" rows="3" disabled={isLoading}/>
                    <Button onClick={handleGetRecommendation} disabled={isLoading}>{isLoading ? <><LoadingSpinner className="h-5 w-5 animate-spin" /><span>Analyzing...</span></> : '✨ Get Recommendation'}</Button>
                </>)}
                { error && <p className="text-red-500 text-sm mt-4">{error}</p> }
                { recommendation && (<div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-lg mt-4 text-left"><p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Our recommendation:</p><p className="text-gray-600 dark:text-gray-300">"{recommendation.explanation}"</p><Button onClick={() => onApplyRecommendation(recommendation.recommendedId)} className="w-full mt-6">Select the {skipOptionsData.find(s => s.id === recommendation.recommendedId)?.size} Skip</Button></div>)}
            </div>
        </div>
    );
};

export default RecommendationModal;
