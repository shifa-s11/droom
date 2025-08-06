import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="/load.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;