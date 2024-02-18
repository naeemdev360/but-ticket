const ALPHABETS = 'ABCDEFGHIJ';

const wrapper = document.getElementById('seats');
const selectedSeatsWrapper = document.getElementById('selected-seats');
const totalPrice = document.getElementById('total-price');
const couponInput = document.getElementById('coupon-input');
const applyBtn = document.getElementById('applyBtn');
const grandTotal = document.getElementById('grand-price');
const modal = document.getElementById('modal');
const nextBtn = document.getElementById('nextBtn');

const SELECTED_SEATS = [];

ALPHABETS.split('').forEach(function (item) {
  const row = document.createElement('div');
  row.className = 'flex flex-item gap-5';
  row.innerHTML = `<button class="py-2 px-4 w-10">${item}</button>`;
  for (let i = 1; i <= 4; i++) {
    const button = document.createElement('button');
    button.className = 'py-2 px-4 w-20 bg-gray-200 text-center';
    button.textContent = item + i;
    row.appendChild(button);
    button.addEventListener('click', function (e) {
      // Check if already selected
      if (SELECTED_SEATS.includes(item + i)) {
        const index = SELECTED_SEATS.indexOf(item + i);
        SELECTED_SEATS.splice(index, 1);
        e.target.className = 'py-2 px-4 w-20 bg-gray-200 text-center';
      } else {
        if (SELECTED_SEATS.length < 4) {
          e.target.className =
            'py-2 px-4 w-20 bg-green-500 text-center text-white';
          SELECTED_SEATS.push(item + i);
        }
      }
      console.log(SELECTED_SEATS);
      printSeats(SELECTED_SEATS);
      calcPriceAndPrint(SELECTED_SEATS);
    });
  }
  wrapper.appendChild(row);
});

function printSeats(NEW_SELECTED) {
  selectedSeatsWrapper.innerHTML = '';
  NEW_SELECTED.forEach(function (item) {
    selectedSeatsWrapper.innerHTML += `
        <div class='flex justify-between'>
            <span>${item}</span>
            <span>Economoy</span>
            <span>550</span>
        </div>`;
  });
}

function calcPriceAndPrint(NEW_SELECTED) {
  totalPrice.textContent = 550 * NEW_SELECTED.length;
  grandTotal.textContent = 550 * NEW_SELECTED.length;
}

applyBtn.addEventListener('click', function () {
  const totalPrice = 550 * SELECTED_SEATS.length;
  const value = couponInput.value;
  if (value === 'NEW15') {
    grandTotal.textContent = 0.15 * totalPrice;
  } else if (value === 'Couple 20') {
    grandTotal.textContent = 0.2 * totalPrice;
  } else {
    alert('Invalid coupon!');
  }
});

nextBtn.addEventListener('click', function () {
  modal.style.display = 'flex';
});
modal.addEventListener('click', function () {
  modal.style.display = 'none';
});
