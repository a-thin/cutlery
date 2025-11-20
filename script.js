// --- Basic interactions ---
const gallery = document.getElementById('gallery')
const modal = document.getElementById('modal')
const modalImg = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const close = document.getElementById('close-modal')
const close2 = document.getElementById('close-2')

if (gallery) {
  gallery.addEventListener('click', (e) => {
    const p = e.target.closest('.product')
    if (!p) return
    // gather info
    const titleEl = p.querySelector('h3')
    const descEl = p.querySelector('p')
    const imgEl = p.querySelector('img')
    const title = titleEl ? titleEl.innerText : ''
    const desc = descEl ? descEl.innerText : ''
    const src = imgEl ? imgEl.src : ''
    if (modalImg) modalImg.src = src
    if (modalTitle) modalTitle.innerText = title
    if (modalDesc) modalDesc.innerText = desc
    if (modal) {
      modal.style.display = 'flex'
      modal.classList.add('open')
      // move focus into dialog for a11y
      const focusTarget = modal.querySelector('#close-2') || modal
      focusTarget && focusTarget.focus && focusTarget.focus()
    }
  })

  // make product cards keyboard-accessible and show pointer
  document.querySelectorAll('.product').forEach(p => {
    if (!p.hasAttribute('tabindex')) p.setAttribute('tabindex', '0')
    p.style.cursor = 'pointer'
    p.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        // trigger click which is handled above
        p.click()
        e.preventDefault()
      }
    })
  })
}

function closeModal() {
  if (!modal) return
  modal.style.display = 'none'
  modal.classList.remove('open')
}

if (close) close.addEventListener('click', closeModal)
if (close2) close2.addEventListener('click', closeModal)
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal() })

const viewGalleryBtn = document.getElementById('view-gallery')
if (viewGalleryBtn) viewGalleryBtn.addEventListener('click', () => { document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' }) })

const editTips = document.getElementById('edit-tips')
if (editTips) {
  editTips.addEventListener('click', () => {
    alert('編集のヒント:\n\n1) ギャラリー内のdata:image部分をあなたの3DCGレンダリング画像のURLに置き換えてください。\n2) ヒーローのSVGはimgタグに差し替えると質感を出せます。\n3) モバイルのUIはmodal表示で調整してください。')
  })
}

// keyboard ESC to close
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal() })

// Small parallax/tilt effect for hero card (guarded)
const heroCard = document.getElementById('hero-card')
if (heroCard) {
  heroCard.addEventListener('mousemove', (ev) => {
    const r = heroCard.getBoundingClientRect()
    const x = ev.clientX - r.left
    const y = ev.clientY - r.top
    const cx = r.width / 2, cy = r.height / 2
    const dx = (x - cx) / cx
    const dy = (y - cy) / cy
    heroCard.style.transform = `rotateX(${dy * 6}deg) rotateY(${dx * 8}deg) translateZ(0)`
  })
  heroCard.addEventListener('mouseleave', () => { heroCard.style.transform = '' })
}
