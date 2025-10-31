import { createRecordForm, netTotal, recordGroup, recordTemplate, totalAmount, taxAmount, noRecord } from "./selectors";
import Swal from 'sweetalert2';
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

  const addQty = Number(formData.get("quantity")) || 1;
  // check if this product already exists in the current invoice rows
  const existingRow = recordGroup.querySelector(`.record-row[data-id="${currentProduct.id}"]`);
  if (existingRow) {
    // ask user whether to add the quantity to existing row or cancel
    Swal.fire({
      title: `${currentProduct.name} is already in the invoice`,
      text: `Do you want to add ${addQty} more to the existing quantity?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const qtyEl = existingRow.querySelector('.product-row-quantity');
        const priceEl = existingRow.querySelector('.product-row-price');
        const costEl = existingRow.querySelector('.product-row-cost');
        let qty = Number(qtyEl.innerText) || 0;
        qty += addQty;
        qtyEl.innerText = qty;
        const price = parseFloat(priceEl.innerText) || 0;
        costEl.innerText = (price * qty) + ' MMK';
        updateTotals();
        createRecordForm.reset();
      }
      // if cancelled, do nothing and leave the form as-is
    });
  } else {
    recordGroup.append(createRowTemplate(currentProduct, addQty));
    // hide the no-record message when we have at least one row
    if (noRecord) noRecord.style.display = 'none';
    createRecordForm.reset();
    updateTotals();
  }
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
  // remove button
  const removeBtn = e.target.closest && e.target.closest('.record-remove');
  if (removeBtn) {
    const row = removeBtn.closest('.record-row');
    if (row) {
      row.remove();
      updateTotals();
    }
    return;
  }

  // increase quantity
  const incBtn = e.target.closest && e.target.closest('.qty-increase');
  if (incBtn) {
    const row = incBtn.closest('.record-row');
    if (!row) return;
    const qtyEl = row.querySelector('.product-row-quantity');
    const priceEl = row.querySelector('.product-row-price');
    const costEl = row.querySelector('.product-row-cost');
    let qty = Number(qtyEl.innerText) || 0;
    qty += 1;
    qtyEl.innerText = qty;
    const price = parseFloat(priceEl.innerText) || 0;
    costEl.innerText = (price * qty) + ' MMK';
    updateTotals();
    return;
  }

  // decrease quantity (min 1)
  const decBtn = e.target.closest && e.target.closest('.qty-decrease');
  if (decBtn) {
    const row = decBtn.closest('.record-row');
    if (!row) return;
    const qtyEl = row.querySelector('.product-row-quantity');
    const priceEl = row.querySelector('.product-row-price');
    const costEl = row.querySelector('.product-row-cost');
    let qty = Number(qtyEl.innerText) || 0;
    if (qty > 1) {
      qty -= 1;
      qtyEl.innerText = qty;
      const price = parseFloat(priceEl.innerText) || 0;
      costEl.innerText = (price * qty) + ' MMK';
      updateTotals();
    }
    return;
  }
});

