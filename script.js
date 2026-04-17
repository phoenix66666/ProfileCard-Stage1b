        function updateTime() {
            const currentTimeElement = document.getElementById('current-time');
            currentTimeElement.textContent = Date.now();
        }

        setInterval(updateTime, 1000);
        updateTime();