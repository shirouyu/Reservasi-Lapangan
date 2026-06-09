
    let currentYear = 2026;
    let currentMonth = 5; // Juni (0-indexed)
    let selectedDateStr = "2026-06-07";

    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const daysNameIndo = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

    window.addEventListener('DOMContentLoaded', () => {
        renderDateSlider();
        renderDoubleCalendar();
        
        document.getElementById('toggleSchedule').addEventListener('click', function() {
            var grid = document.getElementById('scheduleGrid');
            var arrow = this.querySelector('.arrow');
            if (grid.style.display === 'none' || grid.style.display === '') {
                grid.style.display = 'grid';
                arrow.textContent = '▲';
            } else {
                grid.style.display = 'none';
                arrow.textContent = '▼';
            }
        });

        const calBtn = document.getElementById('calBtn');
        const calPopup = document.getElementById('calPopup');
        calBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            calPopup.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!calPopup.contains(e.target) && e.target !== calBtn) {
                calPopup.classList.remove('open');
            }
        });

        document.getElementById('prevMonthBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            currentMonth--;
            if(currentMonth < 0) { currentMonth = 11; currentYear--; }
            renderDoubleCalendar();
        });

        document.getElementById('nextMonthBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            currentMonth++;
            if(currentMonth > 11) { currentMonth = 0; currentYear++; }
            renderDoubleCalendar();
        });
    });

    function renderDateSlider() {
        const slider = document.getElementById('dateSlider');
        slider.innerHTML = '';
        let baseDate = new Date(selectedDateStr);
        
        for (let i = -2; i < 5; i++) {
            let d = new Date(baseDate);
            d.setDate(baseDate.getDate() + i);
            
            let yyyy = d.getFullYear();
            let mm = String(d.getMonth() + 1).padStart(2, '0');
            let dd = String(d.getDate()).padStart(2, '0');
            let dateString = `${yyyy}-${mm}-${dd}`;

            const dateItem = document.createElement('div');
            dateItem.className = 'date-item' + (dateString === selectedDateStr ? ' active' : '');
            dateItem.setAttribute('data-date', dateString);
            
            dateItem.innerHTML = `
                <span class="day-name">${daysNameIndo[d.getDay()]}</span>
                <span class="day-num">${d.getDate()} ${monthsShort[d.getMonth()]}</span>
            `;

            dateItem.addEventListener('click', function() {
                document.querySelectorAll('#dateSlider .date-item').forEach(el => el.classList.remove('active'));
                this.classList.add('active');
                selectedDateStr = this.getAttribute('data-date');
                
                let p = selectedDateStr.split('-');
                currentYear = parseInt(p[0]);
                currentMonth = parseInt(p[1]) - 1;
                renderDoubleCalendar();
            });

            slider.appendChild(dateItem);
        }
    }

    function renderDoubleCalendar() {
        let yearLeft = currentYear;
        let monthLeft = currentMonth;
        
        let yearRight = currentYear;
        let monthRight = currentMonth + 1;
        if(monthRight > 11) { monthRight = 0; yearRight++; }

        document.getElementById('leftMonthTitle').textContent = `${monthsShort[monthLeft]} ${yearLeft}`;
        document.getElementById('rightMonthTitle').textContent = `${monthsShort[monthRight]} ${yearRight}`;

        buildMonthGrid(document.getElementById('leftDaysGrid'), yearLeft, monthLeft);
        buildMonthGrid(document.getElementById('rightDaysGrid'), yearRight, monthRight);
    }

    function buildMonthGrid(gridElement, year, month) {
        gridElement.innerHTML = '';
        
        // Label urutan hari kalender sesuai hitungan penanggalan
        const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
        labels.forEach(l => {
            let span = document.createElement('span');
            span.className = 'day-label';
            span.textContent = l;
            gridElement.appendChild(span);
        });

        let firstDay = new Date(year, month, 1).getDay();
        let startOffset = firstDay === 0 ? 6 : firstDay - 1;
        let totalDays = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startOffset; i++) {
            let blank = document.createElement('span');
            blank.className = 'disabled';
            gridElement.appendChild(blank);
        }

        for (let day = 1; day <= totalDays; day++) {
            let mmStr = String(month + 1).padStart(2, '0');
            let ddStr = String(day).padStart(2, '0');
            let cellDateStr = `${year}-${mmStr}-${ddStr}`;

            let cell = document.createElement('div');
            cell.className = 'day-cell';
            
            if (cellDateStr === selectedDateStr) {
                cell.classList.add('selected-red');
            }

            cell.textContent = day;
            
            cell.addEventListener('click', (e) => {
                e.stopPropagation();
                selectedDateStr = cellDateStr;
                document.getElementById('calPopup').classList.remove('open');
                renderDateSlider();
                renderDoubleCalendar();
            });

            gridElement.appendChild(cell);
        }
    }