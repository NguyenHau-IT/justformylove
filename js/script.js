$(document).ready(function () {
    const $envelope = $('#envelope');
    const $openBtn = $("#openBtn");
    const $resetBtn = $("#resetBtn");

    let currentPage = 1;
    const totalPages = 8;
    let isOpen = false;

    $envelope.on('click', function (e) {
        // Ignore clicks from buttons inside envelope
        if ($(e.target).hasClass('btn-style') || $(e.target).hasClass('gift-button') || $(e.target).is('button')) {
            console.log("Button click detected, ignoring envelope click");
            return;
        }
        if (isOpen) {
            // If on page 8, show modal instead of going to next page
            if (currentPage === 8) {
                console.log("Page 8 click - showing modal");
                if (typeof showBirthdayMessage === 'function') {
                    showBirthdayMessage();
                } else {
                    console.log("showBirthdayMessage function not found");
                }
            } else {
                console.log("Envelope click - going to next page");
                nextLyric();
            }
        }
    });

    $openBtn.on('click', function () {
            $envelope.removeClass("close unseal").addClass("open");
        isOpen = true;
        $openBtn.hide();
        $resetBtn.show();
            // wait for flip to finish (match CSS transition 0.8s), then unseal
            setTimeout(()=>{ $envelope.addClass('unseal'); }, 820);
    });

    $resetBtn.on('click', function () {
            $envelope.removeClass("open unseal").addClass("close");
        isOpen = false;
        setTimeout(function () {
            currentPage = 1;
            updateActivePage();
            $resetBtn.hide();
            $openBtn.show();
        }, 600);
    });

    function nextLyric() {
        currentPage = currentPage < totalPages ? currentPage + 1 : 1;
        updateActivePage();
    }

    function updateActivePage() {
        $(".lyric-page").removeClass("active");
        $("#page" + currentPage).addClass("active");
    }
});

const openBtn = document.getElementById("openBtn");
const resetBtn = document.getElementById("resetBtn");
const envelope = document.getElementById("envelope");
const audio = document.getElementById("sound");

let hasPlayed = false;

function playAudioOnce() {
    if (!hasPlayed) {
        audio.play().then(() => {
            hasPlayed = true;
        }).catch((e) => {
            console.log("Không thể phát nhạc:", e);
        });
    }
}

openBtn.addEventListener("click", function () { playAudioOnce(); });
resetBtn.addEventListener("click", function () { playAudioOnce(); });
