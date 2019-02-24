/* eslint-disable no-restricted-globals */
const sText = document.getElementById('sText');
const sDone = document.getElementById('sDone');
const sWrong = document.getElementById('sWrong');
const sCurr = document.getElementById('sCurr');
const sPreDone = document.getElementById('sPreDone');
const sStart = document.getElementById('sStart');
const sSpeed = document.getElementById('sSpeed');
const sTimer = document.getElementById('sTimer');
const iPause = document.getElementById('iPause');
const dRecords = document.getElementById('dRecord');

const inputEle = document.getElementById('input');
const live = document.getElementsByClassName('dLive');


const text = ['Под поведением я подразумеваю как элемент обрабатывает события когда изменяется контент снаружи и внутри. Например, если вы не установили элементу высоту, то она будет увеличиваться пока в элементе не поместится весь контент.',
  'Когда-то Лудлет был ученым, изучавшим искусство транспозиции душ. В конце своей прошлой жизни он пожертвовал собой, чтобы возжечь Первое пламя. Когда прозвонил Колокол Пробуждения, Лудлет восстал из могилы и воссел на троне - единственным из всех.',
  'Остатки легендарного города богов, который впоследствии был захвачен Олдриком. Раньше здесь светило солнце, но сейчас здесь темно, так как Гвиндолин погиб, принеся вечную ночь, и наследники богов больше не покровительствуют городу. На страже собора до сих пор стоят серебряные рыцари, несмотря на то, что боги уже очень давно покинули его, а сам собор из обиталища богов превратился в центр разложения города, будучи захвачен приспешниками Олдрика и темными тварями. Возможно, из-за того, что над городом никогда не светит солнце, его сковал лед, как и весь Иритилл.',
  'Однажды Олдрик размышлял о затухающем пламени, и тогда ему явилось видение о новой эре глубокого моря. Он знал, что путь будет нелегким, но был бесстрашен. Ему предстояло пожирать самих богов.', 'Тест тест тест.'];

const defaul = {
  lives: 3,
  prevLength: 0, // Предыдущая длина значения input. Нужна для использования backspace
  defeat: false,
  curr: '',
  textArr: null,
  text: '',
  start: 3, // Время перед началом
  time: 0, // Времени дано
  speed: 0,
  done: false,
  spent: 0.0, // потрачено времени
  stop: false,
  result: 0,
  danger: 10
};

let state =
{

};

function dangerTime() {
  sTimer.style.color = 'red';
  sTimer.style.fontSize = `${String(++styles.timer.font_size)}px`;
}

const TextConsts =
{
  play: '▶',
  stop: '❚❚'
};

const styles =
{
  input:
  {
    wrong: 'lightcoral',
    default: 'white'
  },
  lives:
  {
    live: 'red',
    dead: 'white'
  },
  timer:
  {
    font_size: 16,
    danger: 'red',
    default: 'black',
    default_size() {
      this.font_size = 16;
    }
  }
};

function refreshS() {
  sCurr.textContent = '';
  sPreDone.textContent = '';
  sDone.textContent = '';
  sText.textContent = '';
  sWrong.textContent = '';
  inputEle.style.background = styles.input.default;
  inputEle.textContent = '';
  styles.timer.default_size();
  sTimer.style.fontSize = `${styles.timer.font_size}px`;
}

function refreshRecords() {
  while (dRecords.firstChild) {
    dRecords.removeChild(dRecords.firstChild);
  }
}

function newRecord(record) {
  const rec = [];

  let insearch = true;

  for (let i = 0; i < 3; i++) {
    rec.push(parseFloat(localStorage.getItem(`Record${i}`)));
    if (rec[i] < record && insearch) {
      rec.splice(i, 0, record);
      insearch = false;
    }
  }

  for (let i = 0; i < 3; i++) {
    localStorage.setItem(`Record${i}`, rec[i]);
  }
}

function writeRecords() {
  let el;

  refreshRecords();
  for (let i = 0; i < 3; i++) {
    el = document.createElement('p');
    el.textContent = `${i + 1}. ${parseFloat(localStorage.getItem(`Record${i}`))}`;
    dRecords.appendChild(el);
  }
}

function checkRecords() {
  const rec = localStorage.getItem('Record1');

  if (rec === null) {
    for (let i = 0; i < 3; i++) {
      localStorage.setItem(`Record${i}`, '0');
    }
  }
}

function disableInput() {
  inputEle.toggleAttribute('readonly', true);
  inputEle.blur();
}

function enableInput() {
  inputEle.toggleAttribute('readonly', false);
  inputEle.focus();
}

function newGame(s) {
  const answer = confirm(s);

  if (answer) { start(defaul.start + 1); }
}

function pauseWrite() {
  if (state.stop) { iPause.value = TextConsts.play; } else { iPause.value = TextConsts.stop; }
}

// пауза
function stop() {
  state.stop = true;
  pauseWrite();
  disableInput();
}

function unstop() {
  state.stop = false;
  pauseWrite();
  enableInput();
}

// eslint-disable-next-line no-unused-vars
function pauseBeh() {
  if (state.stop) {
    unstop();
  } else {
    stop();
  }
}

function win() {
  fromPreDoneToDone();
  disableInput();
  inputEle.value = '';
  state.result = sDone.textContent.length / state.spent * 60;
  newRecord(state.result);
  refreshS();
  writeRecords();
  state.done = true;
  newGame(`Ваша скорость ${state.result.toFixed(2)} знаков/мин \nНачать новую игру?`);
}


