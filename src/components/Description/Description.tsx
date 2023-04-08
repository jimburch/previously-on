import { Typography } from "@mui/joy";

import styles from "./Description.module.css";

type DescriptionProps = {
  description: string;
  isSubmitted: boolean;
};

const Description = ({ description, isSubmitted }: DescriptionProps) => {
  return (
    <div className={styles.root}>
      {!isSubmitted ? (
        <Typography>
          {
            "Halfway through a good book but it's been a while since you read the last page? Upload a picture of the last page you read and we'll generate a summary, explain major characters, and catch you up to the exact spot you left off!"
          }
        </Typography>
      ) : null}
      {description.split("\n\n").map((chunk: string) => {
        return (
          <div key={chunk} className={styles.text_chunk}>
            <Typography>{chunk}</Typography>
          </div>
        );
      })}
    </div>
  );
};

export default Description;
