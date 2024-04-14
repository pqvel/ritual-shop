import React, { FC } from "react";

/**
 * 
  display: block;
  width: 33px;
  height: 4px;
  margin-bottom: 5px;
  position: relative;

  background: #cdcdcd;
  border-radius: 3px;

  z-index: 1;

  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
 */

const BurgerMenu: FC = () => {
  return (
    <>
      <nav className="hidden absolute top-2  right-2" role="navigation">
        <div className="block relative " id="menuToggle">
          <input className=" w-8 h-8" type="checkbox" />

          <span className="block w-8 h-1 mb-1.5 rounded-sm bg-slate-950 z-10 animate-burger-menu-lines"></span>
          <span className="block w-8 h-1 mb-1.5 rounded-sm bg-slate-950 z-10 animate-burger-menu-lines"></span>
          <span className="block w-8 h-1 mb-1.5 rounded-sm bg-slate-950 z-10 animate-burger-menu-lines"></span>

          <ul id="menu">
            <a href="#">
              <li>Home</li>
            </a>
            <a href="#">
              <li>About</li>
            </a>
            <a href="#">
              <li>Info</li>
            </a>
            <a href="#">
              <li>Contact</li>
            </a>
            <a href="https://erikterwan.com/" target="_blank">
              <li>Show me more</li>
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default BurgerMenu;
