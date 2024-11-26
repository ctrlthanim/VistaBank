$(document).ready(function () {
    $('.details-toggle').click(function () {
        const details = $(this).closest('.service-card').find('.service-details');
        const buttonText = $(this).text();

        details.slideToggle(300);

        $(this).text(buttonText === 'View Details' ? 'Hide Details' : 'View Details');
    });

    $('.service-card').hover(
        function () {
            $(this).find('.service-summary p').addClass('animate-fade');
        },
        function () {
            $(this).find('.service-summary p').removeClass('animate-fade');
        }
    );
});