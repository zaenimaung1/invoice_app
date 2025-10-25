import { handleClosePanelBtn, handleManageInventoryBtn } from "./handlers";
import { addNewProductHandler } from "./Inventory";
import { manageInventoryBtn, productAddBtn, closePanelBtn } from "./selectors";

const listener= () => {
    manageInventoryBtn.addEventListener('click',handleManageInventoryBtn);
    closePanelBtn.addEventListener('click',handleClosePanelBtn);
    productAddBtn.addEventListener('click',addNewProductHandler);
}

export default listener;