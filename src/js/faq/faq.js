import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

new Accordion('#accordion', {
  duration: 400,
  showMultiple: false,

  elementClass: 'ac',
  triggerClass: 'ac-header',
  panelClass: 'ac-panel',
});
