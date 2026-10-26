/**
 * Клиентская логика лендинга.
 * Нативный ES-модуль, IntersectionObserver, Pointer Events и Swiper.
 */

import Swiper from 'swiper';
import { A11y, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Fancybox } from '@fancyapps/ui';
import 'swiper/css';
import 'swiper/css/pagination';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/*  Липкая шапка + подсветка активного пункта                         */
/* ------------------------------------------------------------------ */

const initHeader = () => {
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const links = $$('[data-nav-link]');
  const sections = links
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      const isActive = !link.hasAttribute('data-nav-static') && link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      const firstVisible = sections.find((section) => visible.has(section.id));
      if (firstVisible) setActive(firstVisible.id);
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
};

/* ------------------------------------------------------------------ */
/*  Мобильное меню                                                    */
/* ------------------------------------------------------------------ */

const initMenu = () => {
  const burger = $('[data-burger]');
  const menu = $('[data-mobile-menu]');
  if (!burger || !menu) return;

  let lockedScrollY = 0;

  const restoreScroll = (value) => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, value);
    root.style.scrollBehavior = previous;
  };

  const close = () => {
    if (menu.hidden) return;

    burger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    document.body.classList.remove('is-menu-open');
    document.body.style.top = '';
    restoreScroll(lockedScrollY);

    window.requestAnimationFrame(() => {
      if (Math.abs(window.scrollY - lockedScrollY) > 1) restoreScroll(lockedScrollY);
    });
  };

  const open = () => {
    lockedScrollY = window.scrollY;
    burger.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    document.body.classList.add('is-menu-open');
    document.body.style.top = `-${lockedScrollY}px`;
    menu.scrollTop = 0;
  };

  burger.addEventListener('click', () => {
    if (menu.hidden) open();
    else close();
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a, [data-modal-open]')) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) {
      close();
      burger.focus({ preventScroll: true });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && !menu.hidden) close();
  });
};

/* ------------------------------------------------------------------ */
/*  Модальное окно записи                                             */
/* ------------------------------------------------------------------ */

const initModals = () => {
  const modal = $('[data-modal]');
  if (!modal) return;

  const form = $('[data-modal-form]', modal);
  const success = form ? $('[data-form-success]', form) : null;
  const firstName = form?.elements.name;

  const close = () => {
    if (modal.open) modal.close();
  };

  const open = (trigger) => {
    if (modal.open) return;

    form?.reset();
    if (success) success.hidden = true;
    $$('.has-error', modal).forEach((field) => field.classList.remove('has-error'));

    const message = trigger?.dataset.modalMessage;
    if (message && form?.elements.message) form.elements.message.value = message;

    modal.showModal();
    document.body.classList.add('is-modal-open');
    firstName?.focus();
  };

  $$('[data-modal-open]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      open(button);
    });
  });

  $$('[data-modal-close]', modal).forEach((button) => {
    button.addEventListener('click', close);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  modal.addEventListener('close', () => {
    document.body.classList.remove('is-modal-open');
  });
};

/* ------------------------------------------------------------------ */
/*  Мобильная липкая панель CTA                                       */
/* ------------------------------------------------------------------ */

const initCaseAgeGate = () => {
  const gate = $('[data-case-gate]');
  const modal = $('[data-age-modal]');
  if (!gate || !modal) return;

  const locked = $('[data-case-locked]', gate);
  const grid = $('[data-case-grid]', gate);
  const photos = $$('[data-case-photo]', gate);
  const openButtons = $$('[data-age-open]', gate);
  const confirm = $('[data-age-confirm]', modal);
  const deny = $('[data-age-deny]', modal);

  const close = () => {
    if (modal.open) modal.close();
  };

  const reveal = () => {
    if (gate.classList.contains('is-revealed')) return;

    gate.classList.add('is-revealed');

    photos.forEach((img) => {
      const src = img.dataset.src;
      if (!src) return;

      img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
      img.addEventListener('error', () => img.classList.add('is-error'), { once: true });
      img.src = src;
      img.removeAttribute('data-src');
    });

    if (locked) locked.hidden = true;
    if (grid) grid.hidden = false;

    close();

    window.requestAnimationFrame(() => {
      grid?.focus({ preventScroll: true });
    });
  };

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (gate.classList.contains('is-revealed') || modal.open) return;
      modal.showModal();
      document.body.classList.add('is-modal-open');
      confirm?.focus();
    });
  });

  confirm?.addEventListener('click', reveal);
  deny?.addEventListener('click', close);

  $$('[data-age-close]', modal).forEach((button) => {
    button.addEventListener('click', close);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  modal.addEventListener('close', () => {
    document.body.classList.remove('is-modal-open');
  });
};

/* ------------------------------------------------------------------ */
/*  Слайдер отзывов                                                   */
/* ------------------------------------------------------------------ */

const initReviewsSlider = () => {
  const root = $('[data-reviews-root]');
  if (!root) return;

  const slider = $('[data-reviews-slider]', root);
  if (!slider) return;

  new Swiper(slider, {
    modules: [A11y, Keyboard, Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    speed: reduceMotion ? 0 : 500,
    loop: true,
    grabCursor: true,
    watchOverflow: true,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: {
      prevEl: $('[data-reviews-prev]', root),
      nextEl: $('[data-reviews-next]', root),
    },
    pagination: {
      el: $('[data-reviews-pagination]', root),
      type: 'progressbar',
    },
    a11y: {
      prevSlideMessage: 'Предыдущий отзыв',
      nextSlideMessage: 'Следующий отзыв',
      paginationBulletMessage: 'Перейти к отзыву {{index}}',
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 20 },
      1200: { slidesPerView: 3, spaceBetween: 24 },
    },
  });
};

const initLicenseGallery = () => {
  const links = $$('[data-fancybox="licenses"]');
  if (!links.length) return;

  Fancybox.bind('[data-fancybox="licenses"]', {
    Carousel: {
      infinite: false,
    },
  });
};

const COOKIE_CONSENT_NAME = 'lafemme_cookie_consent';
const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365;

const getCookie = (name) => {
  const prefix = `${name}=`;
  const value = document.cookie.split('; ').find((item) => item.startsWith(prefix));
  return value ? decodeURIComponent(value.slice(prefix.length)) : null;
};

const setCookie = (name, value, maxAge) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
};

