const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

if (!inputEl || !buttonEl || !timerEl) {
    console.error('Не удалось найти все необходимые элементы.');
}

const M_SYSTEM = 60

const addZero = (number) => number < 10 ? '0' + number : number

const timeFormated = (time) => {

    const
        hours = Math.floor(time / M_SYSTEM / M_SYSTEM),
        minutes = Math.floor(time / M_SYSTEM) - (hours * M_SYSTEM),
        seconds = time % M_SYSTEM;

    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
}

const createTimerAnimator = () => {

    let timerId

    return (seconds) => {

        clearInterval(timerId);

        const updateTime = () => {
            seconds--;
            timerEl.textContent = timeFormated(seconds);

            if (seconds === 0) clearInterval(timerId);
        };

        updateTime();

        timerId = setInterval(updateTime, 1000);
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {

    const value = e.target.value;

    e.target.value = value.replace(/\D/g, '');
    // if (isNaN(+value)) e.target.value = value.slice(0, -1);
});

buttonEl.addEventListener('click', () => {

    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
});

