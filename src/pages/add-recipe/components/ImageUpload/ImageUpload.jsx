import {Input} from "@/components/ui/Input";
import {useEffect, useRef, useState} from "react";
import css from "./ImageUpload.module.css";
import {Text} from "@/components/ui";
import {FaCamera} from "react-icons/fa6";
import {TbBorderCorners} from "react-icons/tb";

export const ImageUpload = ({image, onImageChange, error}) => {
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
        <>
            {!previewUrl ? (
                <div className={`${css.loadWrapBox} ${previewUrl && css.loaded}`}>
                    <div onClick={handleClick} className={css.loadWrap}>
                        <div className={css.imgWrap}>
                            <TbBorderCorners className={css.cameraFrame}/>
                            <FaCamera className={css.camera}/>
                        </div>

                        <Text size="md" color="primary" className={css.placeholder}>
                            Upload a photo
                        </Text>
                    </div>
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className={css.hiddenInput}
                    />
                    {error && (
                        <Text size="sm" color="error" className={css.errorText}>
                            {error}
                        </Text>
                    )}
                </div>
            ) : (
                <div className={`${css.loadedWrapBox} ${previewUrl && css.loaded}`}>
                    <div className={css.uploadWrap}>
                        <div className={css.imgWrapPrev}>
                            <img src={previewUrl} alt="Preview" className={css.previewImg}/>
                        </div>
                    </div>
                    <Text
                        onClick={handleClick}
                        size="md"
                        color="primary"
                        className={`${error ? css.placeholderError : css.placeholder}`}
                    >
                        Upload another photo
                    </Text>
                    <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className={css.hiddenInput}
                    />
                    {error && (
                        <Text size="sm" color="error" className={css.errorText}>
                            {error}
                        </Text>
                    )}
                </div>
            )}
        </>
    );
};
