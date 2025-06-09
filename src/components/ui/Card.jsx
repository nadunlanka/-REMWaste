const Card = ({ children, className = '', onClick }) => {
    return (
        <div onClick={onClick} className={`rounded-xl border-2 transition-all duration-200 overflow-hidden flex flex-col ${className}`}>
            {children}
        </div>
    );
};
export default Card;