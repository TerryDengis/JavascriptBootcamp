function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}
const moveCoin = () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);
  coin.style.top = `${y}px`;
  coin.style.left = `${x}px`;
};

const extractPos = pos => {
  if (!pos) return 0;
  return parseInt(pos.slice(0, -2));
};
const moveVertical = (element, amount) => {
  const currentTop = extractPos(element.style.top);
  element.style.top = `${currentTop + amount}px`;
};

const moveHorizontal = (element, amount) => {
  const currentleft = extractPos(element.style.left);
  element.style.left = `${currentleft + amount}px`;
};

window.addEventListener("keydown", event => {
  switch (event.key) {
    case "ArrowDown":
      moveVertical(avatar, 25);
      break;

    case "ArrowUp":
      moveVertical(avatar, -25);
      break;

    case "ArrowLeft":
      moveHorizontal(avatar, -25);
      avatar.style.transform = "scale(-1,1)";
      break;

    case "ArrowRight":
      moveHorizontal(avatar, 25);
      avatar.style.transform = "scale(1,1)";
      break;

    default:
      break;
  }
  if (isTouching(avatar, coin)) moveCoin();
});

const avatar = document.querySelector("#player");
const coin = document.querySelector("#coin");
moveCoin();
