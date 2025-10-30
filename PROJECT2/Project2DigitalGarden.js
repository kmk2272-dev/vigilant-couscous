// Project2DigitalGarden.js
// Handles the single overlay box: shows the overlay when hovering the MAIN DETAIL image
// or when hovering the RAIN SCREEN heading. Keeps aria-hidden in sync.
(function catwalkreveal () {
    const catwalkoverlay = document.querySelector('.image .catwalkoverlay');
    const catwalkHeading = document.querySelector('.CatwalkSystem h2');

    function updateCatwalkOverlay() {
        const catwalkOverlayHover = catwalkoverlay.matches(':hover');
        const catwalkHeadingHover = catwalkHeading ? catwalkHeading.matches(':hover') : false;

        if(catwalkOverlayHover || catwalkHeadingHover){
            catwalkoverlay.classList.add('visible');
        } else{
            catwalkoverlay.classList.remove('visible');
            catwalkoverlay.setAttribute('aria-hidden', 'true');
        }}
        if(catwalkHeading){
            if(catwalkOverlayHover){
                catwalkHeading.classList.add('hovered-overlay');
            } else{
                catwalkHeading.classList.remove('hovered-overlay');
            }}
    ['pointerenter', 'pointerleave', 'pointerover', 'pointerout'].forEach(evt => {
        catwalkoverlay.addEventListener(evt, updateCatwalkOverlay, { passive: true });
        if (catwalkHeading) catwalkHeading.addEventListener(evt, updateCatwalkOverlay, { passive: true })});
    
    document.addEventListener('mousemove', updateCatwalkOverlay, { passive: true });
	document.addEventListener('touchstart', updateCatwalkOverlay, { passive: true });

    updateCatwalkOverlay();
});

(function () {
	
	const hotspot = document.querySelector('.image .hotspot');
	const overlay = document.querySelector('.image .overlay');
	const rainHeading = document.querySelector('.OuterSkinSystem h2');

	// Require hotspot and overlay to exist; hotspot limits activation area to 1/3 of image horizontally
	if (!hotspot || !overlay) return; // nothing to do

	function updateOverlay() {
		const hotspotHover = hotspot.matches(':hover');
		const overlayHover = overlay.matches(':hover');
		const rainHover = rainHeading ? rainHeading.matches(':hover') : false;

		// Show/hide overlay and keep aria-hidden in sync
		if (hotspotHover || overlayHover || rainHover) {
			overlay.classList.add('visible');
			overlay.setAttribute('aria-hidden', 'false');
		} else {
			overlay.classList.remove('visible');
			overlay.setAttribute('aria-hidden', 'true');
		}

		// When pointer is over the overlay specifically, add class to the RAIN SCREEN heading to color it red
		if (rainHeading) {
			if (overlayHover) {
				rainHeading.classList.add('hovered-overlay');
			} else {
				rainHeading.classList.remove('hovered-overlay');
			}
		}
	}

	// Use pointer events for reliable cross-input detection
	['pointerenter', 'pointerleave', 'pointerover', 'pointerout'].forEach(evt => {
		hotspot.addEventListener(evt, updateOverlay, { passive: true });
		overlay.addEventListener(evt, updateOverlay, { passive: true });
		if (rainHeading) rainHeading.addEventListener(evt, updateOverlay, { passive: true });
	});

	// Safety nets: update on mousemove and touchstart as well
	document.addEventListener('mousemove', updateOverlay, { passive: true });
	document.addEventListener('touchstart', updateOverlay, { passive: true });

	// Initial sync
	updateOverlay();
})()
