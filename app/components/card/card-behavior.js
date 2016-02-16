const weight = 0.0002;
const friction = 0.95;
const bounce = -0.6;
const opacityDuration = 400;

function delta() {
  return Math.random() * 2 * weight - weight;
}

export function initialBehavior(card, timestamp) {
  const opacity = Math.min((timestamp - card.createdAt) / opacityDuration, 1);
  card.opacity = opacity;

  floatBehavior(card);

  if (opacity === 1) {
    card.behavior = floatBehavior;
  }
}

export function floatBehavior(card) {
  let [ax, ay] = [card.ax + delta(), card.ay + delta()];
  let [vx, vy] = [(card.vx + ax) * friction, (card.vy + ay) * friction];
  let [x, y] = [card.x + vx, card.y + vy];

  const right = card.$parent.width;
  if (x < 0) {
    x = 0;
    vx *= bounce;
    ax *= bounce;
  } else if (x + card.width > right) {
    x = right - card.width;
    vx *= bounce;
    ax *= bounce;
  }

  const bottom = card.$parent.height;
  if (y < 0) {
    y = 0;
    vy *= bounce;
    ay *= bounce;
  } else if (y + card.height > bottom) {
    y = bottom - card.height;
    vy *= bounce;
    ay *= bounce;
  }

  card.x = x;
  card.y = y;

  card.ax = ax;
  card.ay = ay;
  card.vx = vx;
  card.vy = vy;
}

export function noBehavior(card) {
}
