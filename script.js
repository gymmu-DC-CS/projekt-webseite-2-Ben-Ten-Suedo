// Simple 5-question quiz about the shoes.
(() => {
  document.addEventListener('DOMContentLoaded', () => {
  const quizData = [
    {
      q: 'Which membrane makes the shoes waterproof?',
      options: ['Sympatex', 'Gore-Tex', 'eVent', 'No membrane'],
      a: 1 // Gore-Tex
    },
    {
      q: 'Which model is described as lighter and more agile?',
      options: ['ST', 'LT', 'Both', 'Neither'],
      a: 1 // LT
    },
    {
      q: 'What is the recommended use mentioned for the LT model?',
      options: ['Fast hikes / approaches', 'Ice climbing', 'Road running', 'Casual wear'],
      a: 0
    },
    {
      q: 'Which classification were the boots described as (for crampon compatibility)?',
      options: ['B0', 'B1', 'B2', 'C1'],
      a: 2 // B2
    },
    {
      q: 'Are both models described as having a Vibram outsole for grip?',
      options: ['Yes', 'No'],
      a: 0
    }
  ];

  // Elements
  const openBtn = document.getElementById('open-quiz');
  const modal = document.getElementById('quiz-modal');
  const closeBtn = document.getElementById('close-quiz');
  const quizBody = document.getElementById('quiz-body');
  const prevBtn = document.getElementById('prev-q');
  const nextBtn = document.getElementById('next-q');
  const submitBtn = document.getElementById('submit-quiz');
  const resultEl = document.getElementById('quiz-result');

  let current = 0;
  const answers = new Array(quizData.length).fill(null);

  function openQuiz(){
    modal.setAttribute('aria-hidden','false');
    renderQuestion();
  }

  function closeQuiz(){
    modal.setAttribute('aria-hidden','true');
    resultEl.textContent = '';
  }

  function renderQuestion(){
    const q = quizData[current];
    quizBody.innerHTML = '';
    const qEl = document.createElement('div');
    qEl.className = 'quiz-body-question';
    const p = document.createElement('p');
    p.textContent = `${current+1}. ${q.q}`;
    qEl.appendChild(p);

    q.options.forEach((opt, i) =>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option';
      btn.textContent = opt;
      if (answers[current] === i) btn.classList.add('selected');
      btn.addEventListener('click', ()=>{
        answers[current] = i;
        // mark selected
        Array.from(quizBody.querySelectorAll('.quiz-option')).forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
      });
      qEl.appendChild(btn);
    });

    quizBody.appendChild(qEl);
    prevBtn.style.display = current === 0 ? 'none' : '';
    nextBtn.style.display = current === quizData.length -1 ? 'none' : '';
    submitBtn.style.display = current === quizData.length -1 ? '' : 'none';
  }

  function goNext(){
    if (current < quizData.length -1){
      current++;
      renderQuestion();
    }
  }

  function goPrev(){
    if (current > 0){
      current--;
      renderQuestion();
    }
  }

  function submit(){
    // calculate score
    let score = 0;
    quizData.forEach((q,i)=>{
      if (answers[i] === q.a) score++;
    });
    resultEl.textContent = `You scored ${score} / ${quizData.length}`;
    // show correct answers briefly
    const correctList = quizData.map((q,i)=>`${i+1}. ${q.options[q.a]}`).join('\n');
    const pre = document.createElement('pre');
    pre.style.whiteSpace = 'pre-wrap';
    pre.style.marginTop = '8px';
    pre.textContent = `Correct answers:\n${correctList}`;
    resultEl.appendChild(pre);
  }

  // events
  openBtn && openBtn.addEventListener('click', openQuiz);
  closeBtn && closeBtn.addEventListener('click', closeQuiz);
  nextBtn && nextBtn.addEventListener('click', goNext);
  prevBtn && prevBtn.addEventListener('click', goPrev);
  submitBtn && submitBtn.addEventListener('click', submit);

  // close modal on ESC
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeQuiz();
  });

  }); // DOMContentLoaded

})();
