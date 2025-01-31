<script>
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  
  let isScrolled = false;
  let isMobileMenuOpen = false;

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 10;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMenu() {
    isMobileMenuOpen = false;
  }
</script>

<header class:scrolled={isScrolled}>
  <div class="header-content">
    <div class="header-left">
      <div class="brand">
        <div class="logo">
          <span class="material-icons-round">smart_toy</span>
        </div>
        <div class="brand-text">
          <h1>AI Form Filler</h1>
          <p class="subtitle">Voice-to-Text</p>
        </div>
      </div>
    </div>

    <nav class="desktop-nav">
      <a href="/" class="active">Transcribe</a>
      <a href="/templates">Templates</a>
      <a href="/history">History</a>
      <a href="/settings">Settings</a>
    </nav>

    <div class="header-right">
      <button class="theme-toggle" aria-label="Toggle theme">
        <span class="material-icons-round">dark_mode</span>
      </button>
      <button class="sign-in-button">
        <span class="material-icons-round">person_outline</span>
        <span class="button-text">Sign In</span>
      </button>
    </div>

    <button 
      class="mobile-menu-button" 
      on:click={toggleMobileMenu} 
      aria-label="Toggle menu"
      class:active={isMobileMenuOpen}
    >
      <span class="material-icons-round">{isMobileMenuOpen ? 'close' : 'menu'}</span>
    </button>
  </div>

  {#if isMobileMenuOpen}
    <div class="mobile-menu" transition:slide={{duration: 200}} on:click={closeMenu}>
      <nav>
        <a href="/" class="active">Transcribe</a>
        <a href="/templates">Templates</a>
        <a href="/history">History</a>
        <a href="/settings">Settings</a>
      </nav>
    </div>
  {/if}
</header>

<style>
  header {
    background: rgba(255, 255, 255, 0.95);
    padding: 0.75rem 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: all 0.3s ease;
  }

  header.scrolled {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
  }

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    background: linear-gradient(135deg, #000000, #333333);
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .logo .material-icons-round {
    font-size: 24px;
    color: white;
  }

  .brand-text {
    text-align: left;
  }

  h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #000000, #333333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    font-size: 0.75rem;
    color: #666;
    margin: 0;
  }

  .desktop-nav {
    display: flex;
    gap: 2rem;
  }

  .desktop-nav a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.5rem 0;
    position: relative;
  }

  .desktop-nav a:hover,
  .desktop-nav a.active {
    color: #000;
  }

  .desktop-nav a.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: #000;
    border-radius: 2px;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .theme-toggle {
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle:hover {
    color: #000;
    transform: rotate(15deg);
  }

  .sign-in-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #000;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    height: 36px;
  }

  .sign-in-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .sign-in-button .material-icons-round {
    font-size: 20px;
  }

  .mobile-menu-button {
    display: none;
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #666;
    transition: all 0.3s ease;
  }

  .mobile-menu-button.active {
    color: #000;
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .mobile-menu nav {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }

  .mobile-menu a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .mobile-menu a:hover,
  .mobile-menu a.active {
    background: #f5f5f5;
    color: #000;
  }

  @media (max-width: 968px) {
    .desktop-nav {
      display: none;
    }

    .mobile-menu-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-right {
      gap: 0.5rem;
    }
  }

  @media (max-width: 640px) {
    header {
      padding: 0.5rem 0.75rem;
    }

    .header-content {
      gap: 0.5rem;
    }

    .logo {
      width: 36px;
      height: 36px;
    }

    .logo .material-icons-round {
      font-size: 20px;
    }

    .brand-text h1 {
      font-size: 1rem;
    }

    .subtitle {
      display: none;
    }

    .theme-toggle {
      padding: 0.4rem;
    }

    .sign-in-button {
      padding: 0.4rem;
      height: 32px;
      width: 32px;
      border-radius: 16px;
    }

    .sign-in-button .button-text {
      display: none;
    }

    .sign-in-button .material-icons-round {
      font-size: 18px;
    }

    .mobile-menu-button {
      padding: 0.4rem;
    }

    .mobile-menu-button .material-icons-round {
      font-size: 20px;
    }
  }

  @media (max-width: 380px) {
    .brand-text h1 {
      font-size: 0.9rem;
    }

    .header-right {
      gap: 0.35rem;
    }
  }
</style> 
