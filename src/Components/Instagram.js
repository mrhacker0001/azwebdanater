import React, { useState } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; // ToastContainer komponentini import qilamiz
import "./style.css"


export function Instagram() {

  const data = [
    { id: 7, miqdor: 1000, tarif: "Tezkor", narx: 10000 },
    { id: 8, miqdor: 1000, tarif: "Mix", narx: 10000 },
    { id: 9, miqdor: 1000, tarif: "Jonli odamlar", narx: 11000 },
    { id: 10, miqdor: 1000, tarif: "Bezminus", narx: 15000 },
    { id: 11, miqdor: 1000, tarif: "Ultra (1yil)", narx: 24000 },
    { id: 12, miqdor: 1000, tarif: "LIKE", narx: 3000 },
    { id: 13, miqdor: 1000, tarif: "Prosmotr", narx: 15000 },
    { id: 14, miqdor: 1000, tarif: "Story ko'rish", narx: 20000 },
    { id: 15, miqdor: 1000, tarif: "Jonli efir ko'rish", narx: 170000 },
  ]

  const addToCart = (id) => {
    // Bizga kerakli elementni topish
    const selectedItem = data.find(item => item.id === id);

    // Local Storage'da saqlash
    const cartItems = JSON.parse(localStorage.getItem('Instagram')) || [];
    cartItems.push(selectedItem);
    localStorage.setItem('Instagram', JSON.stringify(cartItems));
  };



  const [formdata, setFormdata] = useState({
    ism: '',
    tel: '',
    link: '',
    miqdor: '',
    tarif: ''

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
      formdata.link.trim() === '' ||
      formdata.miqdor === ''
    ) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    try {
      const token = '6857985324:AAG1j834I1SM_jZTLRuHXmDqeKgKkaZWD-8';
      const chatId = '@registration008';
      // Umumiy narxni hisoblash
      const umumiynarx = formdata.narx / 1000 * formdata.miqdor;
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: `Instagram \nIsmi: ${formdata.ism}\nTelefon raqam: ${formdata.tel}\n linki: ${formdata.link}\nmiqdori: ${formdata.miqdor}\nnarxi: ${umumiynarx}\nta'rif:${formdata.tarif}`, // Umumiy narxni quyidagi shaklda qo'shing
      });

      setFormdata({
        ism: '',
        tel: '',
        link: '',
        miqdor: '',
        narx: '', // Resetting narx as well
        tarif: ' '
      });
      toast.success("Ma'lumotlar muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("xatolik yuz berdi:", error);
      toast.error("Ma'lumotlarni yuborishda xatolik yuz berdi");
    }
  };



  const handleCloseClick = () => {
    setFormdata({
      ism: '',
      tel: '',
      link: '',
    });
    document.querySelector('.instagramm-cart').style.zIndex = -1;
  };

  let umumiynarx = formdata.narx / 1000 * formdata.miqdor



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
  return (
    <>    <ToastContainer />
      <div className='Instagram'>
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
              <th>Obunachi miqdori</th>
              <th>Obunachi narxi</th>
              <th>Obunachi ta'rifi</th>
              <th>UZDANATER.uz</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.miqdor}</td>
                <td>{item.narx}</td>
                <td>{item.tarif}</td>
                <td>
                  <button className='insta' onClick={() => { document.querySelector('.instagramm-cart').style.zIndex = 1; addToCart(item.id); setFormdata({ ...formdata, miqdor: item.miqdor, narx: item.narx, tarif: item.tarif }) }}>Buyurtma berish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>





        <div className="instagramm-cart">
          <form onSubmit={handleSubmit}>
            <h1>Instagram</h1>
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
                type="text"
                name="link"
                placeholder="link kiriting"
                value={formdata.link}
                onChange={handlechange}
              />
            </label>
            <label>
              <input
                type="text"
                name="miqdor"
                placeholder="Miqdor kiriting"
                value={formdata.miqdor}
                onChange={handlechange}
              />
            </label>
            <div className="karta">
              <span>Narxi: {umumiynarx} USD</span>
              <span>Ta'rif: {formdata.tarif}</span>
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

            <button type="submit" onClick={() => { document.querySelector('.instagramm-cart').style.zIndex = -1; handleSubmitPhoto() }}>Yuborish</button>
            <button type='button' onClick={handleCloseClick}>Yopish</button>
          </form>
        </div>

      </div>
    </>

  )
}
