$(document).ready(function () {
    $('.faq-question').click(function () {
        const item = $(this).parent();
        const answer = item.find('.faq-answer');
        const allAnswers = $('.faq-answer');
        const allItems = $('.faq-item');

        if (item.hasClass('active')) {
            answer.css('max-height', '0');
            item.removeClass('active');
        } else {
            allAnswers.css('max-height', '0');
            allItems.removeClass('active');

            const height = answer.find('p')[0].scrollHeight;
            answer.css('max-height', height + 'px');
            item.addClass('active');
        }
    });
});