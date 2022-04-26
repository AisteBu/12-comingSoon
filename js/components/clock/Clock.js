class Clock {
    constructor(selector, targetDate) {
        this.selector = selector;
        this.targetDate = targetDate;

        this.DOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector()) {
            return false;
        }
        
        this.render();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            console.error('ERROR: this.selector has to be non-empty string');
            return false;
        }

        this.DOM = document.querySelector(this.selector);
        if (!this.DOM) {
            console.error('ERROR: could not find an element by given selector');
            return false;
        }

        return true;
    }

    formatTime(timeValues) {
        const updatedTime = [];

        for (let i = 0; i < timeValues.length; i++) {
            const time = timeValues[i];
            if (i === 0 || time > 9) {
                // kada pushinam originalu skaiciu
            updatedTime.push(time)
            } else {
                // o kada pridedam 0 priekyje
            updatedTime.push('0' + time);
        }
        console.log(updatedTime);
    }

        return updatedTime;
    }

    calcDeadline() {
        const dabartinisLaikas = new Date();
        const einamiejiMetai = dabartinisLaikas.getFullYear();

        let numanomaGimtadienioData = einamiejiMetai + '-' + this.targetDate;
        let numanomasLaikas = new Date(numanomaGimtadienioData);
        // vietoj const rasom let, jei norim issitraukti duomenis. I if nukopijuojame eilute be let, ir console.log irasom pirmaja reiksme

        const dabartinesMilisekundes = dabartinisLaikas.getTime();
        let numanomosMilisekundes = numanomasLaikas.getTime();

        if (dabartinesMilisekundes > numanomosMilisekundes)  { 
            numanomaGimtadienioData = (einamiejiMetai + 1) + '-' + this.targetDate;
            numanomasLaikas = new Date(numanomaGimtadienioData);
            numanomosMilisekundes = numanomasLaikas.getTime();
        }

        const likusiosMilisekundes = numanomosMilisekundes - dabartinesMilisekundes;
        let likusiosSekundes = Math.floor(likusiosMilisekundes / 1000); //suapvalinom
        
        const dienos = Math.floor(likusiosSekundes / 60 / 60 / 24);
        likusiosSekundes -= dienos * 60 * 60 * 24;
                
        const valandos = Math.floor(likusiosSekundes / 60 / 60);
        likusiosSekundes -= valandos * 60 * 60;
                
        const minutes = Math.floor(likusiosSekundes / 60);
        likusiosSekundes -= minutes * 60;

        return [dienos, valandos, minutes, likusiosSekundes];
        // sita rezultata rodys  cia: init() ...->    this.calcDeadline();
        
        // issitraukiame "einamieji-metai" (2021)
        // susikonstruojame einamuju metu gimtadienio (this.targetDate) laika (A)
        // susikonstruojame einamaji (dabar) laika (B)
        // palyginame laikus milisekundemis
            // jeigu A < B, reiskia, mes jau esame po gimtadienio
            // jeigu A > B, reiskia, gimtadienis dar tik laukia / ateina
                //tokiu atveju, gimtadienis bus "einamieji-metai" ++ (2022)

        // kadangi jau nustateme, kelintais metais pagal duota this.targetDate bus tas gimtadienis, tai:
            // galime paskaiciuoti laiko skirtuma nuo "dabar" 
            // apskaiciuoti, kiek milisekundziu skirtumas sudaro:
                // dienu, valandu, minuciu, sekundziu

            // apskaiciuotas laikas (d, v, m, s) grazinamas array formatu
    }

    render() {
        const timeValues = this.formatTime(this.calcDeadline()); // is init() istriname calcDeadline ir irasome cia
        // dabar keiciasi pagrindinis laikrodis
        const labelValues = ['Days', 'Hours', 'Minutes', 'Seconds'];
        let HTML = '';

        for (let i = 0; i < timeValues.length; i++) {
        HTML += `<div class="time">
                      <div class="value">${timeValues[i]}</div>
                      <div class="label">${labelValues[i]}</div>
                </div>`;
        }

        this.DOM.innerHTML = HTML;
    }

}

// function Clock (selector) {
//    const DOM = document.querySelector(selector);
//    const timeValues = [432, 9, 37, 39];
//    const labelValues = ['Days', 'Hours', 'Minutes', 'Seconds'];
//    let HTML = '';

//    for (let i = 0; i < timeValues.length; i++) {
//        HTML += `<div class="time">
//                    <div class="value">${timeValues[i]}</div>
//                    <div class="label">${labelValues[i]}</div>
//                </div>`;
//    }

//    DOM.innerHTML = HTML;
//}

export { Clock }