document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('name');
  const showBtn = document.getElementById('showBtn');
  const clearBtn = document.getElementById('clearBtn');
  const output = document.getElementById('output');
  const count = document.getElementById('count');

  function updateCount() {
    count.textContent = 'Caracteres: ' + input.value.length;
  }

  showBtn.addEventListener('click', function () {
    output.textContent = input.value || 'No escribiste nada.';
  });

  clearBtn.addEventListener('click', function () {
    input.value = '';
    output.textContent = 'Aquí aparecerá tu texto.';
    updateCount();
  });

  input.addEventListener('input', function () {
    updateCount();
    output.textContent = input.value ? input.value : 'Aquí aparecerá tu texto.';
  });

  updateCount();
});