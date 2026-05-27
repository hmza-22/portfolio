const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (!targetId.startsWith('#') || targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const projectCard = document.querySelector('.project-card');

  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (projectCard) {
    projectCard.addEventListener('click', event => {
      if (event.target.closest('a')) return;
      openModal();
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', event => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

// Roadmap animation
   const heroChart = document.getElementById('heroChart');
   if (heroChart) {
     const path = heroChart.querySelector('.roadmap-path');
     const nodes = Array.from(heroChart.querySelectorAll('.roadmap-node'));
     let animationInProgress = false;

     function resetRoadmap() {
       if (!path) return;
       const length = path.getTotalLength();
       path.style.strokeDasharray = length;
       path.style.strokeDashoffset = length;
       nodes.forEach(node => {
         node.classList.remove('active');
       });
       animationInProgress = false;
     }

     function playRoadmap() {
       if (!path || animationInProgress) return;
       animationInProgress = true;
       const length = path.getTotalLength();
       path.style.strokeDasharray = length;
       path.style.strokeDashoffset = length;
       requestAnimationFrame(() => {
         path.style.transition = 'stroke-dashoffset 1.5s ease';
         path.style.strokeDashoffset = '0';
       });
       nodes.forEach((node, index) => {
         setTimeout(() => {
           node.classList.add('active');
         }, 1500 + index * 200);
       });
     }

     const roadmapObserver = new IntersectionObserver(entries => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           playRoadmap();
         } else {
           resetRoadmap();
         }
       });
     }, { threshold: 0.35 });

     roadmapObserver.observe(heroChart);
  }
});
