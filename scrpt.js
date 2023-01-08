(() => {
        const DAILY_LIMIT = 2000;

        // elements
        const waterVolumeInput = document.getElementById("waterVolume");
        const outputSpan = document.getElementById("output");
        const indicatorDiv = document.getElementById("indicator");
        const addButton = document.getElementById('add_button');


        //database init
        const storageVal = localStorage.getItem("water_database");
        const database = (storageVal) ? JSON.parse(storageVal) : [];


        const render = () => {
            outputSpan.innerHTML = database.map((value, index) => `
            <li class="item" index="${index}">
                ${value.volume} date - ${value.dateAdded} 
                <button class="delete" index="${index}">delete</button>
                <button class="edit" index="${index}">edit</button>
                <button class="detail" index="${index}">details</button>
            </li>
        `).join("");

            calculatePercent();

            document.querySelectorAll('.delete').forEach(value =>
                value.addEventListener('click', () => {
                    const id = Number(value.getAttribute('index'));
                    console.log(id);
                    database.splice(id, 1);
                    localStorage.setItem("water_database",
                        JSON.stringify(database));
                    render();
                }));

            document.querySelectorAll('.detail').forEach((value =>
                    value.addEventListener('click', () => {
                        const id = Number(value.getAttribute('index'));
                        alert(JSON.stringify(database[id]));
                    })
            ));

            document.querySelectorAll('.edit').forEach((value =>
                    value.addEventListener('click', () => {
                        const id = Number(value.getAttribute('index'));
                        const newValue = prompt("Input new number");
                        if (isNumber(newValue)) {
                            database[id] = {volume: Number(newValue), dateAdded: database[id].dateAdded};
                            render();
                        } else {
                            alert('Wrong value!');
                        }
                    })
            ));
        }
        render();

        function isNumber(x) {
            if (x === '') {
                return false;
            }
            const numX = +x;
            if (isNaN(numX)) {
                return false;
            } else {
                return true;
            }
        }

        function calculatePercent() {
            let sum = 0;
            for (const databaseElement of database) {
                if (databaseElement) {
                    sum += databaseElement.volume;
                }
            }
            const percentDailyLimit = (sum / DAILY_LIMIT) * 100;

            indicatorDiv.innerHTML =
                `<div style="width: 100%; height: ${percentDailyLimit}%; background:aqua"><h4>${percentDailyLimit}%</h4></div>`;
        }

        function addRecord() {
            //outputSpan.textContent = waterVolumeInput.value
            const volume = waterVolumeInput.value;
            if (isNumber(volume)) {
                database.push({volume: +volume, dateAdded: new Date().toJSON()});
            } else {
                alert("Not a number");
            }
            calculatePercent();
            localStorage.setItem("water_database",
                JSON.stringify(database));
            render();
        }

        addButton.onclick = addRecord;
    }

// showDate = (dt) => {
//     return ''
// }
// console.log (Date.prototype[@@toPrimitive]);
// Date.prototype.getDate()
// Date.prototype.getDay()
// Date.prototype.getFullYear()
// Date.prototype.getHours()
// Date.prototype.getMilliseconds()
// Date.prototype.getMinutes()
// Date.prototype.getMonth()
// Date.prototype.getSeconds()
// Date.prototype.getTime()
// Date.prototype.getTimezoneOffset()
// Date.prototype.getUTCDate()
// Date.prototype.getUTCDay()
// Date.prototype.getUTCFullYear()
// Date.prototype.getUTCHours()
// Date.prototype.getUTCMilliseconds()
// Date.prototype.getUTCMinutes()
// Date.prototype.getUTCMonth()
// Date.prototype.getUTCSeconds()


)();