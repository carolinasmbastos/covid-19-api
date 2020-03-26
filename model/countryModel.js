const {cp} = require('../db/connection.js');
const {query} = require('../db/promise-mysql.js');

exports.getAllCountry = () => {

    var options = {
        sql: `(select country_region as country, 
                    sum(confirmed) as confirmed,
                    sum(deaths) as deaths,
                    sum(recovered) as recovered,
                    last_update as lastUpdate,
                    latitude,
                    longitude
                from covid_19.daily_reports		
                    where date_imported = (select max(date_imported) from covid_19.daily_reports)
                group by country_region order by confirmed desc)
                union
                (select country_region as country, 
                    sum(confirmed) as confirmed,
                    sum(deaths) as deaths,
                    sum(recovered) as recovered,
                    last_update as lastUpdate,
                    latitude,
                    longitude
                from covid_19.daily_reports_US		
                    where date_imported = (select max(date_imported) from covid_19.daily_reports_US)
                group by country_region order by confirmed desc)`, 
        nestTables: false};


    return query(cp, options)
}


exports.getCountryByName = (country) => {

    let table = 'daily_reports';
    if (country == 'US') {
        table += '_US'
    } 

    var options = {
        sql: `select country_region as country, 
                sum(confirmed) as confirmed,
                sum(deaths) as deaths,
                sum(recovered) as recovered,
                last_update as lastUpdate,
                latitude,
                longitude
            from covid_19.${table}		
                where country_region like ${cp.escape(country)}
                and date_imported = (select max(date_imported) from covid_19.${table})
            group by country_region order by country_region`, 
        nestTables: false};
    //console.log(options.sql)

    return query(cp, options)
}

exports.getCountryTimeline = (country) => {

    let table = 'daily_reports';
    if (country == 'US') {
        table += '_US'
    } 
    
    var options = {
        sql: `select country_region as country, 
                    sum(confirmed) as confirmed,
                    sum(deaths) as deaths,
                    sum(recovered) as recovered,
                    date_imported as lastUpdate,
                    latitude,
                    longitude
                from covid_19.${table}		
                    where country_region like ${cp.escape(country)}
                group by country_region, date_imported 
                order by date_imported desc`, 
        nestTables: false};
    //console.log(options.sql)

    return query(cp, options)
}