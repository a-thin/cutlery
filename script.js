    // --- Basic interactions ---
    const gallery = document.getElementById('gallery')
    const modal = document.getElementById('modal')
    const modalImg = document.getElementById('modal-img')
    const modalTitle = document.getElementById('modal-title')
    const modalDesc = document.getElementById('modal-desc')
    const close = document.getElementById('close-modal')
    const close2 = document.getElementById('close-2')

    gallery.addEventListener('click', (e)=>{
      const p = e.target.closest('.product')
      if(!p) return
      const id = p.dataset.id
      // gather info
      const title = p.querySelector('h3').innerText
      const desc = p.querySelector('p').innerText
      const src = p.querySelector('img').src
      modalImg.src = src
      modalTitle.innerText = title
      modalDesc.innerText = desc
      modal.classList.add('open')
    })

    function closeModal(){ modal.classList.remove('open') }
    close.addEventListener('click', closeModal)
    close2.addEventListener('click', closeModal)
    modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal() })

    document.getElementById('view-gallery').addEventListener('click', ()=>{ document.getElementById('gallery').scrollIntoView({behavior:'smooth'}) })
    document.getElementById('edit-tips').addEventListener('click', ()=>{
      alert('編集のヒント:\n\n1) ギャラリー内のdata:image部分をあなたの3DCGレンダリング画像のURLに置き換えてください。\n2) ヒーローのSVGはimgタグに差し替えると質感を出せます。\n3) モバイルのUIはmodal表示で調整してください。')
    })

    // keyboard ESC to close
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') closeModal() })

    // Small parallax/tilt effect for hero card
    const heroCard = document.getElementById('hero-card')
    heroCard.addEventListener('mousemove', (ev)=>{
      const r = heroCard.getBoundingClientRect()
      const x = ev.clientX - r.left
      const y = ev.clientY - r.top
      const cx = r.width/2, cy = r.height/2
      const dx = (x - cx) / cx
      const dy = (y - cy) / cy
      heroCard.style.transform = `rotateX(${dy*6}deg) rotateY(${dx*8}deg) translateZ(0)`
    })
    heroCard.addEventListener('mouseleave', ()=>{ heroCard.style.transform = '' })
