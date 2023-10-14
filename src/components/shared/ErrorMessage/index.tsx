type ErrorMessageProps = {
  message: string | Error;
  icon: string;
};

const ErrorMessage = ({ message, icon }: ErrorMessageProps) => {
  return <p className='error'>{`${icon} ${message}`}</p>;
};

export default ErrorMessage;
