document.addEventListener('DOMContentLoaded', () => {
  const posts = [
    {
      id: 1,
      title: "Cómo optimizar tus impuestos en 2025",
      date: "2025-05-01",
      img: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
      ],
      content: `
        <p>Optimizar impuestos es esencial para cualquier persona o empresa que busque maximizar sus ganancias y cumplir con la ley. En este artículo, te presentamos estrategias legales para reducir tu carga tributaria.</p>
        <h2>Planificación fiscal</h2>
        <p>La planificación adecuada permite anticipar gastos y deducciones, lo que puede disminuir el impuesto a pagar.</p>
        <h3>Deducciones permitidas</h3>
        <ul>
          <li>Gastos médicos</li>
          <li>Inversiones en proyectos culturales</li>
          <li>Donaciones a organizaciones autorizadas</li>
        </ul>
        <p>Recuerda siempre documentar correctamente estos gastos.</p>
        <h2>Uso de beneficios fiscales</h2>
        <p>Conoce las exenciones y beneficios a los que puedes acceder para tu tipo de negocio o situación personal.</p>
      `
    },
    {
      id: 2,
      title: "La importancia de la contabilidad digital",
      date: "2025-04-20",
      img: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=400&q=80"
      ],
      content: `
        <p>La contabilidad digital ha revolucionado la forma en que se gestionan las finanzas de las empresas, proporcionando mayor precisión y eficiencia.</p>
        <h2>Ventajas principales</h2>
        <ul>
          <li>Acceso remoto a los datos financieros</li>
          <li>Automatización de procesos contables</li>
          <li>Mejora en la toma de decisiones</li>
        </ul>
        <p>Implementar herramientas digitales es fundamental para mantenerse competitivo.</p>
      `
    },
    {
      id: 3,
      title: "Consejos para preparar tu declaración de renta",
      date: "2025-04-10",
      img: "https://images.unsplash.com/photo-1523475496153-3aef58d79b0c?auto=format&fit=crop&w=800&q=80",
      gallery: [],
      content: `
        <p>Preparar la declaración de renta puede ser un proceso complicado. Aquí te damos algunos consejos para hacerlo correctamente y evitar sanciones.</p>
        <h2>Documentación necesaria</h2>
        <ul>
          <li>Certificados de ingresos</li>
          <li>Comprobantes de deducciones</li>
          <li>Estados financieros</li>
        </ul>
        <h2>Errores comunes</h2>
        <p>Evita errores como declarar ingresos incorrectos o no aprovechar las deducciones legales.</p>
      `
    }
  ];

  const postContainer = document.getElementById('post-container');

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('es-ES', options);
  };

  const idParam = getQueryParam('id');
  const postId = parseInt(idParam, 10);

  if (!idParam || isNaN(postId)) {
    window.location.href = 'blog.html';
    return;
  }

  const post = posts.find(p => p.id === postId);

  if (!post) {
    postContainer.innerHTML = `<p>Artículo no encontrado. <a href="blog.html">Volver al blog</a></p>`;
    return;
  }

  postContainer.innerHTML = `
    <img src="${post.img}" alt="Imagen principal" class="post-img" loading="lazy" />
    <h2 class="post-title">${post.title}</h2>
    <time class="post-date" datetime="${post.date}">${formatDate(post.date)}</time>
    <article class="post-content">${post.content}</article>
    ${post.gallery && post.gallery.length > 0 ? `
      <section aria-label="Galería de imágenes adicionales" class="post-gallery">
        ${post.gallery.map((img, i) => `
          <img src="${img}" alt="Imagen adicional ${i + 1}" class="gallery-img" tabindex="0" />
        `).join('')}
      </section>
    ` : ''}
  `;

  const modalOverlay = document.getElementById('modalOverlay');
  const modalImage = document.getElementById('modalImage');

  const openModal = (src, alt) => {
    modalImage.src = src;
    modalImage.alt = alt;
    modalOverlay.classList.add('active');
    modalOverlay.focus();
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    modalImage.src = '';
    modalImage.alt = '';
  };

  document.querySelectorAll('.gallery-img').forEach(img => {
    img.addEventListener('click', () => openModal(img.src, img.alt));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(img.src, img.alt);
      }
    });
  });

  modalOverlay.addEventListener('click', closeModal);
  modalOverlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
