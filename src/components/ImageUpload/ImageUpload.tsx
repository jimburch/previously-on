import { useState, useRef } from "react";
import { AspectRatio, Card, Button } from "@mui/joy";
import Image from "next/image";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import styles from "./ImageUpload.module.css";

type ImageUploadProps = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};

const ImageUpload = ({ setFieldValue }: ImageUploadProps) => {
  const [image, setImage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (e: any) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFieldValue("image", e.target.files[0]);
    }
  };

  return (
    <div>
      <input
        className={styles.input}
        type="file"
        ref={inputRef}
        onChange={(e) => handleChange(e)}
      />
      <Card>
        <AspectRatio variant="outlined" ratio={image ? "3/4" : "4/3"}>
          {image ? (
            <Image src={image} alt="book page" width={300} height={300} />
          ) : (
            <ImageSearchIcon />
          )}
        </AspectRatio>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={(e) => handleClick(e)}
        >
          Add Image
        </Button>
      </Card>
    </div>
  );
};

export default ImageUpload;
