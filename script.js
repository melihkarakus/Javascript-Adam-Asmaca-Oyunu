// HTML'deki elementleri seçme
const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again')

// Doğru ve yanlış tahminleri izlemek için boş diziler
const correctLetters = [];
const wrongLetters = [];

// Rastgele bir kelime seçme fonksiyonu
function getRandomWord() {
    const words = ["javascript","java","python"];
    return words[Math.floor(Math.random() * words.length)];
}

// Seçilen kelimeyi ekranda gösterme fonksiyonu
function displayWord() {    
    word_el.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}    
    `;

    // Tüm harfler doğru tahmin edildiyse kazanma durumunu kontrol etme
    const w = word_el.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler kazandınız.';
    }
}

// Yanlış tahmin edilen harfleri güncelleme fonksiyonu
function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Yanlış tahmin edilen harf sayısına göre asma oyunundaki elemanları güncelleme
    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

    // Tüm hakkınız bittiğinde kaybetme durumunu kontrol etme
    if(wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef Kaybettiniz.';
    }
}

// Mesajı kısa süre gösteren fonksiyon
function displayMessage() {    
    message.classList.add('show');
    
    setTimeout(function(){
        message.classList.remove('show');
    }, 2000);
}

// Yeniden oyna butonuna tıklanınca oyunu sıfırlama fonksiyonu
playAgainBtn.addEventListener('click', function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});

// Klavye tuşuna basıldığında çalışan fonksiyon
window.addEventListener('keydown', function(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {        
        const letter = e.key;

        // Doğru tahmin edilen harfi kontrol etme
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else { // Yanlış tahmin edilen harfi kontrol etme
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else{
                displayMessage();
            }
        }
    }
});

// Oyunu başlatma
displayWord();