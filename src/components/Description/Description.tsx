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
            "Halfway through a good book but it's been a while since you read the last page? Enter the book title, author, and the last few sentences you read. Previously On will generate a summary, explain the major charaters, and catch you up to the exact spot where you're reading."
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
