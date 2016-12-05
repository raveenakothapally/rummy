(() => {
    $('.modal').modal();
    const tBody = $('tbody'),
        scoresDiv = $('.score'),
        newGameConfirmBtn = $('#new-game-confirm');

    newGameConfirmBtn.click(() => {
        socket.emit('new game');
    });
    socket.emit('play');
    socket.on('play resp', (scores) => {
        var index = scores.scores.length;
        tBody.html('');
        var suj = 0, rav = 0, vij = 0;
        while (index > 0) {
            var tr = $("<tr></tr>");
            tr.append($("<th></th>").text(index));
            var perGameScores = scores.scores[index - 1];
            var i = 0;
            for (var perGameScore of perGameScores) {
                tr.append($("<td></td>").text(perGameScore));
                switch(i % 3) {
                    case 0:
                        suj += parseInt(perGameScore);
                        break;
                    case 1:
                        rav += parseInt(perGameScore);
                        break;
                    case 2:
                        vij += parseInt(perGameScore);
                        break;
                    default:
                        console.error('Error');
                }
                ++i;
            }
            index--;
            tBody.append(tr);
        }
        $(scoresDiv[0]).text(pad(suj, 3));
        $(scoresDiv[1]).text(pad(rav, 3));
        $(scoresDiv[2]).text(pad(vij, 3));
    });

    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    $('#round-complete-btn').click(() => {
        socket.emit('end round', [$('#textarea1').val(), $('#textarea2').val(), $('#textarea3').val()]);
        $('#textarea1').val(undefined);
        $('#textarea2').val(undefined);
        $('#textarea3').val(undefined);
    });
})();