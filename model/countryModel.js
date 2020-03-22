const {cp} = require('../db/connection.js');
const {query} = require('../db/promise-mysql.js');

exports.getAllCountry = () => {

    var options = {
        sql: `select country_region as country, 
                    sum(confirmed) as confirmed,
                    sum(deaths) as deaths,
                    sum(recovered) as recovered,
                    last_update as lastUpdate,
                    latitude,
                    longitude
                from covid_19.daily_reports
                    where date_imported = CURRENT_DATE
                group by country_region`, 
        nestTables: false};


    return query(cp, options)
}