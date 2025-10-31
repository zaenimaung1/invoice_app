import {
  productName,
  productPrice,
  inventoryItemTemplate,
  listGroup,

} from "./selectors";
import { v4 as uuidv4 } from "uuid";
import { products } from "./state";

// Prevent form submission default and append the new item to the list
export const addNewProductHandler = () => {
  const id = uuidv4();

  // create UI card
  const fragment = createProductCard(
    id,
    productName.value,
    productPrice.valueAsNumber
  );
  listGroup.appendChild(fragment);

  // add to state BEFORE clearing inputs
  products.push({
    id: id,
    name: productName.value,
    price: productPrice.valueAsNumber,
  });

  // update dropdown option
  productSelect.append(
    new Option(`${productName.value} - ${productPrice.valueAsNumber} MMK`, id)
  );

  // now safe to clear inputs
  productName.value = "";
  productPrice.value = "";

  console.log(products);
};

export const productRender = (products) => {
  products.forEach(({ id, name, price }) => {
    listGroup.appendChild(createProductCard(id, name, price));
    productSelect.append(new Option(`${name} - ${price}`, id));
  });
};
export const createProductCard = (id, name, price) => {
  // clone template content (returns a DocumentFragment)
  const newProduct = inventoryItemTemplate.content.cloneNode(true);

  // root element of the cloned fragment (the card container)
  const root = newProduct.querySelector("#card-list");
  const prodNameEl = newProduct.querySelector("#productName");
  const prodPriceEl = newProduct.querySelector("#productPrice");

  if (root) root.id = id;
  if (prodNameEl) prodNameEl.textContent = name;
  if (prodPriceEl) prodPriceEl.textContent = `${price} MMK`;

  return newProduct;
};
