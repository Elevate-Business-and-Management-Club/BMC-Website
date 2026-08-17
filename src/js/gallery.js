/**
 * Inside Investigation continuous circular photo carousel.
 * Add more .moments-carousel__slide elements in index.html anytime.
 */

const carousel = document.getElementById("moments-carousel");

if (carousel) {
  const track = carousel.querySelector(".moments-carousel__track");
  const previousButton = carousel.querySelector(".moments-carousel__button--previous");
  const nextButton = carousel.querySelector(".moments-carousel__button--next");
  const dotsContainer = document.querySelector(".moments-carousel__dots");

  // Save the original event photos.
  const originalSlides = Array.from(
    track.querySelectorAll(".moments-carousel__slide")
  );

  // Duplicate them once so the carousel can loop forever.
  originalSlides.forEach((slide) => {
    const duplicate = slide.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    track.appendChild(duplicate);
  });

  let position = 0;
  let speed = 0.35;
  let isPaused = false;
  let animationFrame;
  let groupWidth = 0;
  let dots = [];

  const calculateDimensions = () => {
    groupWidth = track.scrollWidth / 2;
  };

  const createDots = () => {
    dotsContainer.innerHTML = "";

    originalSlides.forEach((_, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.setAttribute("aria-label", `Show photo ${index + 1}`);

      dot.addEventListener("click", () => {
        const targetSlide = originalSlides[index];
        position = targetSlide.offsetLeft;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    });

    dots = Array.from(dotsContainer.querySelectorAll("button"));
  };

  const updateDots = () => {
    const currentSlideIndex =
      originalSlides.reduce((closestIndex, slide, index) => {
        const currentDistance = Math.abs(slide.offsetLeft - position);
        const closestDistance = Math.abs(
          originalSlides[closestIndex].offsetLeft - position
        );

        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentSlideIndex);
    });
  };

  const updateCarousel = () => {
    if (groupWidth > 0) {
      position = ((position % groupWidth) + groupWidth) % groupWidth;
    }

    track.style.transform = `translate3d(-${position}px, 0, 0)`;
    updateDots();
  };

  const animate = () => {
    if (!isPaused) {
      position += speed;

      if (position >= groupWidth) {
        position = 0;
      }

      updateCarousel();
    }

    animationFrame = window.requestAnimationFrame(animate);
  };

  // Right arrow moves photos left. Left arrow moves photos right.
  nextButton.addEventListener("click", () => {
    position += 260;
    updateCarousel();
  });

  previousButton.addEventListener("click", () => {
    position -= 260;
    updateCarousel();
  });

  carousel.addEventListener("mouseenter", () => {
    isPaused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  window.addEventListener("resize", () => {
    calculateDimensions();
    updateCarousel();
  });

  window.addEventListener("load", () => {
    calculateDimensions();
    updateCarousel();
  });

  createDots();
  calculateDimensions();
  updateCarousel();
  animationFrame = window.requestAnimationFrame(animate);

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(animationFrame);
  });
}