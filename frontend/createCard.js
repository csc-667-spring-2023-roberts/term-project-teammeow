module.exports = ({ value, color, id }) => {
  const p = document.createElement("p");
  const img = document.createElement("img");
  const div = document.createElement("div");
  const span = document.createElement("span");
  const icon = document.createElement("ion-icon");

  const col = div.cloneNode(),
    card = div.cloneNode(),
    label = div.cloneNode();
  const top = span.cloneNode(),
    center = span.cloneNode(),
    bottom = span.cloneNode();

  let topIcon, centerIcon, bottomIcon;

  col.className = "col";
  card.className = "card " + color;
  label.className = "label row justify-center align-center";

  if (value == "reverse") {
    topIcon = icon.cloneNode();
    centerIcon = icon.cloneNode();
    bottomIcon = icon.cloneNode();

    topIcon.setAttribute("name", "sync-outline");
    centerIcon.setAttribute("name", "sync-outline");
    bottomIcon.setAttribute("name", "sync-outline");
  } else if (value == "skip") {
    topIcon = icon.cloneNode();
    centerIcon = icon.cloneNode();
    bottomIcon = icon.cloneNode();

    topIcon.setAttribute("name", "hand-left-outline");
    centerIcon.setAttribute("name", "hand-left-outline");
    bottomIcon.setAttribute("name", "hand-left-outline");
  } else {
    topIcon = p.cloneNode();
    centerIcon = p.cloneNode();
    bottomIcon = p.cloneNode();

    topIcon.innerHTML = value;
    centerIcon.innerHTML = value;
    bottomIcon.innerHTML = value;
  }

  img.setAttribute("alt", "card");
  img.setAttribute("src", "/images/card.png");
  card.setAttribute("data-card-id", id);

  top.append(topIcon);
  center.append(centerIcon);
  bottom.append(bottomIcon);

  label.append(center);
  card.append(top, label, img, bottom);

  col.appendChild(card);

  return col;
};
