const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300',
  secondary: 'bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300',
  success: 'bg-green-500 hover:bg-green-600 disabled:bg-green-300',
};

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
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
      text-white px-4 py-2 rounded-md
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
