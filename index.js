function updateClock() {
    const now = new Date();
    updateDigitalClock(now);
    updateAnalogClock(now);
    requestAnimationFrame(updateClock);
}

function updateDigitalClock(now) {
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const ampm = document.getElementById("ampm");

    let h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const am = h >= 12 ? "PM" : "AM";

    h = h % 12 || 12;

    hours.innerHTML = `${h < 10 ? '0' + h : h}<span id='time_disp'>시</span>`;
    minutes.innerHTML = `${m < 10 ? '0' + m : m}<span id='time_disp'>분</span>`;
    seconds.innerHTML = `${s < 10 ? '0' + s : s}<span id='time_disp'>초</span>`;
    ampm.innerHTML = am;
}

function updateAnalogClock(now) {
    const hh = document.getElementById("hh");
    const mm = document.getElementById("mm");
    const ss = document.getElementById("ss");

    const hr_dot = document.querySelector(".hr_dot");
    const min_dot = document.querySelector(".min_dot");
    const sec_dot = document.querySelector(".sec_dot");

    const h = now.getHours() % 12 || 12;
    const m = now.getMinutes();
    const s = now.getSeconds();
    const ms = now.getMilliseconds();

    const secondsFraction = (s * 1000 + ms) / 60000;
    const minutesFraction = (m * 60 + s + ms / 1000) / 3600;
    const hoursFraction = (h * 3600 + m * 60 + s + ms / 1000) / 43200;

    ss.style.strokeDashoffset = 440 - 440 * secondsFraction;
    mm.style.strokeDashoffset = 440 - 440 * minutesFraction;
    hh.style.strokeDashoffset = 440 - 440 * hoursFraction;

    sec_dot.style.transform = `rotate(${secondsFraction * 360}deg)`;
    min_dot.style.transform = `rotate(${minutesFraction * 360}deg)`;
    hr_dot.style.transform = `rotate(${hoursFraction * 360}deg)`;
}

requestAnimationFrame(updateClock);