function defeat() {
  fromPreDoneToDone();
  state.defeat = true;
  disableInput();
  inputEle.value = '';
  state.result = sDone.textContent.length / state.spent * 60;
  refreshS();
  state.done = true;
  newGame(`Вы проиграли. \nВаша скорость ${state.result.toFixed(2)} знаков/мин \nНачать новую игру?`);
}


function speedListener() {
  if (state.time !== 0 && !state.done && !state.stop) {
    state.spent = state.spent === 0 ? 1 : state.spent;
    state.speed = (60.0 / state.spent) * (sDone.textContent.length);
    setTimeout(speedListener, 300);
  } else if (state.done) {
    state.speed = (60.0 / state.spent) * (state.result);
  }
  if (state.stop) { setTimeout(speedListener, 200); }
  state.speed = isNaN(state.speed) ? 0 : state.speed;
}

function speedWriter() {
  if (!state.done && !state.stop) {
    sSpeed.textContent = `Скорость: ${state.speed.toFixed(2)} знаков/мин`;
    setTimeout(speedWriter, 3000);
  }
}

function timer() {
  if (!state.done && !state.stop) {
    if (state.time !== 0) {
      --state.time;
      ++state.spent;
      sTimer.innerText = ` ${state.time}`;
      if (state.time <= 10) {
        dangerTime();
      }
      setTimeout(timer, 1000);
    } else { defeat(); }
  }
  if (state.stop) { setTimeout(timer, 100); }
}
// перевод следующего слова, в текущее
// eslint-disable-next-line max-statements
function nextWordToCurr() {
  let first;

  let last;

  let space;

  state.prevLength = 0;
  [first, ...last] = state.textArr;
  if (first !== undefined) {
    state.textArr = last;
    space = last.length !== 0 ? space = ' ' : '';
    sCurr.textContent = first + space;
    state.curr = first + space;
    state.text = state.textArr.join(' ');
    sText.textContent = state.text;
    fromPreDoneToDone();
    inputEle.value = '';
    inputEle.setAttribute('maxlength', String(state.curr.length));
  } else {
    win();
  }
}

function restoreLives() {
  const live = document.getElementsByClassName('dLive');

  for (let i = 0; i < defaul.lives; i++) { live[i].style.background = styles.lives.live; }
}

function minusLive() {
  state.lives--;
  live[state.lives].style.background = styles.lives.dead;
  if (state.lives === 0) {
    defeat();
  }
}

// Перекидывает первый символ второго аргумента, в последний символ первого
function symbolFromToFirst(s1, s2) {
  if (s2.textContent !== '') {
    s1.textContent += s2.textContent[0];
    s2.textContent = s2.textContent.substr(1, s2.textContent.length - 1);
  }
}

// Перекидывает последний символ второго аргумента, в первый символ первого
function symbolFromToLast(s1, s2) {
  if (s2.textContent !== '') {
    s1.textContent = s2.textContent[s2.textContent.length - 1] + s1.textContent;
    s2.textContent = s2.textContent.substr(0, s2.textContent.length - 1);
  }
}

function fromPreDoneToDone() {
  if (sPreDone.textContent !== '') {
    sDone.textContent += ` ${sPreDone.textContent}`;
    sPreDone.textContent = '';
  }
}

function fromCurrToWrong() {
  symbolFromToFirst(sWrong, sCurr);
  inputEle.style.background = styles.input.wrong;
  minusLive();
}

function fromCurrToPreDone() {
  symbolFromToFirst(sPreDone, sCurr);
}

function fromWrongToCurr() {
  symbolFromToLast(sCurr, sWrong);
  if (sWrong.textContent === '') { inputEle.style.background = styles.input.default; }
}

function fromPreDoneToСurr() {
  symbolFromToLast(sCurr, sPreDone);
}

function stateToDefault() {
  state = { ...state, ...defaul };
}

// eslint-disable-next-line max-statements
function start(val) {
  val--;
  setTimeout(speedWriter, 3000);
  sStart.innerText = String(val);
  if (val !== 0) {
    setTimeout(start, 1000, val);
  } else {
    state.textId = Math.floor(Math.random() * text.length);
    sStart.innerText = '';
    stateToDefault();
    restoreLives();
    //state.textId = 4;
    state.text = text[state.textId];
    state.textArr = state.text.split(' ');

    state.time = Math.floor(state.text.length * 0.5) + 1;
    sText.innerText = text[state.textId];
    enableInput();

    nextWordToCurr();
    timer();
    speedListener();
  }
}

// eslint-disable-next-line no-unused-vars
function inputBeh() {
  const input = inputEle.value;

  const sub = state.curr.substr(0, input.length);

  if (inputEle.value.length > state.prevLength) {
    if (input === sub) {
      fromCurrToPreDone();
      if (sPreDone.textContent === state.curr) {
        nextWordToCurr();
      }
    } else {
      fromCurrToWrong();
    }
  } else if (sWrong.textContent !== '') {
    fromWrongToCurr();
  } else {
    fromPreDoneToСurr();
  }
  state.prevLength = inputEle.value.length;
}

checkRecords();
writeRecords();
stateToDefault();
pauseWrite();
start(defaul.start + 1);
