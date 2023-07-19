import { FC, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface Props {
  title: string;
  isOpen: boolean;
  description: string;
  onChange: (open: boolean) => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({
  title,
  isOpen,
  description,
  onChange,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-neutral-900/90 backdrop-blur-sm' />
        <Dialog.Content
          className='fixed top-[50%] left-[50%] max-h-full h-full w-full translate-x-[-50%] translate-y-[-50%] p-[25px]
        drop-shadow-md border border-neutral-700 rounded-md bg-neutral-800 focus:outline-none
        md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]'
        >
          <Dialog.Title className='mb-4 text-xl text-center font-bold'>
            {title}
          </Dialog.Title>
          <Dialog.Description className='mb-5 text-sm leading-normal text-center'>
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className='absolute top-[10px] right-[10px] inline-flex items-center justify-center h-[25px] w-[25px]
            appearance-none rounded-full text-neutral-400 hover:text-white focus:outline-none'
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
