"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { imageKitLoader } from "./ImageKitImage";
import styles from "./ImageModal.module.scss";

const scrollLockClass = "image-modal-open";

interface ImageModalClientProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  optimise: boolean;
}

function lockScroll() {
  document.documentElement.classList.add(scrollLockClass);
  document.body.classList.add(scrollLockClass);
}

function unlockScroll() {
  document.documentElement.classList.remove(scrollLockClass);
  document.body.classList.remove(scrollLockClass);
}

export default function ImageModalClient({
  src,
  alt,
  width,
  height,
  optimise,
}: ImageModalClientProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fullSizeImageRef = useRef<HTMLImageElement>(null);
  const [isFullSizeLoaded, setIsFullSizeLoaded] = useState(false);

  function openDialog() {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (
      fullSizeImageRef.current?.complete &&
      fullSizeImageRef.current.naturalWidth > 0
    ) {
      setIsFullSizeLoaded(true);
    }

    dialog.showModal();
    lockScroll();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <div className={styles.root}>
      <button
        className={styles.thumbnailContainer}
        type="button"
        aria-haspopup="dialog"
        aria-label={`View ${alt} full size`}
        onClick={openDialog}
      >
        <Image
          className={styles.thumbnail}
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={optimise ? 100 : undefined}
          loading="lazy"
          loader={optimise ? imageKitLoader : undefined}
          sizes="(max-width: 768px) 80vw, 650px"
          unoptimized={!optimise}
        />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.modal}
        aria-label={`Full-size view of ${alt}`}
        onClick={closeDialog}
        onClose={unlockScroll}
      >
        {!isFullSizeLoaded && (
          <div className={styles.spinnerContainer}>
            <span className={styles.spinner} />
          </div>
        )}

        <Image
          ref={fullSizeImageRef}
          className={`${styles.fullSize} ${isFullSizeLoaded ? "" : styles.hidden}`}
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={optimise ? 100 : undefined}
          loading="lazy"
          loader={optimise ? imageKitLoader : undefined}
          sizes="100vw"
          unoptimized={!optimise}
          onLoad={() => setIsFullSizeLoaded(true)}
        />
      </dialog>
    </div>
  );
}
