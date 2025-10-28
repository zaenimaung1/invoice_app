import {  handleClosePanelBtn, handleManageInventoryBtn } from "./handlers";
import { addNewProductHandler } from "./Inventory";
import { createRecordFormHandler } from "./record";
import { manageInventoryBtn, productAddBtn, closePanelBtn, createRecordForm } from "./selectors";

const listener= () => {
    manageInventoryBtn.addEventListener('click',handleManageInventoryBtn);
    closePanelBtn.addEventListener('click',handleClosePanelBtn);
    productAddBtn.addEventListener('click',addNewProductHandler);
    createRecordForm.addEventListener('submit',createRecordFormHandler);
    
}

export default listener;