const initCookieConsent = () => {
  const banner = $('[data-cookie-consent]');
  if (!banner) return;

  if (getCookie(COOKIE_CONSENT_NAME)) {
    banner.remove();
    return;
  }

  const accept = () => {
    setCookie(COOKIE_CONSENT_NAME, '1', COOKIE_CONSENT_MAX_AGE);
    banner.classList.remove('is-visible');
    window.setTimeout(() => banner.remove(), reduceMotion ? 0 : 350);
  };

  const show = () => {
    banner.hidden = false;
    window.requestAnimationFrame(() => banner.classList.add('is-visible'));
  };

  $$('[data-cookie-accept]', banner).forEach((button) => {
    button.addEventListener('click', accept);
  });

  window.setTimeout(show, 800);
};

const initStickyCta = () => {
  const bar = $('[data-sticky-cta]');
  const booking = $('#booking');
  if (!bar) return;

  let pastHero = false;
  let formVisible = false;

  const sync = () => {
    const isVisible = pastHero && !formVisible;
    bar.classList.toggle('is-visible', isVisible);
    document.body.classList.toggle('is-sticky-cta-visible', isVisible);
  };

  const hero = $('.hero, .service-hero');
  if (hero) {
    new IntersectionObserver(
      ([entry]) => {
        pastHero = !entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    ).observe(hero);
  }

  if (booking) {
    new IntersectionObserver(
      ([entry]) => {
        formVisible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 }
    ).observe(booking);
  }

  sync();
};

/* ------------------------------------------------------------------ */
/*  Появление блоков при скролле                                      */
/* ------------------------------------------------------------------ */

const initReveal = () => {
  const items = $$('.reveal');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(item);
  });
};

/* ------------------------------------------------------------------ */
/*  Сравнение «до / после»                                            */
/* ------------------------------------------------------------------ */

