/**
 * React Component: DrawerMenu
 */

window.DrawerMenu = function DrawerMenu({ isOpen, onClose, activeScreen, onSelectScreen }) {
  return (
    <div className={`hamburger-overlay ${isOpen ? 'active' : ''}`} onClick={(e) => {
      if (e.target.classList.contains('hamburger-overlay')) onClose();
    }}>
      <div className="hamburger-drawer">
        <div className="drawer-header">
          <div className="drawer-title">Forex & Gold Signals</div>
          <button className="icon-btn" onClick={onClose}>
            <i data-lucide="x" style={{ width: '18px', height: '18px' }}></i>
          </button>
        </div>

        <div className="drawer-nav">
          <a
            href="#"
            className={`drawer-menu-item ${activeScreen === 'signal-detail' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onSelectScreen('signal-detail'); onClose(); }}
          >
            <i data-lucide="activity" style={{ width: '18px', height: '18px' }}></i>
            <span>Gold Technical Signal</span>
          </a>

          <a
            href="#"
            className={`drawer-menu-item ${activeScreen === 'performance' ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onSelectScreen('performance'); onClose(); }}
          >
            <i data-lucide="award" style={{ width: '18px', height: '18px' }}></i>
            <span>Signal Performance</span>
          </a>
        </div>
      </div>
    </div>
  );
};
