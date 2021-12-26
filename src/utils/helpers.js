export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (products, name) => {
  let items = products.map((product) => product[name]);
  if (name === "colors") {
    items = items.flat();
  }
  items = ["all", ...new Set(items)];
  return items;
};

export function rgbToHex(rgb) {
  var c = rgb.match(/\d+(\.\d+)?%?/g);
  if (c) {
    c = c.slice(0, 3).map(function (next) {
      var itm = next;
      if (itm.indexOf("%") != -1) {
        itm = Math.round(parseFloat(itm) * 2.55);
      }
      if (itm < 0) itm = 0;
      if (itm > 255) itm = 255;
      itm = Math.round(itm).toString(16);
      if (itm.length == 1) itm = "0" + itm;
      return itm;
    });
    return "#" + c.join("").toLowerCase();
  }
  return "";
}
