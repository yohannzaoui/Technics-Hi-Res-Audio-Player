function startVolRepeat(dir) {
    stopVolRepeat();
    isMuted = false;
    const adjust = () => {
        // On calcule le nouveau volume en restant sur des multiples de 0.01
        let step = 0.01;
        let newVol = dir === 1 ? audio.volume + step : audio.volume - step;
        
        // On arrondit pour éviter les bugs de virgule infinie du navigateur
        audio.volume = Math.max(0, Math.min(1, Math.round(newVol * 100) / 100));
        
        showVolumeDisplay();
    };
    adjust();
    volRepeatInterval = setInterval(adjust, 300);
}




function showVolumeDisplay() {
    if (volDisplayTimeout) clearTimeout(volDisplayTimeout);
    const timeLabel = document.getElementById('time-label');
    const timeSep = document.getElementById('time-sep');
    
    if (isMuted) {
        timeLabel.innerText = "MUTE";
        document.getElementById('m-d1').innerText = " ";
        document.getElementById('m-d2').innerText = " ";
        document.getElementById('s-d1').innerText = "0";
        document.getElementById('s-d2').innerText = "0";
    } else {
        timeLabel.innerText = "VOLUME";
        
        // --- CORRECTION ICI : On arrondit à l'unité la plus proche ---
        let volPerc = Math.round(audio.volume * 100); 
        if (volPerc > 99) volPerc = 99; // Pour rester sur 2 chiffres max
        
        const s = volPerc.toString().padStart(2, '0');
        document.getElementById('m-d1').innerText = " ";
        document.getElementById('m-d2').innerText = " ";
        document.getElementById('s-d1').innerText = s[0];
        document.getElementById('s-d2').innerText = s[1];
    }
    timeSep.style.opacity = "0";
}
