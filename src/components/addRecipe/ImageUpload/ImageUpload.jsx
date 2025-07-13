import { Input } from "@/components/ui/Input";
import { useRef, useState, useEffect } from "react";
import css from "./ImageUpload.module.css";
import { Text } from "@/components/ui";
import { FaCamera } from "react-icons/fa6";
import { TbBorderCorners } from "react-icons/tb";

export const ImageUpload = ({ image, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    if (typeof image === "string") {
      setPreviewUrl(image);
    }
  }, [image]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`${css.loadWrapBox} ${previewUrl && css.loaded}`}>
      {!previewUrl ? (
        <div onClick={handleClick} className={css.loadWrap}>
          <div className={css.imgWrap}>
            <TbBorderCorners className={css.cameraFrame} />
            <FaCamera className={css.camera} />
          </div>

          <Text size="md" color="primary" className={css.placeholder}>
            Upload a photo
          </Text>
        </div>
      ) : (
        <div className={css.uploadWrap}>
          <img src={previewUrl} alt="Preview" className={css.previewImg} />
          <Text
            onClick={handleClick}
            size="md"
            color="primary"
            className={css.placeholder}
          >
            Upload another photo
          </Text>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={css.hiddenInput}
      />
    </div>
  );
};
