const variants = {
  blue: 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300',
  gray: 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300',
  green: 'bg-green-500 hover:bg-green-600 disabled:bg-green-300',
  red: 'bg-[rgba(195,42,42,1)] hover:bg-[rgba(170,30,30,1)] disabled:bg-[rgba(195,42,42,0.5)]',
  orange: 'bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300',
};

const Button = ({
  children,
  type = 'button',
  variant = 'blue',
  className = '',
  disabled = false,
  onClick,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`
      ${variants[variant]}
      text-white px-4 py-2 rounded-md shadow-md
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
