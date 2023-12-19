function addMonthsToDate(date, monthsToAdd) {
    const dates = [];
    let dateSplit = date.split('-');
    let currentMonth = parseInt(dateSplit[1]);
    let day = parseInt(dateSplit[2]);
    let year = parseInt(dateSplit[0]);
    let lastDayOfMonths = {
        1:31,
        2: year % 4 === 0 ? 29 : 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }
    
    for(let monthAdded = 0; monthAdded < monthsToAdd; monthAdded++){
        currentMonth = currentMonth + 1;
        if(currentMonth === 13){
            currentMonth = 1;
            year = year + 1;
            lastDayOfMonths[2] = year % 4 === 0 ? 29 : 28;
        };
        if(day <= lastDayOfMonths[currentMonth]){
            dates.push(`${year}-${currentMonth < 10 ? '0' : ''}${currentMonth}-${day}`);
        }else{
            dates.push(`${year}-${currentMonth < 10 ? '0' : ''}${currentMonth}-${lastDayOfMonths[currentMonth]}`);
        }
    }

    return dates;
}

addMonthsToDate('2023-07-28', 24).forEach(date => console.log(date));


