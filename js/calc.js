// 'use strict';

let ringDiameter = document.getElementById("ringsDiameter"),
    ringsNumber = document.getElementById('rnumber'),
    trenchCheckInput = document.getElementById('trench'),
    trenchLengthInput = document.getElementById('trench-length'),
    distanceInput = document.getElementById('distance'),
    totalCostValue = document.getElementById('cost'),
    coverChoose = document.getElementById('cover'),
    bottomChoose = document.getElementById('bottom');
    calculationBtn = document.getElementById('calcBtn');

let appData = {
    ringsPrices : [770, 870, 950, 1350, 1400, 1450, 1750, 1850, 1900],
    holePrices : [250, 300, 350, 400, 450, 450, 500, 800, 850],
    trenchWorkPrice : 250,
    deliveryPrice : 25,
    ringsTotalCost: 0,
    coverCost: 0,
    bottomCost: 0,
    trenchTotalCost: 0,
    deliveryTotalCost: 0,
    totalCostWorks: 0,
};

coverChoose.checked = false;
coverChoose.disabled = false;

bottomChoose.checked = false;
bottomChoose.disabled = false;

calculationBtn.onclick = function(){
    appData.ringsTotalCost=0;
    appData.trenchTotalCost=0;
    appData.deliveryTotalCost=0;
    appData.totalCostWorks=0;
    appData.coverCost=0;
    appData.bottomCost=0;

    //секция расчетов: в общую стоимость ложим число колец*стоимость конкретного кольца
    //                                              диаметр кольца
    appData.ringsTotalCost = appData.ringsPrices[ringsDiameter.value] * rnumber.value;
    if (coverChoose.checked){
        appData.coverCost = appData.ringsPrices[ringsDiameter.value] - 50;
    }
    if (bottomChoose.checked){
        appData.bottomCost = appData.ringsPrices[ringsDiameter.value] - 50;
    }
    
    appData.deliveryTotalCost = 300 + appData.deliveryPrice * distanceInput.value * 2;

    appData.trenchTotalCost = trenchLengthInput.value * appData.trenchWorkPrice;
    if (distanceInput.value == 0 || distanceInput.value == ''){
        appData.deliveryTotalCost = 0;
    }

    //расчитываем полную стоимость:    
    appData.totalCostWorks = appData.ringsTotalCost + appData.coverCost + appData.bottomCost + appData.trenchTotalCost + appData.deliveryTotalCost;

    //записываем общую сумму в div:
    totalCostValue.textContent = appData.totalCostWorks + ' Грн';
    
    appData.ringsTotalCost=0;
    appData.trenchTotalCost=0;
    appData.deliveryTotalCost=0;
    appData.totalCostWorks=0;
    appData.coverCost=0;
    appData.bottomCost=0;
}

trenchCheckInput.addEventListener('input', function(){
    if (trenchCheckInput.checked){
        trenchLengthInput.disabled = false;
        trenchLengthInput.value = '';
    } else {
        trenchLengthInput.disabled = true;
        trenchLengthInput.value = '';
    }
});