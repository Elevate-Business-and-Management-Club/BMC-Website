/**
 * Events Module
 */

const Events = (() => {

  const init = () => {

    const eventsTrack =
      document.getElementById("events-track");

    if (!eventsTrack) {
      console.warn("Events track not found");
      return;
    }

    const images = import.meta.glob(
      "../assets/upcomingevents/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
      {
        eager: true
      }
    );

    const imageUrls = Object.values(images).map(
      (module) => module.default
    );

    if (imageUrls.length === 0) {
      console.warn("No event images found");
      return;
    }

    eventsTrack.innerHTML = "";

    imageUrls.forEach((url) => {

      const item = document.createElement("div");

      item.className = "gallery__item";

      const img = document.createElement("img");

      img.src = url;

      img.alt = "Event Image";

      img.loading = "lazy";

      item.appendChild(img);

      eventsTrack.appendChild(item);

    });

    console.log(
      `Loaded ${imageUrls.length} event images`
    );

  };

  return { init };

})();

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    Events.init
  );

} else {

  Events.init();

}