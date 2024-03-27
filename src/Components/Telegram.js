import axios from 'axios';
import React, {useState} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'; // ToastContainer komponentini import qilamiz

export  function Telegram() {

  const data = [
    { id: 43, miqdor: 1000, tarif:"TG obunachi mix", narx: 14000 },
    { id:44, miqdor: 1000, tarif:"Bezminus", narx: 19000 },
    { id: 45, miqdor: 1000, tarif:"Bezminus(90kun kafolat)", narx: 19000 },
    { id: 46, miqdor: 1000, tarif:"100% erkaklar", narx: 19000 },
    { id: 47, miqdor: 1000, tarif:"100% ayollar", narx: 19000 },
    { id: 48, miqdor: 1000, tarif:"Arabiston obunachilar", narx: 23000 },
    { id: 49, miqdor: 1000, tarif:"Hindiston obunachilar", narx: 23000 },
    { id: 50, miqdor: 1000, tarif:"O'zbek obunachilar", narx: 53000 },
    { id: 51, miqdor: 1000, tarif:"100% o'zbek obunachilar", narx: 53000 },
    { id: 52, miqdor: 1000, tarif:"TG guruhdan guruhga o'zbek obunachilar", narx: 89000 },
    { id: 53, miqdor: 1000, tarif:"TG guruh uchun o'zbek obunachi(erkaklar)", narx: 89000 },
    { id: 54, miqdor: 1000, tarif:"TG guruh uchun o'zbek obunachi(ayollar)", narx: 89000 },
  ]

  const addToCart = (id) => {
    // Bizga kerakli elementni topish
    const selectedItem = data.find(item => item.id === id);

    // Local Storage'da saqlash
    const cartItems = JSON.parse(localStorage.getItem('telegram')) || [];
    cartItems.push(selectedItem);
    localStorage.setItem('telegram', JSON.stringify(cartItems));
  };






  const [formdata, setFormdata] = useState({
    ism: '',
    tel: '',
    link: '',
    miqdor: '',
    tarif: '',
    rasm:''
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
        text: `Telegram \nIsmi: ${formdata.ism}\nTelefon raqam: ${formdata.tel}\n linki: ${formdata.link}\nmiqdori: ${formdata.miqdor}\nnarxi: ${umumiynarx}\nta'rif:${formdata.tarif}`, // Umumiy narxni quyidagi shaklda qo'shing
      });
    
      setFormdata({
        ism: '',
        tel: '',
        link: '',
        miqdor: '',
        narx: '', // Resetting narx as well
        tarif: '',
        rasm:'',
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
      link: '',
      rasm:''
    });
    document.querySelector('.telegramm-cart').style.zIndex = -1;
  };
  let umumiynarx = formdata.narx / 1000 * formdata.miqdor
  return (
  <>
<ToastContainer/>
      <div className='Telegram'>
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
            <th>Obunachi ta'rifi</th>
            <th>Obunachi narxi</th>
            <th>UZDANATER.uz</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(item=>(
              <tr key={item.id}>
                <td>{item.miqdor}</td>
                <td>{item.tarif}</td>
                <td>{item.narx}</td>
                <td>
                <button  onClick={() => {document.querySelector('.telegramm-cart').style.zIndex = 1; addToCart(item.id); setFormdata({...formdata, miqdor: item.miqdor, narx: item.narx, tarif:item.tarif})}}>Buyurtma berish</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      



      <div className="telegramm-cart">
        <form onSubmit={handleSubmit}>
          <h1>Telegram</h1>
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
          {/* <label>
          <input
              type="text"
              name="tarif"
              placeholder='tarif'
              value={formdata.tarif}
              onChange={handlechange}
            />
          </label> */}
          <label>
          <input
              type="number"
              name="miqdor"
              placeholder="Miqdor kiriting"
              value={formdata.miqdor}
              onChange={handlechange}
            />
          </label>
          <span>To'lov chekini kiriting  </span>
          <label>
  <input
    type="file"
    name="rasm"
    onChange={(e) => setFormdata({ ...formdata, rasm: e.target.files[0] })} // Rasmni o'qib olamiz
  />
</label>

          
          <div className="karta">
          <span>Narxi: {umumiynarx}</span>
          <span>Ta'rif: {formdata.tarif}</span>
          <span>To'lov uchun karta: 9860 0801 8648 5357</span>
          
          </div>
          <button type="submit" onClick={() => {document.querySelector('.telegramm-cart').style.zIndex = -1; handleSubmitPhoto()}}>Yuborish</button>
          <button type='button' onClick={handleCloseClick}>Yopish</button>
        </form>

        
      </div>
      


    </div>
    </>

  )
}
