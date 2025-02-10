const variants = {
  red: 'bg-[rgba(195,42,42,1)] hover:bg-[rgba(170,30,30,1)] disabled:bg-[rgba(195,42,42,0.5)] text-white disabled:text-gray-300',
  grayDark:
    'bg-gray-600 hover:bg-gray-900 disabled:bg-gray-300 text-white disabled:text-gray-300 ',
  white: 'bg-white hover:bg-gray-300 text-gray-800 hover:text-gray-900',
};

const Button = ({
  children,
  type = 'button',
  variant = 'red',
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
       px-4 py-2 rounded-md shadow-md border border-gray-800 hover:border-gray-600 disabled:border-gray-300
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

export default Button;
