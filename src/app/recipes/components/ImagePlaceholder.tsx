import Image from 'next/image';

interface ImagePlaceholderProps {
  imageUrl: string;
  altText: string;
}

export default function ImagePlaceholder({ imageUrl, altText }: ImagePlaceholderProps) {
  return (
    <div className="relative w-full h-96">
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
}