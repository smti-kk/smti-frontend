// Аккордион
let accordBtn = document.querySelectorAll('.c-accordion-title');
accordBtn.forEach(function (btn) {
    btn.addEventListener("click", function () {
      this.querySelector('.c-accordion-button').classList.toggle('is-open');
      this.nextElementSibling.classList.toggle('is-open');
    });
});

// Модальное окно. Кнопка закрыть
let close = document.querySelector('.close');
if (close) {
  close.addEventListener('click', function () {
    let modal = document.querySelector('.modal');
    modal.classList.add('hide');
  });
}

// Фильтр. Кнопки сортировки.
let filter = document.querySelector('.js-filter-button');
let filterBtn = document.querySelectorAll('.c-filter-button');
if(filter) {
  filter.addEventListener('click', (e) => {
    if (e.target.classList.contains('is-active')) {
      e.target.classList.toggle('u-back-sort');
    } else {
      filterBtn.forEach(function (btn) {
        btn.classList.remove('is-active', 'u-back-sort');
        if (e.target === btn) {
          btn.classList.add('is-active');
        }
      });
    }
  });
}

// Фильтр. Формы сортировки
let filterContainer = document.querySelector('.l-container');
if (filterContainer) {
  let inputBtns = filterContainer.getElementsByTagName('input');
  let selectList = filterContainer.getElementsByTagName('select');

  for(let btn of inputBtns) {
    btn.addEventListener('change', ChangeFilter);
  }

  for(let select of selectList) {
    select.addEventListener('change', ChangeFilter);
  }

  function ChangeFilter() {
    let parent = this.closest('.is-disabled');
    if (parent) {
        parent.classList.remove('is-disabled');
        parent.classList.add('is-active');
    }
  }
}

// Фильтр. Кнопка сброса
let reset = document.querySelector('.filter-btn-reset');
if (reset) {
  reset.addEventListener('click', () => {
    filterBtn.forEach(function (btn) {
      btn.classList.remove('u-back-sort', 'is-active');
    });

    let filterItemWrap = document.querySelectorAll('.is-active');
    filterItemWrap.forEach(function (wrap) {
      wrap.classList.remove('is-active');
      wrap.classList.add('is-disabled');
    });
  });
}

// Вкладки.
let tab = document.querySelector('.c-tab-header');
let tabTitle = document.querySelectorAll('.c-tab-title');
let tabBody = document.querySelectorAll('.c-tab-item');

if (tab) {
  tab.addEventListener('click', (e) => {
    tabTitle.forEach(function (item, index) {
      if (!e.target.classList.contains('tab-title')) {
        item.classList.remove('active');
        tabBody[index].classList.remove('active');
      }
      if (e.target === item) {
        item.classList.add('active');
        tabBody[index].classList.add('active');
      }
    });
  });
}

// Форма. Кнопка редактирования
let btnEditForm = document.querySelector('.btn-edit-form');
if(btnEditForm) {
  btnEditForm.addEventListener('click', function () {
    let fieldset = document.getElementsByTagName('fieldset');
    fieldset[0].removeAttribute('disabled');

    document.querySelector('.edit-form').classList.remove('is-disabled');
    document.querySelector('.edit-status').style.display = 'block';

    let editFotmBtns = document.querySelectorAll('.edit-form-btn');
    editFotmBtns.forEach(function(btn) {
      btn.style.display = 'block';
    });
  });
}

// Форма. Кнопка комментария и сохранения формы
let comment = document.getElementById('comment');
let btnSaveComment = document.querySelector('.btn-save-comment');
if (comment){
  comment.addEventListener('keydown', () => {
    btnSaveComment.removeAttribute('disabled');
    btnSaveComment.style.opacity = '1';
    btnSaveComment.addEventListener('click', () => {
      let btnSaveForm = document.querySelector('.btn-save-form');
      btnSaveForm.removeAttribute('disabled');
      btnSaveForm.style.opacity = '1';
    });
  });
}

// Сводная таблица сравнение тех. возможностей
let tech = document.getElementById('tech');
let mobile = document.getElementById('mobile');
let internet = document.getElementById('internet');

if(tech) {
  tech.addEventListener('change', function () {
    if (this.value == 'mobile') {
      mobile.style.display = "flex";
      internet.style.display = "none";
    }
    if (this.value == 'internet') {
      mobile.style.display = "none";
      internet.style.display = "flex";
    }
  });
}


let btnEditItem = document.querySelectorAll('.btn-edit-item');
if(btnEditItem) {
  btnEditItem.forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelector('.c-modal').style.display = 'flex';
    })
  });
}
