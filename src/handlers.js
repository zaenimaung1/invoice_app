import { inventoryPanel,  } from "./selectors";


export const handleManageInventoryBtn = () => {
    console.log("Manage Inventory button clicked");
    // Add logic to open the inventory management panel
    inventoryPanel.classList.remove('translate-x-full');
}

export const handleClosePanelBtn = () => {
    inventoryPanel.classList.add('translate-x-full');
};



    // ✅ Corrected Code Pattern for iOS
export const handlePrint = () => {
  // 1. Immediately call the print function.
  window.print(); 

  setTimeout(() => {
    updateInvoiceStatus(); // e.g., Mark as printed
  }, 100); 
};

