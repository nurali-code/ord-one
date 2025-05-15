$(function () {
    $('form').on('submit', function (e) {
        var isValid = true;
        var firstError = null;
        var checkedRadioNames = {};
        // Снимаем предыдущие ошибки
        $(this).find('.--err').removeClass('--err');
        // Проверяем все input, textarea и select внутри fieldset
        $(this).find('fieldset input, fieldset textarea, fieldset select').each(function () {
            var type = $(this).attr('type');
            if ($(this).is(':hidden') || $(this).is(':disabled')) return;
            if ((type === 'radio' || type === 'checkbox') && $(this).attr('name')) {
                var name = $(this).attr('name');
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

    // Снимаем ошибку при изменении любого input внутри fieldset с ошибкой
    $(document).on('input change', 'fieldset.--err input', function () {
        var $fieldset = $(this).closest('fieldset');
        $fieldset.removeClass('--err');
        $fieldset.find('input').removeClass('--err');
    });
});

