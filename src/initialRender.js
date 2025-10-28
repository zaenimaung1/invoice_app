import { productRender } from "./Inventory";
import { inventoryPanel } from "./selectors";
import { products } from "./state";

export const initialRender = () => {
    inventoryPanel.classList.remove('translate-x-full');
    productRender(products);
};