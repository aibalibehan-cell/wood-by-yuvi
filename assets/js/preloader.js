(function() {
    'use strict';
    // Instant Image Preloader & Background Caching Engine
    // Preloads critical banner & category assets immediately
    var criticalImages = [
        'assets/images/logo.png',
        'assets/images/hero_desktop.jpg',
        'assets/images/hero_mobile.jpg',
        'assets/images/cat_furniture.jpg',
        'assets/images/cat_partitions.jpg',
        'assets/images/cat_tableware.jpg',
        'assets/images/banner_furniture.jpg',
        'assets/images/banner_partitions.jpg',
        'assets/images/banner_tableware.jpg'
    ];

    criticalImages.forEach(function(src) {
        var img = new Image();
        img.decoding = 'async';
        img.src = src;
    });

    // Idle-time background preloader for the entire catalog and gallery
    function startBackgroundPreload() {
        fetch('assets/js/images-manifest.json')
            .then(function(res) { return res.json(); })
            .then(function(images) {
                var queue = images.slice();
                var batchSize = 6;

                function loadNextBatch() {
                    if (queue.length === 0) return;
                    var batch = queue.splice(0, batchSize);
                    batch.forEach(function(src) {
                        var img = new Image();
                        img.decoding = 'async';
                        img.src = src;
                    });
                    if (queue.length > 0) {
                        if ('requestIdleCallback' in window) {
                            requestIdleCallback(loadNextBatch, { timeout: 1000 });
                        } else {
                            setTimeout(loadNextBatch, 250);
                        }
                    }
                }

                if ('requestIdleCallback' in window) {
                    requestIdleCallback(loadNextBatch, { timeout: 1200 });
                } else {
                    setTimeout(loadNextBatch, 400);
                }
            })
            .catch(function(e) {
                // Non-blocking fallback
            });
    }

    if (document.readyState === 'complete') {
        startBackgroundPreload();
    } else {
        window.addEventListener('load', startBackgroundPreload);
    }
})();
