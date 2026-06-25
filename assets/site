// /assets/site.js
document.addEventListener('click', (e) => {
    const q = e.target.closest('.faq-q');
    if (q) {
        const item = q.closest('.faq-item');
        item.classList.toggle('open');
    }
});

// Audio playlist switcher (Cholpon-Ata page)
function initAudioPlaylist(rootId) {
    const root = document.getElementById(rootId);
    if (!root) return;
    const audio = root.querySelector('audio');
    const nowPlaying = root.querySelector('.now-playing');
    root.querySelectorAll('.playlist li[data-src]').forEach((li) => {
        li.addEventListener('click', () => {
            if (li.classList.contains('disabled')) return;
            root.querySelectorAll('.playlist li').forEach((x) => x.classList.remove('active'));
            li.classList.add('active');
            audio.src = li.getAttribute('data-src');
            nowPlaying.textContent = '♪ ' + li.getAttribute('data-title');
            audio.play().catch(() => {});
        });
    });
}
window.initAudioPlaylist = initAudioPlaylist;
