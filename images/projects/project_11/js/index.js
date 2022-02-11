$('.log-block').height($('.calculator-wrap').height());

$('.button-number').click(function(event){
    $('.screen-block').text(function(i, origText){
        if (Number(origText) === 0) {
            origText = '';
        }

        return origText + $(event.currentTarget).text(); 
      }
    );
});

$('.C').click(function() {
    $('.screen-block').text('0').css('color', 'black').css('font-family', 'Times');
})

$('.button-operator').click(function(event){
    $('.screen-block').text(function(i, origText) {
        let rezultText = origText;
        
        if (!isNaN(Number(origText))) {
            rezultText = origText + $(event.currentTarget).text();
        }

        if (/[*+-/]$/.test(origText)) {
            rezultText = origText.slice(0, -1) + $(event.currentTarget).text();
        }

        return rezultText;
    })
})

$('.equal').click(function() {
    $('.screen-block').text(function(i, origText) {
        let rezultText = origText;
        
        if (/[/]0$/.test(rezultText)) {
            $(this).css('color', 'red');
            $(this).css('font-family', 'Arial');
            rezultText = 'ERROR';
        } else {
            rezultText = Function('return ' + rezultText)();
            let equation = origText + '=' +rezultText;
            showEquation(equation);
        }
              
        return rezultText;
    });

})

function showEquation(equation) {
    let li = $('<li></li>').addClass('log-item');
    let div = $('<div></div>').addClass('log-circle');
        
    $(div).append($('<svg><circle cx="20" cy="20" r="18" /></svg>')).click(function() {
        $(this).toggleClass('red-circle'); 
    });
    $(li).append(div);

    div = $('<div></div>').addClass('log-equation').text(equation);
    $(li).append(div);
    
    div = $('<div></div>').addClass('log-close').html('&times;').hover(function() {
        $(this).toggleClass('red_log-close'); 
    }).click(function() {
        $(this).parent().remove();
    });
    $(li).append(div);

    $('.log-list').prepend(li);
    $('li>div').filter(':contains(48)').css('text-decoration', 'underline');
}

$('.log-block').scroll(function(){
    console.log('Scroll Top: ' + $('.log-block').scrollTop());
});

