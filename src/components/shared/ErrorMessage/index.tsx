type ErrorMessageProps = {
  message: string;
  icon: string;
};

const ErrorMessage = ({ message, icon }: ErrorMessageProps) => {
  return <p className='error'>{`${icon} ${message}`}</p>;
};

export default ErrorMessage;
