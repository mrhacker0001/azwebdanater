import React from 'react'
import { NavLink } from 'react-router-dom'
import azweb from './asets/Screenshot 2024-03-07 at 21.47.46.png'
import "./style.css"

export function Sitebar() {
    return (
        <div className='Sitebar'>
            <div class="loader">
                <span>A</span>
                <span>Z</span>
                <span>W</span>
                <span>E</span>
                <span>B</span>
            </div>
            <div className="btns">
                <div className="all">

                    <button>
                        <NavLink to='/Pubg'>Pubg</NavLink>
                    </button>
                    <button>
                        <NavLink to='/FreeFire'>Free Fire</NavLink>
                    </button>
                    <button>
                        <NavLink to='/Telegram'>Telegram</NavLink>
                    </button>
                    <button>
                        <NavLink to='/Instagram'>Instagram</NavLink>
                    </button>

                </div>
            </div>
                <img src={azweb} alt="" />
              


        </div>
    )
}
