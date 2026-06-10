const portal  = document.getElementById('portal');
const boxes   = { green: document.querySelector('.box.green'), orange: document.querySelector('.box.orange'), pink: document.querySelector('.box.pink') };
const buttons = document.querySelectorAll('.variant-btn');

function activate(color) {
    // Update portal glow
    portal.className = 'portal';
    if (color !== 'green') portal.classList.add(color);

    // Swap drink visibility
    Object.entries(boxes).forEach(([key, el]) => {
        if (key === color) {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.82) rotate(-8deg)';
        }
    });

    // Update active button
    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === color);
    });
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.color));
});
