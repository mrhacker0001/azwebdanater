import axios from 'axios';
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; // ToastContainer komponentini import qilamiz
import "./style.css"


export function FreeFire() {
  const data = [
    { id: 1, miqdor: 100, bonus: 80, narx: 15000 },
    { id: 2, miqdor: 310, bonus: 250, narx: 45000 },
    { id: 3, miqdor: 416, bonus: 520, narx: 70000 },
    { id: 4, miqdor: 1060, bonus: 848, narx: 125000 },
    { id: 5, miqdor: 2180, bonus: 1853, narx: 240000 },
    { id: 6, miqdor: 5600, bonus: 4760, narx: 580000 },
  ];

  

  const addToCart = (id) => {
    // Bizga kerakli elementni topish
    const selectedItem = data.find(item => item.id === id);

    // Local Storage'da saqlash
    const cartItems = JSON.parse(localStorage.getItem('almaz')) || [];
    cartItems.push(selectedItem);
    localStorage.setItem('almaz', JSON.stringify(cartItems));
  };


  const [formdata, setFormdata] = useState({
    ism: '',
    tel: '',
    id: '',
  });

  const handlechange = (e) => {
    const { name, value, files } = e.target; // Faylni o'qiymiz
    if (name === 'rasm') { // Agar fayl nomi 'rasm' bo'lsa
      setFormdata({
        ...formdata,
        [name]: files[0], // Faylni formdata'ga qo'shamiz
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formdata.ism.trim() === '' ||
      formdata.tel.trim() === '' ||
      formdata.id.trim() === ''
    ) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");

      return;
    }

    try {
      const token = '6857985324:AAG1j834I1SM_jZTLRuHXmDqeKgKkaZWD-8';
      const chatId = '@registration008';
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: `Free Fire \nIsmi: ${formdata.ism}\nTelefon raqam: ${formdata.tel}\nID si: ${formdata.id}\nmiqdori: ${formdata.miqdor}\nnarxi: ${formdata.narx}`,
      });

      setFormdata({
        ism: '',
        tel: '',
        id: '',
      });
    
  toast.success("Ma'lumotlar muvaffaqiyatli yuborildi!");
  } catch (error) {
    console.error("xatolik yuz berdi:", error);
    toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi");
  }
  };

  const handleSubmitPhoto = async (e) => {
    if (e) e.preventDefault(); // e mavjudligini tekshiramiz
  
    try {
      const token = '6857985324:AAG1j834I1SM_jZTLRuHXmDqeKgKkaZWD-8';
      const chatId = '@registration008';
  
      const formData = new FormData();
      formData.append('photo', formdata.rasm); // Rasmni FormData ga qo'shamiz
  
      await axios.post(`https://api.telegram.org/bot${token}/sendPhoto?chat_id=${chatId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Bu rasmni yuborish uchun kerak bo'lgan header
        }
      });
    
      setFormdata({
        ...formdata,
        rasm:'',
      })
    } catch (error) {

    }
  }

  const handleCloseClick = () => {
    setFormdata({
      ism: '',
      tel: '',
      id: '',
    });
    document.querySelector('.freee-cart').style.zIndex = -1;
  };
  return (<>   <ToastContainer/>
    <div className='FreeFire'>
    <table border={1}>
      <thead>
          <tr>
          <th>Murojaat uchun:   Telefon raqam: +998 93 217 08 15  </th>
          <th>Murojaat uchun:   Telegram orqali: @azwebdanater  </th>
          </tr>
      </thead>
      </table>
      
      <table border={1}>
        <thead>
          <tr>
            <th>ALMAZ miqdori</th>
            <th>Bonus</th>
            <th>ALMAZ narxi</th>
            <th>Bonuslar faqat birinchi marta beriladi!</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item => (
              <tr key={item.id}>
                <td>{item.miqdor}</td>
                <td>{item.bonus}</td>
                <td>{item.narx}</td>
                <td>
                  <button onClick={() => { document.querySelector('.freee-cart').style.zIndex = 1; addToCart(item.id); setFormdata({ ...formdata, miqdor: item.miqdor, narx: item.narx }) }}>Buyurtma berish</button>
                </td>
              </tr>
            ))
          }
        </tbody>
        
        
      </table >
      




      <div className="freee-cart">
        <form onSubmit={handleSubmit}>
          <h1>Free Fire</h1>
          <label>
            <input
              type="text"
              name="ism"
              placeholder="Ismingizni kiriting"
              value={formdata.ism}
              onChange={handlechange}
            />
          </label>
          <label>
            <input
              type="number"
              name="tel"
              placeholder="Raqamingizni kiriting"
              value={formdata.tel}
              onChange={handlechange}
            />
          </label>
          <label>
            <input
              type="number"
              name="id"
              placeholder="ID kiriting"
              value={formdata.id}
              onChange={handlechange}
            />
          
          </label>
          <div className="karta">
            <span>Miqdori: {formdata.miqdor} almaz</span>
            <span>Narx: {formdata.narx} UZS</span>
            <span>Karta raqam: 9860 0801 8648 5357</span>
          </div>
          <span>Iltimos!!! To'lov chekini kiriting   </span>
          <label>
  <input
    type="file"
    name="rasm"
    onChange={(e) => setFormdata({ ...formdata, rasm: e.target.files[0] })} // Rasmni o'qib olamiz
  />
</label>
          
          <button type="submit" onClick={() => {document.querySelector('.freee-cart').style.zIndex = -1; handleSubmitPhoto()}}>Yuborish</button>
          <button type='button' onClick={handleCloseClick}>Yopish</button>
        </form>
      </div>
    </div>
    </>
 
  )
}
