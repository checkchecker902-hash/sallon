import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image, Upload, Check } from 'lucide-react';

// Import default images
import mensHaircutImg from "@/assets/mens-haircut.jpg";
import womensHaircutImg from "@/assets/womens-haircut.jpg";
import beardServiceImg from "@/assets/beard-service.jpg";
import spaServiceImg from "@/assets/spa-service.jpg";

interface ServiceImageSelectorProps {
  currentImage: string;
  onImageSelect: (image: string) => void;
  children: React.ReactNode;
}

const defaultImages = [
  { name: "Men's Haircut", url: mensHaircutImg },
  { name: "Women's Haircut", url: womensHaircutImg },
  { name: "Beard Service", url: beardServiceImg },
  { name: "Spa Treatment", url: spaServiceImg },
];

const ServiceImageSelector: React.FC<ServiceImageSelectorProps> = ({
  currentImage,
  onImageSelect,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(currentImage);
  const [customImageUrl, setCustomImageUrl] = useState('');

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleCustomImageAdd = () => {
    if (customImageUrl.trim()) {
      setSelectedImage(customImageUrl.trim());
    }
  };

  const handleSave = () => {
    onImageSelect(selectedImage);
    setIsOpen(false);
    setCustomImageUrl('');
  };

  const handleClose = () => {
    setSelectedImage(currentImage);
    setCustomImageUrl('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image className="w-5 h-5" />
            Select Service Image
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Default Images */}
          <div>
            <h4 className="font-medium mb-3">Default Images</h4>
            <div className="grid grid-cols-2 gap-4">
              {defaultImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image.url
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-muted hover:border-primary/50'
                  }`}
                  onClick={() => handleImageSelect(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-32 object-cover"
                  />
                  {selectedImage === image.url && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
                    <p className="text-sm font-medium">{image.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Image URL */}
          <div className="space-y-3">
            <h4 className="font-medium">Custom Image URL</h4>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Enter image URL (https://...)"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={handleCustomImageAdd}
                disabled={!customImageUrl.trim()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
            {customImageUrl && (
              <div className="mt-2">
                <div
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all max-w-xs ${
                    selectedImage === customImageUrl.trim()
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-muted hover:border-primary/50'
                  }`}
                  onClick={() => handleImageSelect(customImageUrl.trim())}
                >
                  <img
                    src={customImageUrl}
                    alt="Custom"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = mensHaircutImg; // Fallback image
                    }}
                  />
                  {selectedImage === customImageUrl.trim() && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Preview */}
          {selectedImage && (
            <div className="space-y-2">
              <h4 className="font-medium">Preview</h4>
              <div className="max-w-xs rounded-lg overflow-hidden border">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceImageSelector;