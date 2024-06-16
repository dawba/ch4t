import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { ReactComponent as GalleryIcon } from '../../assets/gallery_icon.svg';
import ImageRepository from '../../api/ImageRepository.ts';
import { ID, NewImageData } from '../../types/types.ts';
import { ImageContext } from '../../types/types.ts';

const commonImageMimeTypes: { [key: string]: string } = {
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

interface ImageUploaderProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  imageContext: ImageContext;
  id: ID;
}

const ImageUploader = ({
  image,
  setImage,
  imageContext,
  id,
}: ImageUploaderProps) => {
  const placeholderPath = '../../assets/pfp_placeholder.jpg';

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        uploadImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      const extension = file.name.split('.').pop()?.toLowerCase();
      const contentType = commonImageMimeTypes[`.${extension}`];

      const imageData: NewImageData = {
        name: file.name,
        data: Buffer.from(base64String.split(',')[1], 'base64'),
        contentType,
        createdAt: new Date(),
      };

      if (imageContext === 'User') {
        await ImageRepository.createImageForUser(id, imageData);
      } else if (imageContext === 'Chat') {
        await ImageRepository.createImageForChat(id, imageData);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <label className="relative flex flex-col items-center self-center group">
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImageUpload}
      />
      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mt-8 relative border-2 border-primary-yellow">
        <img
          src={image !== '' ? image : placeholderPath}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity flex items-center justify-center">
          <GalleryIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </label>
  );
};

export default ImageUploader;
