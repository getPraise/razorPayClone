document.addEventListener("DOMContentLoaded", () => {
  function createSlider({
      wrapperId,
      containerId,
      cardClass = null,
      nextBtnId,
      prevBtnId,
      gap = 32,
      mode = "default",
      visibleCards = 1
  }) {
      const wrapper = document.getElementById(wrapperId);
      const container = document.getElementById(containerId);
      const cards = cardClass ? container.querySelectorAll(`.${cardClass}`) : Array.from(container.children);//fewnjfodweDFWACF2A2WAWDF
      const nextBtn = document.getElementById(nextBtnId);
      const prevBtn = document.getElementById(prevBtnId);

      let currentIndex = 0;
      let pageGroups = [];

      function getCardWidth() {
          return cards[0]?.offsetWidth + gap;
      }

      function getMaxIndex() {
          const cardWidth = getCardWidth();
          const totalCards = cards.length;
          return Math.max(totalCards - visibleCards, 0);
      }

      function updatePosition() {
          let offset = 0;

          if (mode === "group") {
              offset = pageGroups[currentIndex - 1] || 0;
          } else if (mode === "scroll") {
              offset = currentIndex * getCardWidth();
          } else {
              const slideWidth = cards[0]?.offsetWidth || 0;
              offset = currentIndex * slideWidth;
          }

          container.style.transform = `translateX(-${offset}px)`;
      }

      function setupGroups() {
          pageGroups = [];
          for (let i = 0; i < cards.length; i += 2) {
              const slide1 = cards[i];
              const slide2 = cards[i + 1];

              const groupWidth =
                  (slide1?.offsetWidth || 0) +
                  (slide2?.offsetWidth || 0) +
                  (slide1 && slide2 ? gap : 0);

              const prevOffset = pageGroups.length > 0 ? pageGroups[pageGroups.length - 1] : 0;
              pageGroups.push(prevOffset + groupWidth);
          }
      }

      if (mode === "group") {
          setupGroups();
      }

      nextBtn?.addEventListener("click", () => {
          const maxIndex = mode === "group" ? pageGroups.length - 1 : getMaxIndex();
          currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
          updatePosition();
      });

      prevBtn?.addEventListener("click", () => {
          const maxIndex = mode === "group" ? pageGroups.length - 1 : getMaxIndex();
          currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
          updatePosition();
      });

      window.addEventListener("resize", () => {
          if (mode === "group") setupGroups();
          updatePosition();
      });

      updatePosition();
  }

  createSlider({
      wrapperId: "slideContainer",
      containerId: "slideContainer",
      nextBtnId: "nextBtn",
      prevBtnId: "prevBtn",
      mode: "default"
  });

  createSlider({
      wrapperId: "asideBlock03ColumnContainerWrapper",
      containerId: "asideBlock03ColumnContainer",
      nextBtnId: "asideBlock03nextBtn",
      prevBtnId: "asideBlock03prevBtn",
      mode: "group"
  });

  createSlider({
      wrapperId: "mainBox03LowerHalfWrapper",
      containerId: "mainBox03LowerHalfslideContainer",
      cardClass: "mainBox03LowerHalfCard",
      nextBtnId: "mainBox03nextBtn",
      prevBtnId: "mainBox03prevBtn",
      mode: "scroll",
      visibleCards: 3
  });
});
