import Card from './ui/Card';
import { CheckCircleIcon, CircleIcon, BanIcon } from './ui/Icons';

const SkipOption = ({ option, isSelected, onSelect }) => {
    const cardClasses = isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-500 shadow-lg' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600';
    return (
        <Card onClick={() => onSelect(option.id)} className={`cursor-pointer ${cardClasses}`}>
            <div className="flex-shrink-0 bg-gray-100 dark:bg-slate-700">
                <img src={option.imageUrl} alt={`${option.size} skip`} className="w-full h-40 object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x200/cccccc/333?text=Image+Not+Found'; }}/>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1"><h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{option.size}</h3><div className="text-xl font-extrabold text-gray-900 dark:text-gray-50">£{option.price}</div></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{option.hirePeriod}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-3 flex-grow">{option.description}</p>
                {!option.roadsidePlacementAllowed && (<div className="my-2 p-2 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-md text-xs inline-flex items-center font-semibold"><BanIcon className="h-4 w-4 mr-2 flex-shrink-0" /> Not allowed on the road</div>)}
                <div className="flex items-center text-sm mt-auto pt-2">
                    {isSelected ? <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" /> : <CircleIcon className="h-5 w-5 text-gray-300 dark:text-gray-600 mr-2" />}
                    <span className={isSelected ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>{isSelected ? 'Selected' : 'Select this option'}</span>
                </div>
            </div>
        </Card>
    );
};

export default SkipOption;