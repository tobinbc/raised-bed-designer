export const displayName = (name) => {
  switch (name) {
    case "Top":
      return "A";
    case "Right":
      return "B";
    case "Bottom":
      return "C";
    case "Left":
      return "D";
  }
};

export const numberToLetter = (number) => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[number];

export function showHideItem($item, one, two, which) {
  if (which) {
    $item(`#${one}`).hide();
    $item(`#${two}`).show();
  } else {
    $item(`#${two}`).hide();
    $item(`#${one}`).show();
  }
}
export const getBeamOptions = ({
  numberText,
  isStartOverlap,
  isEndOverlap,
  orientation,
}) => ({
  customTextFields: [
    {
      title: "Component",
      value: numberText,
    },
  ],
  choices: {
    "End 1 Overlap": isStartOverlap ? "Outside" : "Inside",
    "End 2 Overlap": isEndOverlap ? "Outside" : "Inside",
    Orientation: orientation === 0 ? "Upright" : "Flat",
  },
});

export const getToolOptions = ({ numberText }) =>
  JSON.stringify({
    customTextFields: [
      {
        title: "Component",
        value: numberText,
      },
    ],
    choices: {},
  });
export const getCornerOptions = ({ numberText, shankFit }) => ({
  customTextFields: [
    {
      title: "Component",
      value: numberText,
    },
  ],
  choices: {
    "Shank Fit": shankFit,
  },
});

export const populateMaterialRepeaterBeam = (
  $item,
  {
    isEndOverlap,
    isStartOverlap,
    length,
    name,
    productName,
    productId,
    beamThickness,
    orientation,
    bedNumber,
  },
  { cartItems }
) => {
  const numberText = `${bedNumber}${displayName(name)}`;
  const productOptions = getBeamOptions({
    isEndOverlap,
    isStartOverlap,
    numberText,
    orientation,
  });
  $item("#productOptionsText").text = JSON.stringify(productOptions);
  $item("#numberText").text = numberText;
  $item("#productNameText").text = productName;
  $item("#productIdText").text = productId;
  $item("#totalText").text = `Length ${length}cm`;
  $item("#quantityText").text = `1 of`;
  if (isEndOverlap && isStartOverlap) {
    $item("#detailsText").text = "Overlap both ends";
  } else if (isEndOverlap || isStartOverlap) {
    $item("#detailsText").text = "Overlap one end";
  } else {
    $item("#detailsText").text = "Overlapped both ends";
  }

  showHideItem(
    $item,
    "addMaterialToCartButton",
    "materialInCartText",
    isInCart({
      cartItems,
      productId,
      productOptions,
      numberText,
      quantity: length,
    })
  );
};

export const populateMaterialRepeaterCorners = (
  $item,
  { productName, productId, corners, beamThickness, bedNumber },
  { cartItems }
) => {
  const shankFit = `${beamThickness}cm`;
  const numberText = `${bedNumber}${"E"}`;
  const quantity = corners.length;
  $item("#productNameText").text = productName;
  $item("#productIdText").text = productId;
  const productOptions = getCornerOptions({
    numberText,
    shankFit,
  });
  $item("#productOptionsText").text = JSON.stringify(productOptions);
  $item("#numberText").text = numberText;

  $item("#totalText").text = `1 braced angle; 2 fasteners`;
  $item("#quantityText").text = `${quantity} of`;
  $item("#detailsText").text = `Coach bolt 10mm Ø\n${shankFit} shank`;
  showHideItem(
    $item,
    "addMaterialToCartButton",
    "materialInCartText",
    isInCart({ cartItems, productId, productOptions, numberText, quantity })
  );
};

export const isInCart = ({
  productId,
  productOptions,
  cartItems,
  numberText,
  quantity,
}) =>
  !!cartItems.find(
    ({
      productId: cartProductId,
      options,
      customTextFields,
      quantity: cartQuantity,
    }) =>
      productId === cartProductId &&
      options.filter(
        ({ option, selection }) => productOptions.choices[option] === selection
      ).length === options.length &&
      customTextFields.find(({ title }) => title === "Component").value ===
        numberText &&
      quantity == cartQuantity
  );
