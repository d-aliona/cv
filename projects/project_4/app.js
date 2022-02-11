const appRoot = document.getElementById('app-root');

let filter = '';
let countries = [];
let countrySorted = 'no';
let areaSorted = 'no';

let appHeader = document.createElement('h1');
let appHeaderText = document.createTextNode('Countries Search');

appHeader.appendChild(appHeaderText);
appRoot.appendChild(appHeader);

let appForm = document.createElement('form');
appRoot.appendChild(appForm);

let typeOfSearch = document.createElement('fieldset');
let searchQuery = document.createElement('fieldset');
appForm.appendChild(typeOfSearch);
appForm.appendChild(searchQuery);

let divLeft = document.createElement('div');
divLeft.textContent = 'Please choose the type of search:';
typeOfSearch.appendChild(divLeft);

let divRight = document.createElement('div');

let rbtnReg = document.createElement('input'); 
rbtnReg.type = 'radio';
rbtnReg.id = 'reg';
rbtnReg.name = 'typeOfSearch';
rbtnReg.value = 'region';

let rbtnLan = document.createElement('input'); 
rbtnLan.type = 'radio';
rbtnLan.id = 'lan';
rbtnLan.name = 'typeOfSearch';
rbtnLan.value = 'languages';

let labelReg = document.createElement('label');
labelReg.for = 'reg';
labelReg.innerText = 'By Region';
let labelLan = document.createElement('label');
labelLan.for = 'lan';
labelLan.innerText = 'By Language';

divRight.appendChild(rbtnReg);
divRight.appendChild(labelReg);
divRight.appendChild(document.createElement('br'));
divRight.appendChild(rbtnLan);
divRight.appendChild(labelLan);

typeOfSearch.appendChild(divRight);

searchQuery.textContent = 'Please choose the type of search:';

let selectList = document.createElement('select');
selectList.disabled = true;
let optionTag = document.createElement('option');
optionTag.innerText = 'Select value';
optionTag.selected = true;
selectList.appendChild(optionTag);
searchQuery.appendChild(selectList);

rbtnReg.addEventListener('change', changeSearchQuery);
rbtnLan.addEventListener('change', changeSearchQuery);
selectList.addEventListener('change', onSelectListItem);
  
let table;

function fillSelect(selectList, listOfElements) {
    selectList.length = 0;
    let optionTag = document.createElement('option');
    optionTag.innerText = 'Select value';
    optionTag.selected = true;
    selectList.appendChild(optionTag);

    for (let i = 0; i < listOfElements.length; i++) {
        optionTag = document.createElement('option');
        optionTag.innerText = listOfElements[i];
        optionTag.value = listOfElements[i];
        selectList.appendChild(optionTag);
    }
}

function noItemsSelected(){
    let pTag = document.createElement('p');
    pTag.innerText = 'No items, please choose search query';
    pTag.id = 'pTag';
    searchQuery.appendChild(pTag);
    
    let tableId = document.getElementById('tableId');
    if (tableId) {
        tableId.innerHTML = '';
        tableId.remove();
    } 
}

function changeSearchQuery() {
    selectList.disabled = false;

    if (this.value === 'region'){
        filter = 'region';
        fillSelect(selectList, externalService.getRegionsList());
    } else if (this.value === 'languages'){
        filter = 'lang';
        fillSelect(selectList, externalService.getLanguagesList());
    }
       
    if (selectList.nextSibling !== null) {
        searchQuery.lastChild.remove();
    }

    noItemsSelected(); 
}

function onSelectListItem() {
    if (this.value === 'Select value'){
        noItemsSelected();
    } else {
        if (filter === 'region') {
            countries = externalService.getCountryListByRegion(this.value);
        } else if (filter === 'lang') {
            countries = externalService.getCountryListByLanguage(this.value);
        }
            
        countrySorted = 'no';        
        sortByCountry();
  
        let pTag = document.getElementById('pTag');
        if (pTag) {
            pTag.remove();
        }
    }        
}

