// Reusable error text to display errors in pages

interface ErrorTextProps {
  message: string;
  className?: string;
}

const ErrorText = ({ message, className }: ErrorTextProps) => {
  return (
    <p className={`${className} text-lg text-center my-8 text-red-700`}>
      {message}
    </p>
  );
};

export default ErrorText;
