document.addEventListener("DOMContentLoaded", () => {
  console.log("Portafolio cargado correctamente");

  // Solo seleccionamos los enlaces que sean de ancla interna (#id)
  const menuLinks = document.querySelectorAll('.navbar__menu a[href^="#"]');
  const sections = document.querySelectorAll("section[id]");
  const revealElements = document.querySelectorAll(".reveal");

  // === Scroll suave para enlaces con #id ===
  menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // === Función para actualizar el enlace activo según scroll ===
  const updateActiveLink = () => {
    let currentSectionId = "";
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120; // Ajuste por navbar sticky
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.id;
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);

  // === Animación Reveal con IntersectionObserver ===
  const observerOptions = {
    threshold: 0.25
  };

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
});
