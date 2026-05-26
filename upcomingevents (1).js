/**
 * BMC - Business and Management Club - Upcoming Events Module
 * Dynamic asset loading for event posters
 */

export const Events = (() => {
  let eventsTrack = null;

  /**
   * Initialize the events gallery module
   */
  const init = () => {
    eventsTrack = document.getElementById("events-track");

    if (!eventsTrack) {
      console.warn("Upcoming Events track element (#events-track) not found");
      return;
    }

    // Safely parse local assets using Vite's eager globe import
    const images = import.meta.glob(
      "../assets/upcomingevents/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
      { eager: true }
    );

    const imageUrls = Object.values(images).map((module) => module.default || module);

    if (imageUrls.length === 0) {
      console.info("No upcoming event images found in src/assets/upcomingevents/");
      eventsTrack.innerHTML = `<p class="gallery__fallback" style="color: var(--muted); padding: 0 var(--container-padding);">More exciting events coming soon!</p>`;
      return;
    }

    // Clear static fallback context safely
    eventsTrack.innerHTML = "";

    // Build the track structure dynamically
    imageUrls.forEach((url) => {
      if (!url) return;

      const item = document.createElement("div");
      item.className = "gallery__item";

      const img = document.createElement("img");
      img.src = url;
      img.alt = "BMC Event Poster";
      img.loading = "lazy";

      item.appendChild(img);
      eventsTrack.appendChild(item);
    });

    console.log(`Events module loaded with ${imageUrls.length} assets.`);
  };

  return {
    init
  };
})();