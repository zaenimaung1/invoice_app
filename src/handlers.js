import { inventoryPanel, manageInventoryBtn } from "./selectors";


export const handleManageInventoryBtn = () => {
    console.log("Manage Inventory button clicked");
    // Add logic to open the inventory management panel
    inventoryPanel.classList.remove('translate-x-full');
}

export const handleClosePanelBtn = () => {
    inventoryPanel.classList.add('translate-x-full');
};