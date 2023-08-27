import { ProgressBar } from 'react-loader-spinner';

const Loader = () => {
  return (
    <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor="#2ef466"
      barColor="#51E5FF"
    />
  );
};

export default Loader;
