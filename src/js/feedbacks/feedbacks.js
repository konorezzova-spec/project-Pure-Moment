// ---------- imports ----------

import axios from 'axios';

import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ---------- global variables init ----------

let feedbacksCount;
// let feedbacks = [];

// ---------- main logic start ----------

feedbacks(); // START main function

// ----------    functions    ----------
//main function calls secondary functions one-by-one
async function feedbacks() {
  //call function toget data from backend
  try {
    const data = await getFeedbacks();

    renderFeedbacks(data); //render

    initSwiper();
  } catch (error) {
    console.error(error);
  }
}

//function gets data-array  from backend
async function getFeedbacks() {
  try {
    const response = await axios.get(
      'https://wedding-photographer.b.goit.study/api/feedbacks'
    );
    // feedbacks = response.data;
    // renderFeedbacks(feedbacks);
    // renderFeedbacks(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//function renders HTML from data received from backend
function renderFeedbacks(feedbacksObject) {
  feedbacksCount = feedbacksObject.total;

  const feedbacksList = document.querySelector('.feedbacks-list');
  console.log(feedbacksList);

  const feedbacksItems = feedbacksObject.feedbacks
    .map(
      feedbacksArrayItem =>
        `<li class="feedbacks-item swiper-slide">
      <p class="feedbacks-item-text">${feedbacksArrayItem.descr}</p>
      <p class="feedbacks-item-author">${feedbacksArrayItem.name}</p>
    </li>`
    )
    .join('');

  feedbacksList.insertAdjacentHTML('beforeend', feedbacksItems);
}

//function   initialize  swiper

function initSwiper() {
  new Swiper('.swiper', {
    modules: [Navigation, Pagination, Keyboard, A11y],

    slidesPerView: 1,
    spaceBetween: 24,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      addIcons: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // pagination: false,

    keyboard: {
      enabled: true,
      onlyInViewport: false,
      pageUpDown: true,
    },

    a11y: {
      enabled: true,
    },
  });
}
