import ImageKitImage from "./_components/ImageKitImage";
import Grid from "./_components/srcl/Grid";
import styles from "./not-found.module.scss";

const imagePath = "/owr/bliss-hardware.png";

export default function NotFound() {
  return (
    <Grid>
      <title>404</title>
      <h1>404 Not Found</h1>
      <br />
      <p>Are you lost?</p>
      <br />
      <ImageKitImage
        className={styles.image}
        src={imagePath}
        alt="Bliss artwork"
        width={1200}
        height={502}
        quality={80}
        loading="eager"
        sizes="(max-width: 768px) 90vw, 600px"
      />
    </Grid>
  );
}
