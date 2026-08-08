import ImageKitImage from "../_components/ImageKitImage";
import { createMetadata } from "../_lib/metadata";
import Grid from "../_components/srcl/Grid";
import styles from "./page.module.scss";

const title = "Maintenance";
const description = "This site is under maintenance. Check back soon.";
const imagePath = "/explorers-room/initial_blockout.png";

export const metadata = createMetadata({
  title,
  description,
  canonicalPath: "/maintenance",
});

export default function MaintenancePage() {
  return (
    <Grid>
      <p>{description}</p>
      <br />
      <ImageKitImage
        className={styles.image}
        src={imagePath}
        alt="Wireframes"
        width={1200}
        height={675}
        quality={100}
        loading="eager"
        sizes="(max-width: 768px) 90vw, 600px"
      />
    </Grid>
  );
}
