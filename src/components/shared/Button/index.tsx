type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
