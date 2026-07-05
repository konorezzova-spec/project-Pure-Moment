import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { openModal } from '../success_modal/success_modal.js'

const formCont = document.querySelector('.contacts-form');

formCont.addEventListener('submit',async (e) => { 
    e.preventDefault();


    const { name, phone, message } = e.target.elements;
    
    const mformData = {
        name: name.value,
        phone: phone.value,
        message:message.value,
    }

    try {
        //  openModal();
        const response =await axios.post(
            'https://wedding-photographer.b.goit.study/api/orders',
            mformData
        );
        
        console.log(response.status);
        if (response.status === 201) {
            openModal();
        }
        
        e.target.reset();
    } catch (error) { 
        iziToast.error({
            title: 'Error',
            message: error.message,
            position:'topLeft',
            timeout: 5000,
        });
    }
});
