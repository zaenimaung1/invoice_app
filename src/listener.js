import {  handleClosePanelBtn, handleManageInventoryBtn, handlePrint,  } from "./handlers";
import { addNewProductHandler } from "./Inventory";
import { createRecordFormHandler } from "./record";
import { manageInventoryBtn, productAddBtn, closePanelBtn, createRecordForm, printBtn } from "./selectors";

const listener= () => {
    manageInventoryBtn.addEventListener('click',handleManageInventoryBtn);
    closePanelBtn.addEventListener('click',handleClosePanelBtn);
    productAddBtn.addEventListener('click',addNewProductHandler);
    createRecordForm.addEventListener('submit',createRecordFormHandler);
    printBtn.addEventListener('click',handlePrint )
    
}

export default listener;