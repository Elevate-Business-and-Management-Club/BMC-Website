/**
 * BMC - Business and Management Club - Photo Gallery Track Module
 * Auto-resolves static photo records from assets via eager glob generation
 */

export const Gallery = (() => {
  let galleryTrack = null;

  const init = () => {
    galleryTrack = document.getElementById("gallery-track");

    if (!galleryTrack) {
      console.warn("Main Gallery track container (#gallery-track) missing.");
      return;
    }

    // Match assets inside source folders via Vite glob indexing
    const images = import.meta.glob(
      "../assets/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
      { 
        eager: true,
        import: 'default'
      }
    );

    const imageUrls = Object.values(images);

    if (imageUrls.length === 0) {
      console.info("No images parsed in local context src/assets/photos/");
      return;
    }

    galleryTrack.innerHTML = '';

    imageUrls.forEach((imageUrl) => {
      if (!imageUrl) return;

      const item = document.createElement("div");
      item.classList.add("gallery__item");

      const img = document.createElement("img");
      img.src = imageUrl;
      img.loading = "lazy";
      img.alt = "BMC Club Highlight Artwork";

      item.appendChild(img);
      galleryTrack.appendChild(item);
    });

    console.log(`Gallery component running smooth. Indexed elements count: ${imageUrls.length}`);
  };

  return {
    init
  };
})();