const initCompare = () => {
  $$('[data-compare]').forEach((root) => {
    const stage = $('[data-compare-stage]', root) || root;
    const clip = $('[data-compare-clip]', root);
    const handle = $('[data-compare-handle]', root);
    if (!clip || !handle) return;

    let position = 50;
    let demo = null;

    const apply = (value) => {
      position = Math.min(100, Math.max(0, value));
      clip.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
      handle.style.left = `${position}%`;
      handle.setAttribute('aria-valuenow', String(Math.round(position)));
    };

    const positionFromEvent = (event) => {
      const rect = stage.getBoundingClientRect();
      return ((event.clientX - rect.left) / rect.width) * 100;
    };

    const stopDemo = () => {
      if (demo) clearInterval(demo);
      demo = null;
    };

    handle.addEventListener('pointerdown', (event) => {
      stopDemo();
      handle.setPointerCapture(event.pointerId);
      handle.dataset.dragging = '1';
      event.preventDefault();
    });

    handle.addEventListener('pointermove', (event) => {
      if (handle.dataset.dragging) apply(positionFromEvent(event));
    });

    const release = () => {
      delete handle.dataset.dragging;
    };

    handle.addEventListener('pointerup', release);
    handle.addEventListener('pointercancel', release);
    handle.addEventListener('lostpointercapture', release);

    stage.addEventListener('pointerdown', (event) => {
      stopDemo();
      apply(positionFromEvent(event));
    });

    handle.addEventListener('keydown', (event) => {
      const step = event.shiftKey ? 10 : 4;
      const moves = { ArrowLeft: -step, ArrowRight: step, Home: -100, End: 100 };

      if (!Object.prototype.hasOwnProperty.call(moves, event.key)) return;

      stopDemo();
      apply(position + moves[event.key]);
      event.preventDefault();
    });

    apply(50);

    if (reduceMotion) return;

    new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const demoPositions = [62, 38, 50];
        let step = 0;

        demo = setInterval(() => {
          apply(demoPositions[step]);
          step += 1;
          if (step >= demoPositions.length) stopDemo();
        }, 900);
      },
      { threshold: 0.4 }
    ).observe(stage);
  });
};

/* ------------------------------------------------------------------ */
/*  Фильтр портфолио                                                  */
/* ------------------------------------------------------------------ */

const initCaseFilters = () => {
  const buttons = $$('[data-case-filter]');
  const grid = $('[data-case-grid]');
  if (!buttons.length || !grid) return;

  const cases = $$('[data-case-filters]', grid);

  const applyFilter = (id) => {
    let shown = 0;

    cases.forEach((item) => {
      const tags = item.dataset.caseFilters.trim().split(/\s+/);
      const isMatch = id === 'all' || tags.includes(id);

      item.classList.toggle('dart-hidden', !isMatch);
      if (isMatch) shown += 1;
    });

    buttons.forEach((button) => {
      const isActive = button.dataset.caseFilter === id;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    let empty = $('.portfolio__empty', grid.parentNode);
    if (!shown) {
      if (!empty) {
        empty = document.createElement('p');
        empty.className = 'portfolio__empty';
        empty.textContent = 'Работ по этому фильтру пока нет — посмотрите все работы.';
        grid.parentNode.append(empty);
      }
    } else if (empty) {
      empty.remove();
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.caseFilter));
  });
};

/* ------------------------------------------------------------------ */
/*  FAQ: открыт только один вопрос                                    */
/* ------------------------------------------------------------------ */

const initFaq = () => {
  const list = $('[data-accordion]');
  if (!list) return;

  list.addEventListener('toggle', (event) => {
    const item = event.target;
    if (!item.open || !item.matches('details')) return;

    $$('details', list).forEach((other) => {
      if (other !== item) other.open = false;
    });
  }, true);
};

/* ------------------------------------------------------------------ */
/*  Карта (Яндекс.Карты, виджет, грузится по скроллу)                 */
/* ------------------------------------------------------------------ */

const initMap = () => {
  const map = $('[data-map]');
  if (!map) return;

  const [lon, lat] = (map.dataset.coords || '').split(',').map(Number);
  if (!lon || !lat) return;

  const load = () => {
    const iframe = document.createElement('iframe');
    iframe.title = `Карта: ${map.dataset.address || 'адрес'}`;
    iframe.src = `https://yandex.ru/map-widget/v1/?ll=${lon}%2C${lat}&pt=${lon}%2C${lat},pm2rdm&z=17&l=map&lang=ru_RU`;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';

    map.replaceChildren(iframe);
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        load();
      },
      { rootMargin: '300px' }
    ).observe(map);
  } else {
    load();
  }
};

