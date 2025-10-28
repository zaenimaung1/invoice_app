import { createRecordForm, netTotal, recordGroup, recordTemplate, totalAmount, taxAmount, noRecord } from "./selectors";
import { products } from "./state";

export const createRecordFormHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(createRecordForm);
  const selected = formData.get("productSelect");
  // try to find by numeric id first, then fallback to matching by name (case-insensitive)
  let currentProduct = products.find(({ id }) => String(id) === String(selected));
  if (!currentProduct) {
    currentProduct = products.find(
      (p) => String(p.name).toLowerCase() === String(selected).toLowerCase()
    );
  }
  if (!currentProduct) return; // nothing selected / invalid value
  recordGroup.append(createRowTemplate(currentProduct, formData.get("quantity")));
  // hide the no-record message when we have at least one row
  if (noRecord) noRecord.style.display = 'none';
  createRecordForm.reset();
  updateTotals();
};

export const createRowTemplate = ({ id, name, price }, quantity) => {
  const fragment = recordTemplate.content.cloneNode(true);

  const recordRow = fragment.querySelector(".record-row");
  // template uses product-row-* class names
  const recordName = fragment.querySelector(".product-row-name");
  const recordPrice = fragment.querySelector(".product-row-price");
  const recordQuantity = fragment.querySelector(".product-row-quantity");
  const recordTotal = fragment.querySelector(".product-row-cost");

  if (recordRow) recordRow.setAttribute("data-id", id);
  if (recordName) recordName.innerText = name;
  const qty = Number(quantity) || 1;
  if (recordPrice) recordPrice.innerText = price + " MMK";
  if (recordQuantity) recordQuantity.innerText = qty;
  if (recordTotal) recordTotal.innerText = price * qty + " MMK";

  return fragment;

};

export const clacTotal = () => {
   let total = 0;
   recordGroup.querySelectorAll('.product-row-cost').forEach(
    (element) => {
      // element.innerText is like "12345 MMK" — parseFloat will extract numeric part
      total += parseFloat(element.innerText) || 0;
    }
   )
   return total;
}

export const calcTax = (amount , percentage = 5) => {
  return (amount * percentage) / 100;
}

// Update total/tax/net fields
const updateTotals = () => {
  const total = clacTotal();
  if (totalAmount) totalAmount.innerText = total + " MMK";
  if (taxAmount) taxAmount.innerText = calcTax(total) + " MMK";
  if (netTotal) netTotal.innerText = (total + calcTax(total)) + " MMK";
  toggleNoRecord();
}

const toggleNoRecord = () => {
  if (!noRecord) return;
  if (recordGroup.querySelectorAll('.record-row').length === 0) {
    noRecord.style.display = '';
  } else {
    noRecord.style.display = 'none';
  }
}

// Event delegation to handle remove actions
recordGroup.addEventListener('click', (e) => {
  const btn = e.target.closest && e.target.closest('.record-remove');
  if (!btn) return;
  const row = btn.closest('.record-row');
  if (row) {
    row.remove();
    updateTotals();
  }
});

