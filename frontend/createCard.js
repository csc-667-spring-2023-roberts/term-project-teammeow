module.exports = (value, color) => {
  const img = document.createElement("img");
  const div = document.createElement("div");
  const span = document.createElement("span");

  span.className = `card-${value}`;

  const col = div.cloneNode(),
    card = div.cloneNode(),
    label = div.cloneNode();
  const top = span.cloneNode(),
    center = span.cloneNode(),
    bottom = span.cloneNode();

  col.className = "col";
  label.className = "label";
  card.className = "card card-" + color;

  top.innerHTML = value;
  center.innerHTML = value;
  bottom.innerHTML = value;

  img.setAttribute("alt", "card");
  img.setAttribute("src", "/images/card.png");

  label.append(center);
  card.append(top, label, img, bottom);

  col.appendChild(card);

  return col;
};
