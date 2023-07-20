'use client';

interface Props {
  message: string;
}

const EmptySongsMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className='w-full px-6 flex flex-col gap-y-2 text-neutral-400'>
      {message}
    </div>
  );
};

export default EmptySongsMessage;
