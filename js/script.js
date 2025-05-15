$(function () {
    $('form').on('submit', function (e) {
        var isValid = true;
        var firstError = null;
        var checkedRadioNames = {};
        // Снимаем предыдущие ошибки и output
        $(this).find('.--err').removeClass('--err');
        $(this).find('fieldset output.radio-error').remove();
        // Проверяем все input, textarea и select внутри fieldset
        $(this).find('fieldset input, fieldset textarea, fieldset select').each(function () {
            var type = $(this).attr('type');
            // Пропускаем скрытые и неактивные поля
            if ($(this).is(':hidden') || $(this).is(':disabled')) return;
            // Для radio и checkbox: хотя бы один выбранный с этим name
            if ((type === 'radio' || type === 'checkbox') && $(this).attr('name')) {
                var name = $(this).attr('name');
                // Проверяем каждую группу только один раз
                if (checkedRadioNames[name]) return;
                checkedRadioNames[name] = true;
                var $group = $("[name='" + name + "']");
                if ($group.closest('fieldset').length && !$group.is(':checked')) {
                    var $fieldset = $group.closest('fieldset');
                    $fieldset.addClass('--err');
                    $fieldset.find('input').addClass('--err');
                    if (!firstError) firstError = $fieldset.find('input').first();
                    isValid = false;
                }
            } else if (type !== 'radio' && type !== 'checkbox') {
                // Для остальных: просто не пустое значение
                if (!$(this).val()) {
                    $(this).addClass('--err');
                    if (!firstError) firstError = $(this);
                    isValid = false;
                }
            }
        });
        if (!isValid) {
            if (firstError) firstError.focus();
            e.preventDefault();
        }
    });
});
