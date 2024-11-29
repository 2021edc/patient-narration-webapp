// Reusable loading spinner element.

interface LoadingSpinner2Props {
  color?: string;
  className?: string;
}

const LoadingSpinner2 = ({
  color = '#929AAB',
  className = '',
}: LoadingSpinner2Props) => {
  return <div className={`loader2 ${className}`} style={{ color }}></div>;
};

export default LoadingSpinner2;
