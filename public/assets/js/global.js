var array = [1, 2, 3, 4, 5];
var stepDelay = 200;

$(() => {
    update(array);
})

$(".sort").click(function (e) { 
    if ($(this).hasClass('disabled')) return;
    e.preventDefault();
    let inputval = $("#input").val();
    stepDelay = parseInt($("#stepDelay").val()) || 200;
    console.log(inputval);
    array = []
    inputval.split(" ").forEach((v) => {
        if (!isNaN(Number(v))) {
            array.push(Number(v));
        } else {
            alert('Please enter valid numbers only');
        }
    });
    update(array)
    sort();
    $(this).addClass('disabled');
});

function delay(ms) {
    return  new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}

function select(index) {
    $(".visual-array .element").each((i, o) => {
        $(o).removeClass('selected');
        if (i == index) {
            $(o).addClass('selected');
        }
    })
}

function select1(index) {
    $(".visual-array .element").each((i, o) => {
        $(o).removeClass('selected1');
        if (i == index) {
            $(o).addClass('selected1');
        }
    })
}

function pointer(index) {
    $(".visual-array .element-wrapper").each((i, o) => {
        $(o).removeClass('pointer');
        if (i == index) {
            $(o).addClass('pointer');
        }
    })
}

async function swap(from, to) {
    let $from = $('.visual-array .element:eq(' + from + ')')
    let $to = $('.visual-array .element:eq(' + to + ')')
    let $fromWrapper = $('.visual-array .element-wrapper:eq(' + from + ')')
    let $toWrapper = $('.visual-array .element-wrapper:eq(' + to + ')')
    let tmp = $from;
    // get offset
    let x1 = $from.offset().left;
    let y1 = $from.offset().top;
    let x2 = $to.offset().left;
    let y2 = $to.offset().top;
    let fromTmp = $("<div class='tmp'></div>").append($from.clone()).css(
        {"position": "absolute",  
         "z-index": 9999, 
         top:  y1 + 'px', left: x1 + 'px'}
    );
    let toTmp = $("<div class='tmp'></div>").append($to.clone()).css(
        {"position": "absolute",  
         "z-index": 9999, 
         top:  y2 + 'px', left: x2 + 'px'}
    );
    $('body').append(fromTmp);
    $('body').append(toTmp);
    $($from).addClass("invisible");
    $($to).addClass("invisible");
    await delay(50);
    fromTmp.css({top:  y2 + 'px', left: x2 + 'px'});
    toTmp.css({top:  y1 + 'px', left: x1 + 'px'});
    await delay(stepDelay);
    update(array);
    $(".tmp").each((i, o) => {
        $(o).remove();
    })
}

function update(arr) {
    $(".visual-array").empty();
    for (let i=0; i < arr.length; i++) {
        let element = $('<div class="element"></div>');
        element.text(arr[i]);
        let wrapper = $('<div class="element-wrapper"></div>');
        wrapper.append(element);
        $(".visual-array").append(wrapper);
    }
}

function explain(message) {
    $(".explain").text(message);
}