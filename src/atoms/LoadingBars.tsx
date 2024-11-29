interface LoadingBarsProps {
  className?: string;
}

const LoadingBars = ({ className }: LoadingBarsProps) => {
  return <div className={`loader-bars ${className}`}></div>;
};

export default LoadingBars;
