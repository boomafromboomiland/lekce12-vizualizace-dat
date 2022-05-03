fetch('./variables.json')
    .then(response => response.json())
    .then(variables => {
        fetch(`https://onemocneni-aktualne.mzcr.cz/api/v3/zakladni-prehled?apiToken=${variables.apiToken}`)
        .then(response => response.json())
        .then(data => {
            // preulozeni dat do promenne a vypsani do konzole
            let zakladniInfo = data['hydra:member'][0];
            console.log(zakladniInfo);

            //datum upravy
            let datumUpravy = new Date(zakladniInfo.datum);
            document.getElementById('js-modifikovano').innerText = datumUpravy.toLocaleDateString('cs-CZ');

            //aktualne hospitalizovani
            document.getElementById('js-hospitalizovani').innerText = parseInt(zakladniInfo.aktualne_hospitalizovani).toLocaleString('cs-CZ');

            //pribytek za predchozi mereny den
            document.getElementById('js-potvrzeni').innerText = parseInt(zakladniInfo.potvrzene_pripady_vcerejsi_den).toLocaleString('cs-CZ')
            let datumPotvrzenych = new Date(zakladniInfo.potvrzene_pripady_vcerejsi_den_datum);
            document.getElementById('js-potvrzeni-datum').innerText = datumPotvrzenych.toLocaleDateString('cs-CZ');

            //ockovani za predchozi mereny den
            document.getElementById('js-ockovani').innerText = parseInt(zakladniInfo.ockovane_osoby_vcerejsi_den).toLocaleString('cs-CZ')
            let datumOckovanych = new Date(zakladniInfo.ockovane_osoby_vcerejsi_den_datum);
            document.getElementById('js-ockovani-datum').innerText = datumOckovanych.toLocaleDateString('cs-CZ');
        
            // UKOL NA CVICENI
            // pridej do prehledu podil pribytku nakazenych ve vekovej skupine 65+
            let podiel65 = ((zakladniInfo.potvrzene_pripady_65_vcerejsi_den / zakladniInfo.potvrzene_pripady_vcerejsi_den) * 100).toFixed(2);
            document.getElementById('js-vek').innerHTML = `${podiel65}%`;

            // skupine 65+ za posledni mereny den z celkoveho pribytku
            document.getElementById('js-65').innerText = parseInt(zakladniInfo.potvrzene_pripady_65_vcerejsi_den).toLocaleString('cs-CZ')
            let datumStarsich = new Date(zakladniInfo.potvrzene_pripady_65_vcerejsi_den_datum);
            document.getElementById('js-starsi-datum').innerText = datumStarsich.toLocaleDateString('cs-CZ');
            
            // nakazenych za posledni mereny den
            document.getElementById('js-nakazeny').innerText = parseInt(zakladniInfo.potvrzene_pripady_vcerejsi_den).toLocaleString('cs-CZ')
            let datumNakazenych = new Date(zakladniInfo.potvrzene_pripady_vcerejsi_den_datum);
            document.getElementById('js-nakazeny-datum').innerText = datumNakazenych.toLocaleDateString('cs-CZ');


            // UKOL NA CVICENI
            // proved validaci, zda plati podminka 
            // celkem_potvrzeni = aktivni + vyleceni + umrti
            // vysledek validace vypis do konzole pomoci console.log()

            // BONUSOVY UKOL NA CVICENI
            // proved refactoring lokalizace datumu a cislnych hodnot
            // tak, ze vyvoris dve separatni funkce pro lokalizaci
        })
    })
    .catch(error => {
        console.error('Chyba aplikace (zakladni info): ', error);
    })