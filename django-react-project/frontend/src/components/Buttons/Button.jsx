const variants = {
  blue: 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300',
  gray: 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300',
  green: 'bg-green-500 hover:bg-green-600 disabled:bg-green-300',
  red: 'bg-red-500 hover:bg-red-600 disabled:bg-red-300',
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
