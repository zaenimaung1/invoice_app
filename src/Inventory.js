import { productName, productPrice, inventoryItemTemplate, listGroup, productSelect } from "./selectors"
import { v4 as uuidv4 } from 'uuid';

// Prevent form submission default and append the new item to the list
export const addNewProductHandler = () => {
    const id = uuidv4();
    const fragment = addProduct(id, productName.value, productPrice.valueAsNumber);
   
    listGroup.appendChild(fragment);
    productSelect.append(new Option(productName.value, id));
    // clear inputs after adding
     productName.value = '';
     productPrice.value = '';

     

}

export const addProduct = (id, name, price) => {
    // clone template content (returns a DocumentFragment)
    const newProduct = inventoryItemTemplate.content.cloneNode(true);

    // root element of the cloned fragment (the card container)
    const root = newProduct.querySelector('#card-list');
    const prodNameEl = newProduct.querySelector('#productName');
    const prodPriceEl = newProduct.querySelector('#productPrice');

    if (root) root.id = id;
    if (prodNameEl) prodNameEl.textContent = name;
    if (prodPriceEl) prodPriceEl.textContent = `${price} MMK`;

    return newProduct;

}