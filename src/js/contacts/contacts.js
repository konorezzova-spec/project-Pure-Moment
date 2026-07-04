import axios from 'axios';


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
        const response =await axios.post(
            'https://wedding-photographer.b.goit.study/api/orders',
            mformData
        );
        console.log(response.status);
        const orderData = response.data;
        console.log(orderData);

        e.target.reset();
    } catch (error){ 
        console.log(error.message);
    }
});
