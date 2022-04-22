const apiBaseUrl = 'https://api.exchangerate.host';
const form = document.querySelector('#converter-form');
const fromInput = document.querySelector('input[name=from-amount]');
const toInput = document.querySelector('input[name=to-amount]');
const fromRate = document.querySelector('#from-rate');
const toRate = document.querySelector('#to-rate');

window.addEventListener('load', e => initData());

const maskOptions = {
    mask: Number,  // enable number mask

    scale: 4,
    signed: false,
    thousandsSeparator: ' ',
    padFractionalZeros: false,
    normalizeZeros: true,
    radix: '.',
    mapToRadix: ['.'],
};

const fromMask = IMask(fromInput, maskOptions);
const toMask = IMask(toInput, maskOptions);

form.addEventListener('input', e => {
    e.target.name === 'to-amount' ? initData(false) : initData();
})

async function initData(direction = true) {
    const formData = new FormData(form);

    let data = {};
    formData.forEach((v, k) => data[k] = v);

    const url = new URL('/convert', apiBaseUrl);
    url.searchParams.set('from', direction ? data.from : data.to);
    url.searchParams.set('to', direction ? data.to : data.from);
    url.searchParams.set('amount', (direction ? fromMask : toMask).unmaskedValue);
    url.searchParams.set('places', 4);

    const response = await fetch(url).then(r => r.json());

    if (direction) {
        toMask.value = response.result?.toString() || '';
        fromRate.innerHTML = `1 ${data.from} = ${response.info.rate} ${data.to}`;
        toRate.innerHTML = `1 ${data.to} = ${Math.round(10000 / response.info.rate) / 10000} ${data.from}`;
    } else {
        fromMask.value = response.result?.toString() || '';
    }
}