/* ------------------------------------------------------------------ */
/*  Формы заявок                                                      */
/* ------------------------------------------------------------------ */

const phoneDigits = (value) => value.replace(/\D/g, '');

/** маска +7 (___) ___-__-__ */
const formatPhone = (raw) => {
  let digits = phoneDigits(raw);
  if (!digits) return '';

  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  if (digits[0] !== '7') digits = `7${digits}`;

  const [, a = '', b = '', c = '', d = '', e = ''] = digits
    .slice(0, 11)
    .match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/) || [];

  let result = '+7';
  if (a) result += ` (${a}`;
  if (a.length === 3) result += ')';
  if (b) result += ` ${b}`;
  if (c) result += `-${c}`;
  if (d) result += `-${d}`;
  if (e) result += e;
  return result;
};

const isValidPhone = (value) => phoneDigits(value).length === 11;

const validators = {
  name: (value) => value.trim().length >= 2,
  phone: (value) => isValidPhone(value),
};

const initLeadForm = (form) => {
  const success = $('[data-form-success]', form);
  const isModal = form.hasAttribute('data-modal-form');
  const phone = form.elements.phone;
  const date = $('[data-booking-date]', form);

  if (date) {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    date.min = new Date(today.getTime() - offset).toISOString().slice(0, 10);
  }

  if (phone) {
    phone.addEventListener('input', () => {
      phone.value = formatPhone(phone.value);
    });
    phone.addEventListener('focus', () => {
      if (!phone.value) phone.value = formatPhone('+7');
    });
    phone.addEventListener('blur', () => {
      if (phoneDigits(phone.value).length <= 1) phone.value = '';
    });
  }

  const fieldOf = (input) => input.closest('.dart-field, .dart-consent');

  const validate = (input) => {
    const check = validators[input.dataset.validate];
    const valid = check
      ? check(input.value)
      : input.type === 'checkbox'
        ? input.checked
        : true;

    fieldOf(input)?.classList.toggle('has-error', !valid);
    return valid;
  };

  const required = ['name', 'phone', 'consent'];

  $$('[data-validate]', form).forEach((input) => {
    input.addEventListener('blur', () => validate(input));
    input.addEventListener('input', () => {
      if (fieldOf(input)?.classList.contains('has-error')) validate(input);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = required
      .map((name) => form.elements[name])
      .filter((input) => input instanceof HTMLElement);

    const invalid = fields.filter((input) => !validate(input));

    if (invalid.length) {
      invalid[0].focus();
      invalid[0].scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      return;
    }

    const action = form.getAttribute('action');
    const isDemo = !action || action === '#';

    if (!isDemo) {
      form.submit();
      return;
    }

    if (success) {
      success.hidden = false;
      if (!isModal) {
        success.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
  });
};

const initForms = () => {
  $$('[data-booking-form], [data-modal-form]').forEach(initLeadForm);
};

/* ------------------------------------------------------------------ */
/*  Подстановка услуги / специалиста из карточек                      */
/* ------------------------------------------------------------------ */

const initBookingPreselect = () => {
  const serviceSelect = $('[data-booking-service-select]');
  const specialistSelect = $('[data-booking-specialist-select]');
  if (!serviceSelect && !specialistSelect) return;

  const pick = (element, value) => {
    if (!element || !value) return;
    const match = [...element.options].find(
      (option) => option.value.toLowerCase() === String(value).trim().toLowerCase()
    );
    if (match) element.value = match.value;
  };

  $$('[data-booking-service]').forEach((link) => {
    link.addEventListener('click', () => pick(serviceSelect, link.dataset.bookingService));
  });

  $$('[data-booking-specialist]').forEach((link) => {
    link.addEventListener('click', () => pick(specialistSelect, link.dataset.bookingSpecialist));
  });
};

/* ------------------------------------------------------------------ */

const init = () => {
  initHeader();
  initMenu();
  initModals();
  initCookieConsent();
  initCaseAgeGate();
  initReviewsSlider();
  initLicenseGallery();
  initStickyCta();
  initReveal();
  initCompare();
  initCaseFilters();
  initFaq();
  initMap();
  initForms();
  initBookingPreselect();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
