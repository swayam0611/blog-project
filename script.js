let currentIndex = 0;
        const slides = document.querySelectorAll('#slideshow img')

        function showSlide(index){
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if(i===index){
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide(){
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }
        function prevSlide(){
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }
        setInterval(nextSlide, 2000);

        const targetWord = "Maker";
        let currentGuess = "";
        let guessNumber = 0;

        function startwordle() {
            alert("Type your guesses using the keyboard and press Enter!");
        }

        document.addEventListener("keydown", function(event) {
            const key = event.key.toUpperCase();
            const rows = document.querySelectorAll(".wordle .row");
            if (guessNumber >= rows.length) return; // stop after 5 rows

            const currentRow = rows[guessNumber];
            const tiles = currentRow.querySelectorAll(".tile");

            if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
                tiles[currentGuess.length].textContent = key;
                currentGuess += key;
            } else if (key === "BACKSPACE" && currentGuess.length > 0) {
                currentGuess = currentGuess.slice(0, -1);
                tiles[currentGuess.length].textContent = "";
            } else if (key === "ENTER" && currentGuess.length === 5) {
                checkGuess(currentGuess, tiles);
            }
        });

        function checkGuess(guess, tiles) {
            const target = targetWord.toUpperCase();

            for (let i = 0; i < 5; i++) {
                const letter = guess[i];
                if (letter === target[i]) {
                    tiles[i].classList.add("correct");
                } else if (target.includes(letter)) {
                    tiles[i].classList.add("present");
                } else {
                    tiles[i].classList.add("absent");
                }
            }

            if (guess === target) {
                setTimeout(() => alert("🎉 You win!"), 100);
            } else {
                guessNumber++;
                currentGuess = "";

                if (guessNumber >= 5) {
                    setTimeout(() => alert("💀 Game Over! The word was " + target + "\nCome back tomorrow for a new word."), 100);
                }
            }
        }