function createTable() {
    let tableId = document.getElementById('tableId');
    if (tableId) {
        tableId.innerHTML = '';
        tableId.remove();
    }   
    
    table = document.createElement('table');
    table.id = 'tableId';
    appRoot.appendChild(table);
    let tr = document.createElement('tr');
    table.appendChild(tr);
    let headerNames = ['Country name', 'Capital', 'World Region', 'Languages', 'Area', 'Flag'];
    
    for (let i = 0; i < headerNames.length; i++) {
        let th = document.createElement('th');
        th.id = 'col' + i;
        th.innerText = headerNames[i];
        tr.appendChild(th);
    }
    let col = document.getElementById('col0');
    let arr = document.createElement('span');
    arr.id = 'arrowCountry';
    col.appendChild(arr);

    col = document.getElementById('col4');
    arr = document.createElement('span');
    arr.id = 'arrowArea';
    col.appendChild(arr);    
    
    for (let i =0; i < countries.length; i++) {
        let trow = document.createElement('tr');

        let td = document.createElement('td');
        td.innerText = countries[i].name;
        trow.appendChild(td);

        td = document.createElement('td');
        td.innerText = countries[i].capital;
        trow.appendChild(td);

        td = document.createElement('td');
        td.innerText = countries[i].region;
        trow.appendChild(td);

        td = document.createElement('td');
        td.innerText = showLang(countries[i].languages);
        trow.appendChild(td);

        td = document.createElement('td');
        td.innerText = countries[i].area;
        trow.appendChild(td);

        td = document.createElement('td');
        let flagImg = document.createElement('img');
        const countryCodeStart = 28;
        const countryCodeEnd = 30;
        flagImg.src = 'https://flagicons.lipis.dev/flags/4x3/' + 
            countries[i].flagURL.substring(countryCodeStart, countryCodeEnd) + '.svg';
        flagImg.alt = countries[i].name;
        flagImg.id = 'flagImage';
        td.appendChild(flagImg);
        trow.appendChild(td);

        table.appendChild(trow);
    }

    let arrowCountry = document.getElementById('arrowCountry');
    arrowCountry.addEventListener('click', sortByCountry);
    let arrowArea = document.getElementById('arrowArea');
    arrowArea.addEventListener('click', sortByArea);
}

function showLang(obj) {
    let res = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            res.push(obj[key]);
        }        
    }
    return res.join(', ');
}

function sortByCountry() {
    const minusOne = -1;
    areaSorted = 'no';
    if (countrySorted === 'up') {
        countrySorted = 'down';
        countries.sort(function (a,b) { 
            if (a.name < b.name) {
                return 1;
            }
            if (a.name > b.name) {
                return minusOne;
            }
            return 0;
        });

    } else if (countrySorted === 'down' || countrySorted === 'no') {
        countrySorted = 'up';
        countries.sort(function (a,b) { 
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return minusOne;
            }
            return 0;
        });
    }
    createTable();
    changeArrowCountry();
    changeArrowArea();
}

function sortByArea() {
    countrySorted = 'no';
    if (areaSorted === 'up') {
        areaSorted = 'down';
        countries.sort(function (a,b) { 
            return b.area - a.area;
        });

    } else if (areaSorted === 'down' || areaSorted === 'no') {
        areaSorted = 'up';
        countries.sort(function (a,b) { 
            return a.area - b.area;
        });
    }
    if (table) {
        table.remove();
    }
    createTable();
    changeArrowCountry();
    changeArrowArea();
}

function changeArrowCountry() {
    let el = document.getElementById('arrowCountry');
    if (countrySorted === 'no') {
        el.innerHTML = '&#8597;';
    }
    if (countrySorted === 'up') {
        el.innerHTML = '&#8593;';
    }
    if (countrySorted === 'down') {
        el.innerHTML = '&#8595;';
    }
}

function changeArrowArea() {
    let el = document.getElementById('arrowArea');
    if (areaSorted === 'no') {
        el.innerHTML = '&#8597;';
    }
    if (areaSorted === 'up') {
        el.innerHTML = '&#8593;';
    }
    if (areaSorted === 'down') {
        el.innerHTML = '&#8595;';
    }
}