import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; // ToastContainer komponentini import qilamiz
import "./style.css"

export function Pubg() {

  const data = [
    { id: 16, miqdor: 66, narx: 13000 },
    { id: 17, miqdor: 132, narx: 25000 },
    { id: 18, miqdor: 198, narx: 36000 },
    { id: 19, miqdor: 264, narx: 50000 },
    { id: 20, miqdor: 355, narx: 60000 },
    { id: 21, miqdor: 487, narx: 82000 },
    { id: 22, miqdor: 720, narx: 112000 },
    { id: 23, miqdor: 918, narx: 145000 },
    { id: 24, miqdor: 1075, narx: 172000 },
    { id: 25, miqdor: 1273, narx: 202000 },
    { id: 26, miqdor: 1430, narx: 225000 },
    { id: 27, miqdor: 1950, narx: 282000 },
    { id: 28, miqdor: 2305, narx: 333000 },
    { id: 29, miqdor: 2670, narx: 387000 },
    { id: 30, miqdor: 3025, narx: 442000 },

    { id: 31, miqdor: 3380, narx: 500000 },
    { id: 32, miqdor: 4000, narx: 560000 },
    { id: 33, miqdor: 4355, narx: 617000 },
    { id: 34, miqdor: 4720, narx: 670000 },
    { id: 35, miqdor: 5075, narx: 723000 },
    { id: 36, miqdor: 5440, narx: 772000 },
    { id: 37, miqdor: 5950, narx: 830000 },
    { id: 38, miqdor: 6305, narx: 885000 },
    { id: 39, miqdor: 6670, narx: 940000 },
    { id: 40, miqdor: 7025, narx: 993000 },
    { id: 41, miqdor: 8100, narx: 1075000 },
    { id: 42, miqdor: 8400, narx: 1100000 },
    { id: 43, miqdor: 16800, narx: 2170000 },
    { id: 44, miqdor: 25200, narx: 3255000 },
    { id: 45, miqdor: 33600, narx: 4333000 },
    { id: 46, miqdor: 42000, narx: 5405000 },
  ];

  const addToCart = (id) => {
    const selectedItem = data.find(item => item.id === id);
    const cartItems = JSON.parse(localStorage.getItem('uc')) || [];
    cartItems.push(selectedItem);
    localStorage.setItem('uc', JSON.stringify(cartItems));
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
        text: `Pubg \nIsmi: ${formdata.ism}\nTelefon raqam: ${formdata.tel}\nID si: ${formdata.id}\nmiqdori: ${formdata.miqdor}\nnarxi: ${formdata.narx}`,
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
        rasm: '',
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
    document.querySelector('.pubgg-cart').style.zIndex = -1;
  };

  return (
    <>
      <ToastContainer />
      <div className='Pubg'>
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
              <th>UC miqdori</th>
              <th>UC narxi</th>
              <th>UZDANATER.uz</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.miqdor}</td>
                <td>{item.narx}</td>
                <td>
                  <button onClick={() => { document.querySelector('.pubgg-cart').style.zIndex = 1; addToCart(item.id); setFormdata({ ...formdata, miqdor: item.miqdor, narx: item.narx }) }}>Buyurtma berish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>



        <div className="pubgg-cart">
          <form onSubmit={handleSubmit}>
            <h1>Pubg</h1>
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
              <span>Miqdori: {formdata.miqdor} uc</span>
              <span>Narxi: {formdata.narx} UZS</span>
              <span>Karta raqam: 9860 0801 8648 5357</span>

            </div>
            <span>To'lov chekini kiriting  </span>
            <label>
              <input
                type="file"
                name="rasm"
                onChange={(e) => setFormdata({ ...formdata, rasm: e.target.files[0] })} // Rasmni o'qib olamiz
              />
            </label>

            <button type="submit" onClick={() => { document.querySelector('.pubgg-cart').style.zIndex = -1; handleSubmitPhoto() }}>Yuborish</button>
            <button type='button' onClick={handleCloseClick}>Yopish</button>
          </form>
        </div>

      </div>
    </>
  )
};
