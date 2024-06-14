import  { ChangeEvent } from 'react';
import { ReactComponent as GalleryIcon } from '../assets/gallery_icon.svg';
import placeholderPath from '../assets/pfp_placeholder.jpg';

interface ImageUploaderProps {
  image: string;
  setImage: (image: string) => void;
}

const ImageUploader = ({ image, setImage }: ImageUploaderProps) => {
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="relative flex flex-col items-center self-center group">
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImageUpload}
      />
      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mt-8 relative border-2 border-primary-yellow">
        <img src={image !== '' ? image : placeholderPath} alt="Profile" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity flex items-center justify-center">
          <GalleryIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
        </div>
      </div>
    </label>
  );
};

export default ImageUploader;
