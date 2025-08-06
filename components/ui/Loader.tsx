import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex w-full justify-center  items-center">
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