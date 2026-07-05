import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { openModal } from '../success_modal/success_modal.js'

const formCont = document.querySelector('.contacts-form');
const contLoad = document.querySelector('.cnt-loader');



formCont.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { name, phone, message } = e.target.elements;
    
    const mformData = {
        name: name.value,
        phone: phone.value,
        message: message.value,
    }

    try {
        showContactsLoader();  
        const response = await axios.post(
            'https://wedding-photographer.b.goit.study/api/orders',
             mformData
        );  
        showContactsLoader();

        if (response.status === 201) {
            openModal();
        } 

        e.target.reset();
    } catch (error) { 
        iziToast.error({
            title: 'Error',
            message: error.message,
            position:'topRight',
            timeout: 5000,
        });
    }
});


function showContactsLoader() { 
    contLoad.classList.toggle('cnt-hidden');
};
