/* ============================================ */
/* ROCKYBCO — PORTFOLIO JS                      */
/* ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  /* ===== FILTERING ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || cats.includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });
  /* ===== CASE STUDY DATA ===== */
  const caseData = {
    'Ceeravo': {
      category: 'brand-identity',
      label: 'Smart Medical Routing Platform',
      swatches: ['#041940', '#FA5C08'],
      typo: 'Avenir Bold + Inter',
      story: 'Ceeravo is a smart routing and matching platform startup built to synchronize Nigeria hospital network. It tracks facility capacity, specialist availability, and live operational status across clinics and hospitals. The brand needed to be impossible to forget and easy to navigate when a user is in full panic. Too subtle and it disappears under pressure. Too complex and it slows down a paramedic trying to find a route in ten seconds. I replaced passive medical symbols with an expanding C, a radar grid, and a location pin to create a sharp, memorable visual beacon that signals real-time routing. Deep Navy carries trust. Vibrant Orange is reserved strictly for emergency CTAs and live pins, giving panicked eyes an instant visual target. Avenir Bold and Inter strip out all non-essential clutter so users can scan critical data like bed counts and queue times and act immediately.',
      images: ['assets/projects/ceeravo/ceeravo-mockup-1.png', 'assets/projects/ceeravo/ceeravo-mockup-2.png'],
      logo: 'assets/projects/ceeravo/ceeravo-logo.png',
      pdf: 'assets/pdf/ceeravo-brand-identity.pdf'
    },
    'Echoes of Campus': {
      category: 'brand-identity',
      label: 'Student Media Platform',
      swatches: ['#0B1E38', '#8A939C', '#4A5568', '#6B7280'],
      typo: 'Futura Bold + Inter',
      story: 'Echoes of Campus is a student media startup built to amplify the voices, opinions, and experiences of Nigerian students. The brand needed to feel authoritative enough to command respect across universities while staying dynamic, youth-driven, and recognizable on Spotify, YouTube, and Instagram. I built the identity around one idea: every voice has a signal, and Echoes of Campus amplifies it. The logo combines structured vertical bars with a waveform, creating a visual connection between communication, sound, and storytelling. Midnight Navy gives it a mature, editorial feel while Soft and Muted Greys keep the system flexible and modern.',
      images: ['assets/projects/echoes-of-campus/echoes-of-campus-mockup-1.png', 'assets/projects/echoes-of-campus/echoes-of-campus-mockup-2.png'],
      logo: 'assets/projects/echoes-of-campus/echoes-of-campus-logo.png',
      pdf: 'assets/pdf/echoes-of-campus-brand-identity.pdf'
    },
    'Go Move': {
      category: 'brand-identity',
      label: 'Transport and Delivery Brand',
      swatches: ['#006B3F', '#FFCC00', '#F7F7F5'],
      typo: 'Montserrat + Inter',
      story: 'Go Move Logistics is an end-to-end transport and delivery brand offering intercity transit, last-mile dispatch, and digital booking services across Nigeria. The job was to rebrand an outdated identity whose visuals looked like flyers scraped off old commercial buses. I designed a sleek, forward-leaning monogram integrating the letter G with a highway track. Forest Green builds grounded trust, while high-energy Gold cuts through visual noise.',
      images: ['assets/projects/go-move/go-move-mockup-1.png', 'assets/projects/go-move/go-move-mockup-2.png'],
      logo: 'assets/projects/go-move/go-move-logo.png'
    },
    'Zuribites': {
      category: 'logo-concepts',
      label: 'Logo Design & Visual Identity',
      swatches: ['#FF6B6B', '#FFD166', '#06D6A0'],
      typo: 'Custom Brand Typography',
      story: 'A vibrant logo concept and visual identity crafted for Zuribites, capturing energy, appetizing aesthetics, and modern brand presence.',
      images: ['assets/projects/logo-concepts/zuribites/zuribites-thumbnail.png'],
      logo: 'assets/projects/logo-concepts/zuribites/zuribites-logo.png'
    },
    'Acceleration': {
      category: 'logo-concepts',
      label: 'Logo Concept & Identity',
      swatches: ['#1F3A3A', '#013E37', '#FFEFB3'],
      typo: 'JetBrains Mono + Manrope',
      story: 'Modern, high-velocity logo concept for Acceleration, symbolizing motion, precision, and tech-driven forward momentum.',
      images: ['assets/projects/logo-concepts/acceleration/acceleration-thumbnail.png'],
      logo: 'assets/projects/logo-concepts/acceleration/acceleration-logo.png'
    },
    'OyttO Culture': {
      category: 'logo-concepts',
      label: 'Brand Identity & Logo Concept',
      swatches: ['#2A2A2A', '#FFEFB3', '#013E37'],
      typo: 'Custom Serif + Sans',
      story: 'Cultural branding and logo mark design for OyttO Culture, blending heritage aesthetics with contemporary minimalist identity.',
      images: ['assets/projects/logo-concepts/oytto-culture/oytto-culture-thumbnail.png'],
      logo: 'assets/projects/logo-concepts/oytto-culture/oytto-culture-logo.png'
    },
    'Vogues by Dehem Website': {
      category: 'website',
      label: 'Luxury E-Commerce & Brand Showcase',
      swatches: ['#0A0A0A', '#8B4513', '#C9A227'],
      typo: 'Editorial Serif + Sans',
      story: 'E-commerce platform and digital showcase for Lagos luxury footwear brand Vogues by Dehem.',
      images: ['assets/projects/website/vogues-by-dehem/mockup-1.png', 'assets/projects/website/vogues-by-dehem/mockup-2.png'],
      liveUrl: 'https://funny-pavlova-17aaef.netlify.app'
    },
    'Ayokunmi': {
      category: 'website',
      label: 'SEO & Copywriting Digital Portfolio',
      swatches: ['#013E37', '#FFEFB3'],
      typo: 'Playfair Display + Manrope',
      story: 'Ayokunmi is an SEO copywriter and AI content strategist who needed both an online presence and a physical portfolio. I designed and built her digital portfolio alongside her offline collateral for maximum consistency.',
      images: ['assets/projects/website/ayokunmi/mockup-1.png', 'assets/projects/website/ayokunmi/mockup-2.png'],
      liveUrl: 'https://olotuayokunmi.netlify.app/'
    }
  };
  const videoData = {
    'Beekeeper': {
      category: 'web3',
      video: 'assets/web3/beekeeper.mp4',
      badge: '1st Place — Web3 Design Contest',
      story: 'In Web3, static visuals get scrolled past. While every other contestant filled the submissions channel with flat images, I saw a gap. Combining brand identity, AI generation, video editing, and narrative architecture, I built an animated brand case study that did not just show a logo mark. It defined the entire ecosystem of $BEEKEEPER. A Web3 token built on decentralized liquidity and community volume, using the hive as a metaphor for collective financial strength.'
    },
    'Denshi': {
      category: 'web3',
      video: 'assets/web3/denshi.mp4',
      badge: '1st Place — Web3 Design Contest',
      story: '$DENSHI is a Web3 token built on Solana, centered around program-derived addresses and keyless authority. Most submissions relied on static imagery that failed to communicate technical depth. I delivered a full-motion case study instead, built from printed circuit board trace nodes to symbolize pure code execution.'
    }
  };
  /* ===== CASE STUDY MODAL ===== */
  const caseModal = document.getElementById('caseModal');
  const caseBody = document.getElementById('caseBody');
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.card-name').textContent.trim();
      if (videoData[name]) {
        openVideoModal(name);
        return;
      }
      const data = caseData[name];
      if (!data) return;
      let visuals = '';
      if (data.images && data.images.length) {
        visuals += data.images.map(src => `<img src='${src}' alt='${name} mockup' width='800' height='500' loading='lazy' decoding='async' onerror='this.style.display="none"'>`).join('');
      }
      if (data.logo) {
        visuals += `<img src='${data.logo}' alt='${name} logo' width='400' height='400' loading='lazy' decoding='async' onerror='this.style.display="none"'>`;
      }
      if (!visuals) visuals = `<div class='img-placeholder'>${name} Visuals</div>`;
      let swatches = '';
      if (data.swatches && data.swatches.length) {
        swatches = `<div class='swatches'>${data.swatches.map(c => `<div class='swatch' style='background:${c}' title='${c}'></div>`).join('')}</div>`;
      }
      let typo = data.typo ? `<div class='typo'>Typography: ${data.typo}</div>` : '';
      let liveBtn = data.liveUrl ? `<div style='margin-top:20px;'><a href='${data.liveUrl}' class='btn btn-primary' target='_blank' rel='noopener'>View Live Website &rarr;</a></div>` : '';
      let pdfBtn = data.pdf ? `<div style='margin-top:12px;'><a href='${data.pdf}' class='btn btn-ghost' target='_blank' rel='noopener'>View Full Identity &rarr;</a></div>` : '';
      caseBody.innerHTML = `
        <div class='case-visuals'>
          ${visuals}
        </div>
        <div class='case-story'>
          <h2>${name}</h2>
          <span class='label'>${data.label}</span>
          ${swatches}
          ${typo}
          <p>${data.story}</p>
           ${liveBtn}
           ${pdfBtn}
        </div>
      `;
      caseModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  /* ===== VIDEO LIGHTBOX ===== */
  const videoModal = document.getElementById('videoModal');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const videoBadge = document.getElementById('videoBadge');
  const videoStory = document.getElementById('videoStory');

  function openVideoModal(name) {
    const data = videoData[name];
    if (!data) return;
    lightboxVideo.src = data.video;
    videoBadge.textContent = data.badge;
    videoStory.innerHTML = `<p>${data.story}</p>`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });
  [caseModal, videoModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', e => {
        if (e.target === modal) closeModals();
      });
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModals();
  });

  function closeModals() {
    if (caseModal) caseModal.classList.remove('active');
    if (videoModal) {
      videoModal.classList.remove('active');
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
      }
    }
    document.body.style.overflow = '';
  }
});