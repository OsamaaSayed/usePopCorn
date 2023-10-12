type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="error">
      <span>❗</span>
      {`${message}`}
    </p>
  );
};

export default ErrorMessage;
