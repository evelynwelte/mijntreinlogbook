(function () {
  const FLAG = "showTrainLoader";
  let overlay, mover, timer;

  function build() {
    overlay = document.createElement("div");
    overlay.id = "trainLoader";
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: rgba(255,255,255,0.92);
      display: none;
      z-index: 99999;
      overflow: hidden;
    `;

    // moving symbol (change this if you want)
    mover = document.createElement("div");
    mover.textContent = "🚄"; // <-- change symbol here (🚆 🚄 🛤️ etc.)
    mover.style.cssText = `
      position: absolute;
      left: -80px;
      bottom: 20px;
      font-size: 56px;
      transition: transform 2000ms linear; /* 2 seconds */
      will-change: transform;
    `;

    const text = document.createElement("div");
    text.textContent = "Loading...";
    text.style.cssText = `
      position: absolute;
      left: 50%;
      top: 45%;
      transform: translate(-50%, -50%);
      font-family: Arial, sans-serif;
      opacity: .7;
    `;

    overlay.appendChild(text);
    overlay.appendChild(mover);
    document.body.appendChild(overlay);
  }

  function show() {
    if (!overlay) build();
    overlay.style.display = "block";

    // start at left (reset)
    mover.style.transition = "none";
    mover.style.transform = "translateX(0px)";
    void mover.offsetHeight; // reflow

    // move to right in 2 seconds
    const distance = window.innerWidth + 160;
    mover.style.transition = "transform 2000ms linear";
    mover.style.transform = `translateX(${distance}px)`;

    clearTimeout(timer);
    timer = setTimeout(() => {
      // after 2s, hide (optional)
      overlay.style.display = "none";
    }, 2000);
  }

  function hide() {
    if (overlay) overlay.style.display = "none";
    clearTimeout(timer);
  }

  // used by your main script
  window.showTrainLoaderNow = function () {
    sessionStorage.setItem(FLAG, "1");
    show();
  };

  // if coming from another page and flag is set
  document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem(FLAG) === "1") show();
  });

  // remove flag + hide when fully loaded
  window.addEventListener("load", () => {
    sessionStorage.removeItem(FLAG);
    hide();
  });
})();
