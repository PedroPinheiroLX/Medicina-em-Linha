(function ($) {
    'use strict';

    var pluginName = 'ScrollIt',
        pluginVersion = '1.0.3';

    // Default settings for the plugin
    var defaults = {
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset: 0
    };

    $.scrollIt = function (options) {
        var settings = $.extend(defaults, options),
            active = 0,
            lastIndex = $('[data-scroll-index]:last').data('scroll-index');

        // Helper to calculate the target top position
        function getTargetTop(ndx) {
            return $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
        }

        // Navigate to a specific index
        function navigate(ndx) {
            if (ndx < 0 || ndx > lastIndex) return;

            $('html, body').animate({
                scrollTop: getTargetTop(ndx)
            }, settings.scrollTime);
        }

        // Handle click events on navigation buttons
        function handleScrollClick(e) {
            e.preventDefault();
            var target = $(e.target).closest("[data-scroll-nav], [data-scroll-goto]").data('scroll-nav') ||
                $(e.target).closest("[data-scroll-goto]").data('scroll-goto');
            navigate(parseInt(target, 10));
            updateActive(parseInt(target, 10)); // Update active class when menu item is clicked
        }

        // Keyboard navigation
        function keyNavigation(e) {
            if ($('html, body').is(':animated')) return;

            var key = e.which;
            if (key === settings.upKey && active > 0) {
                navigate(active - 1);
                updateActive(active - 1); // Update active class on keyboard navigation
            } else if (key === settings.downKey && active < lastIndex) {
                navigate(active + 1);
                updateActive(active + 1); // Update active class on keyboard navigation
            }
        }

        // Update the active class based on the current scroll position or click
        function updateActive(ndx) {
            if (settings.onPageChange && ndx !== active) {
                settings.onPageChange(ndx);
            }

            active = ndx;
            $('[data-scroll-nav]').removeClass(settings.activeClass);
            $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass);
        }

        // Watch the current scroll position and update active class accordingly
        function watchActive() {
            var winTop = $(window).scrollTop();

            var visible = $('[data-scroll-index]').filter(function () {
                var $this = $(this);
                return winTop >= $this.offset().top + settings.topOffset &&
                    winTop < $this.offset().top + settings.topOffset + $this.outerHeight();
            });

            var newActive = visible.first().data('scroll-index');
            if (newActive !== active) {
                updateActive(newActive); // Update active class when scrolling
            }
        }

        // Initialize the plugin
        $(window).on('scroll', watchActive).scroll(); // Trigger scroll event on page load
        $(window).on('keydown', keyNavigation); // Keyboard navigation
        $(document).on('click', '[data-scroll-nav], [data-scroll-goto]', handleScrollClick); // Click events for navigation
    };
}(jQuery));
