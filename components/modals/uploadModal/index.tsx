'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import uniqid from 'uniqid';

import Modal from '@/components/modals/modal';
import Input from '@/components/shared/inputs/input';
import Button from '@/components/shared/buttons/button';
import { handleOpenChange } from '@/helpers';
import { useUploadModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onClose } = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const { reset, register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    reset();
    handleOpenChange(open, onClose);
  };

  const onSubmit: SubmitHandler<FieldValues> = async ({
    title,
    author,
    song,
    image,
  }) => {
    try {
      setIsLoading(true);

      const imageFile = image?.[0];
      const songFile = song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields');
        return;
      }

      const uniqueID = uniqid();

      const [songData, imageData] = await Promise.all([
        supabaseClient.storage
          .from('songs')
          .upload(`song-${title}-${uniqueID}`, songFile, {
            cacheControl: '3600',
            upsert: false,
          }),
        supabaseClient.storage
          .from('images')
          .upload(`image-${title}-${uniqueID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          }),
      ]);

      if (songData.error || imageData.error) {
        setIsLoading(false);
        return toast.error('Failed to upload song or image');
      }

      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title,
          author,
          song_path: songData.data.path,
          image_path: imageData.data.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success('Song created!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title='Add a song'
      description='Upload an mp3 file'
      isOpen={isOpen}
      onChange={onChange}
    >
      <form className='grid gap-y-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          id='title'
          disabled={isLoading}
          placeholder='Song title'
          {...register('title', { required: true })}
        />
        <Input
          id='author'
          disabled={isLoading}
          placeholder='Song author'
          {...register('author', { required: true })}
        />
        <div>
          <div className='pb-1'>Select a song file</div>
          <Input
            className='cursor-pointer'
            id='song'
            type='file'
            accept='.mp3'
            disabled={isLoading}
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className='pb-1'>Select an image</div>
          <Input
            className='cursor-pointer'
            id='image'
            type='file'
            accept='image/*'
            disabled={isLoading}
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type='submit'>
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
