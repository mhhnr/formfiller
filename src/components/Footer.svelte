<footer>
  <div class="footer-content">
    <div class="footer-links">
      <a href="/" aria-label="Home">Home</a>
      <a href="/about" aria-label="About">About</a>
      <a href="/privacy" aria-label="Privacy Policy">Privacy</a>
      <a href="/terms" aria-label="Terms of Service">Terms</a>
    </div>
    <div class="footer-social">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <span class="material-icons-round">code</span>
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <span class="material-icons-round">alternate_email</span>
      </a>
    </div>
    <p class="copyright">© {new Date().getFullYear()} AI Form Filler. All rights reserved.</p>
  </div>
</footer>

<style>
  footer {
    background: #ffffff;
    padding: 2rem 1rem;
    margin-top: auto;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  .footer-links {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-links a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;
  }

  .footer-links a:hover {
    color: #000;
  }

  .footer-social {
    display: flex;
    gap: 1rem;
  }

  .footer-social a {
    color: #666;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .footer-social a:hover {
    color: #000;
    transform: translateY(-2px);
  }

  .copyright {
    color: #999;
    font-size: 0.8rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    footer {
      padding: 1.5rem 1rem;
    }

    .footer-links {
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .footer-links {
      gap: 1rem;
      font-size: 0.8rem;
    }
  }
</style> 