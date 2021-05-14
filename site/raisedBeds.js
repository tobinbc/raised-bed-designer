import { listInCollections } from "backend/tools";
import {
  getToolOptions,
  numberToLetter,
  populateMaterialRepeaterBeam,
  populateMaterialRepeaterCorners,
  showHideItem,
} from "public/utils";
import wixData from "wix-data";
import { cart } from "wix-stores";
import wixUsers from "wix-users";

const ProductTable = "Stores/Products";
let bedNumber = 1;
const ownedProductTemp = {};
let productCornerFittingId,
  productCornerFittingName,
  productBeamId,
  productBeamName,
  cartItems,
  myToolsData,
  beams,
  corners,
  verticals,
  orientation,
  beamThickness;

$w.onReady(function () {
  console.log("Raised Bed Ready");
  cart.getCurrentCart().then(setupCartItems);
  cart.onChange(setupCartItems);
  setupProductFields();
  listInCollections(["Raised Flower Beds", "Tools"], true).then(setupToolsData);
  $w("#customElement1").on("designChanged", onDesignChanged);
  initialiseDesigner();
});

function setupToolsData(toolsData) {
  myToolsData = toolsData;
  renderPageElements();
}
function initialiseDesigner() {
  setTimeout(() => {
    $w("#customElement1").setAttribute("data-page-ready", false);
    setTimeout(() => {
      $w("#customElement1").setAttribute("data-page-ready", true);
    }, 100);
  }, 100);
}
const setupProductFields = () => {
  Promise.all([
    queryProduct("wood-sleeper-oak"),
    queryProduct("set-of-corner-fittings"),
  ]).then(([productBeam, productCornerFitting]) => {
    productCornerFittingId = productCornerFitting._id;
    productCornerFittingName = productCornerFitting.name;
    productBeamId = productBeam._id;
    productBeamName = productBeam.name;
    renderPageElements();
  });
};
const queryProduct = (slug) =>
  wixData
    .query(ProductTable)
    .eq("slug", slug)
    .find()
    .then(({ items }) => items?.[0]);

function setupCartItems(cartData) {
  console.log("setupCartItems", cartData);
  cartItems = cartData.lineItems.map(
    ({ customTextFields, options, productId, quantity }) => {
      const component = customTextFields.find(
        (customTextField) => customTextField.title === "Component"
      )?.value;
      if (component) {
        const lineItemBedNumber = parseInt(component);
        if (!isNaN(lineItemBedNumber)) {
          bedNumber = Math.max(lineItemBedNumber, bedNumber);
        }
      }
      return {
        customTextFields,
        options,
        productId,
        quantity,
      };
    }
  );
  renderPageElements();
}

function renderPageElements() {
  if (
    !productCornerFittingId ||
    !productCornerFittingName ||
    !productBeamId ||
    !productBeamName ||
    !cartItems ||
    !myToolsData ||
    !beams ||
    !corners ||
    !verticals ||
    typeof orientation !== "number" ||
    !beamThickness ||
    !bedNumber
  ) {
    console.log("Missing variable data", {
      productCornerFittingId,
      productCornerFittingName,
      productBeamId,
      productBeamName,
      cartItems,
      myToolsData,
      beams,
      corners,
      verticals,
      orientation,
      beamThickness,
      bedNumber,
    });
    return;
  }
  console.log("Using variable data", {
    productCornerFittingId,
    productCornerFittingName,
    productBeamId,
    productBeamName,
    cartItems,
    myToolsData,
    beams,
    corners,
    verticals,
    orientation,
    bedNumber,
    beamThickness,
  });
  // MATERIALS
  const materialsData = beams.map((beam, i) => ({
    ...beam,
    _id: `beam-${i}`,
    beamThickness,
    productName: productBeamName,
    productId: productBeamId,
    orientation,
    bedNumber,
    type: "beam",
  }));
  materialsData.push({
    type: "corners",
    _id: `corners-${1}`,
    corners,
    beamThickness,
    bedNumber,
    productName: productCornerFittingName,
    productId: productCornerFittingId,
  });
  $w("#materialsRepeater").data = materialsData;
  $w("#materialsRepeater").forEachItem(($item, itemData, index) => {
    console.log("materialsRepeater itemData", itemData);

    itemData.type === "beam" &&
      populateMaterialRepeaterBeam($item, itemData, { cartItems });
    itemData.type === "corners" &&
      populateMaterialRepeaterCorners($item, itemData, { cartItems });
  });
  $w("#materialsRepeater").show();

  // TOOLS
  $w("#toolRepeater").data = myToolsData;
  $w("#toolRepeater").forEachItem(($item, itemData, index) => {
    console.log("toolRepeater itemData", itemData);
    const { name, isOwned, _id } = itemData;
    const numberText = `T${numberToLetter(index)}`;
    $item("#toolNumberText").text = numberText;
    $item("#toolTitleText").text = name;
    $item("#toolProductIdText").text = _id;
    $item("#toolProductOptionsText").text = getToolOptions({
      numberText,
    });
    const isInCart = !!cartItems.find(({ productId }) => productId === _id);
    showHideItem($item, "ownedButton", "ownedText", isOwned);
    showHideItem($item, "addToolToCart", "toolInCartText", isInCart);
  });
  $w("#toolRepeater").show();
}

export async function ownedButton_click(event) {
  console.log("event", event);
  const $item = $w.at(event.context);
  const productId = $item("#productIdText").text;
  if (wixUsers.currentUser.loggedIn) {
    await $w("#toolsDataset").new();
    $w("#toolsDataset").setFieldValue("product", productId);
    $w("#toolsDataset").setFieldValue("isOwned", true);
    await $w("#toolsDataset").save();
    $item("#ownedButton").hide();
  } else {
    ownedProductTemp[productId] = !ownedProductTemp[productId];
  }
}

export function addToolToCart_click(event) {
  const $item = $w.at(event.context);
  const productId = $item("#toolProductIdText").text;
  const quantity = parseInt($item("#tootlQtyText").text) || 1;
  const optionJSON = $item("#toolProductOptionsText").text;
  const options = JSON.parse(optionJSON);
  cart.addProducts([{ productId, quantity, options }]).then(setupCartItems);
}

export function addMaterialToCartButton_click(event) {
  const $item = $w.at(event.context);
  const productId = $item("#productIdText").text;
  const total = $item("#totalText").text;
  let quantity = 1;
  if (total.includes("Length")) {
    quantity = parseInt(total.replace(/[^0-9]/g, ""));
  } else {
    quantity = parseInt($item("#quantityText").text);
  }
  const optionJSON = $item("#productOptionsText").text;
  const options = JSON.parse(optionJSON);
  cart.addProducts([{ productId, quantity, options }]).then(setupCartItems);
}

function onDesignChanged(event) {
  console.log("designChanged wix", event.detail);
  ({ beams, corners, verticals, orientation, beamThickness } = event.detail);
  renderPageElements();
}
