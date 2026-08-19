import React from 'react';
import Logo from '../Logo';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const { theme, toggleTheme, setAuthView, toast } = useApp();

  return (
    <nav className="pubnav">
      <div className="pubnav-in">
        <Logo />
        <div className="pubnav-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="pubnav-r">
          <button className="theme-toggle" onClick={toggleTheme}>{theme === 'light' ? '☀️' : '🌙'}</button>
          <button className="btn btn-outline btn-sm" onClick={() => setAuthView('login')}>Log in</button>
          <button className="btn btn-grad btn-sm" onClick={() => setAuthView('register')}>Start free scan</button>
          <button className="nav-burger" onClick={() => toast('Menu — use the links above on desktop')}>☰</button>
        </div>
      </div>
    </nav>
  );
}
