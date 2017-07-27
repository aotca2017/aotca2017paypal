
$(".radioTitle[name='titleRadio']").click(function () {
    var radioListValue = this.value;
    $(".radio .radioListValue").val(radioListValue);

});

// $(".dietaryRegistration[name='delegateDietary']").click(function () {
//     var radioListValue = this.value;
//     $(".delegate-dietary .radioListValue").val(radioListValue);
// });

$(".delegateRadio[name='entry.651229178']").click(function () {
    var radioListValue = this.value;
    $(".delegate-choice-container .radioListValue").val(radioListValue);
});

$(".delegateDietary[name='delegateDietary']").click(function () {
    var radioListValue = this.value;
    $(".delegate-dietary .radioListValue").val(radioListValue);

});

$(".delegateDinner[name='delegateDinner']").click(function () {
    var radioListValue = this.value;
    $(".delegate-dinner .radioListValue").val(radioListValue);

});

$(".delegateTour[name='delegateTour']").click(function () {
    var radioListValue = this.value;
    $(".delegate-tour .radioListValue").val(radioListValue);

});

$("#form-content").submit(function(){
    $("#ss-submit").attr("disabled", true);
    setTimeout(function(){
        $("#ss-submit").attr("disabled", false);
    }, 1000);
});

$("#hidden_iframe").on('load',function () {
    $("#myModal").modal('show');
    $("#form-content")[0].reset();
    setTimeout(function(){
        $("#myModal").modal('hide');
    }, 2000);
});


$(".delegateRadio").click(function() {
    var numberChoice = $(this).val();

    $("div.formChoice").hide();
    // $("#formChoice" + numberChoice).show();
    $("#formChoice" + numberChoice).slideDown("slow");
    $(this).change();
});

$(".accompanyRadio[name$='accompanyRadio']").click(function() {
    var radioChoice = $(this).val();
    $("div.additional-person-container").hide();
    // $("#additionalContainer" + radioChoice).show();
    $("#additionalContainer" + radioChoice).slideDown("slow");
    $(this).change();
});

$(".paymentRadio").click(function() {
    var paymentChoice = $(this).val();
    $("div.payment-choice").hide();
    $('#' + paymentChoice).slideDown("slow");
    $(this).change();
});


$(function () {
    $("#paypalButton").click(function (e) {
        e.preventDefault();
        $("#paypal-form").submit();
    });
});




$(function(){
    $('#form-content').on('change', '*', function(e){

        var $form = $(this).closest('form');
        // var $form = $("#form-content");

        var $total = $form.find("[name='entry.2019220793']");


        if ($(e.target).is($total)) {
            return;
        }

        var data = $form.serializeArray().reduce(function(obj, item){
            obj[item.name] = item.value;
            return obj;
        }, {});

        var model = {};
        model.complimentary = data['entry.651229178'] == 'Complimentary';

        var $companions = $form.find("[name='entry.350075210']");
        if ($companions.is(':visible')) {
            model.companions = data['entry.350075210'];
        } else {
            model.companions = 0;
        }

        model.courierRequested = data['entry.193270809'] == 'Send Invitation via Courier';
        // model.paymentMethod = 'bank-deposit';
        model.paymentMethod = data['entry.1146092643'];

        var total = 0;
        if (!model.complimentary) {
            total += 300.00;
        }
        if (model.companions) {
            total += 200.00 * Number(model.companions);
        }
        if (model.courierRequested) {
            total += 20.00;
        }

        if (total > 0) {
            if (model.paymentMethod == 'paypal-payment') {
                total += 15.00;
            } else {
                total += 8.00;
            }
        }

        $total.val(total);

        var paypalForm = $("#paypal-form").find("[name='amount_1']");
        paypalForm.val(total);




    });
    $($('#form-content input')[0]).change();
});


$(function () {
    var inputs = document.querySelectorAll( 'input[type=text], input[type=email], input[type=number]' );
    for (i = 0; i < inputs.length; i ++) {
        var inputEl = inputs[i];
        if( inputEl.value.trim() !== '' ) {
            inputEl.parentNode.classList.add( 'input--filled' );
        }
        inputEl.addEventListener( 'focus', onFocus );
        inputEl.addEventListener( 'blur', onBlur );
    }

    function onFocus( ev ) {
        ev.target.parentNode.classList.add( 'inputs--filled' );
    }

    function onBlur( ev ) {
        if ( ev.target.value.trim() === '' ) {
            ev.target.parentNode.classList.remove( 'inputs--filled' );
        } else if ( ev.target.checkValidity() == false ) {
            ev.target.parentNode.classList.add( 'inputs--invalid' );
            ev.target.addEventListener( 'input', liveValidation );
        } else if ( ev.target.checkValidity() == true ) {
            ev.target.parentNode.classList.remove( 'inputs--invalid' );
            ev.target.addEventListener( 'input', liveValidation );
        }
    }

    function liveValidation( ev ) {
        if ( ev.target.checkValidity() == false ) {
            ev.target.parentNode.classList.add( 'inputs--invalid' );
        } else {
            ev.target.parentNode.classList.remove( 'inputs--invalid' );
        }
    }

    var submitBtn = document.querySelector( 'button[type=submit]' );
    submitBtn.addEventListener( 'click', onSubmit );

    function onSubmit( ev ) {
        var inputsWrappers = ev.target.parentNode.querySelectorAll( 'span' );
        for (i = 0; i < inputsWrappers.length; i ++) {
            input = inputsWrappers[i].querySelector( 'input[type=text], input[type=email], input[type=number]' );
            if ( input.checkValidity() == false ) {
                inputsWrappers[i].classList.add( 'inputs--invalid' );
            } else if ( input.checkValidity() == true ) {
                inputsWrappers[i].classList.remove( 'inputs--invalid' );
            }
        }
    }
});
