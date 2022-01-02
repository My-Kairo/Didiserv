module.exports = function Invoicing(local) {

    var pull = "";
    var pool = local;
    
  
    async function setNames(user) { 
        
        if (user != '' && /^[a-zA-Z]+$/.test(user)) {
            var name = user[0].toUpperCase() + user.slice(1).toLowerCase();
            const sql = await pool.query('select * from voice where username = $1', [name]);
    
            if (sql.rows.length == 0) {
                await pool.query('insert into voice (username, veiws) values ($1, $2)', [name, 1]);
                } else {
                    await pool.query('update voice set veiws = veiws + 1 where username = $1', [name])
                    }
        }
    }

    async function Message(outstanding, names) {
        // setNames(names);
        
        if (outstanding === 'Paid') {
            pull = 'Hello, ' + names[0].toUpperCase() + names.slice(1).toLowerCase() + ' ' + 'you have successfully requested for paid invoice';
        } else if (outstanding === 'Unpaid') {
            pull = 'Hello, ' + names[0].toUpperCase() + names.slice(1).toLowerCase() + ' ' + 'you have successfully requested for unpaid invoice';
        }
    }

    async function getNames() {
        const slctdNames = await pool.query('select username from voice');
        return slctdNames.rows;
    }

     function getPull() {
       return pull;
    }

    async function poolTable(){
        const sqlCount = await pool.query('select count(*) from voice');
        return sqlCount.rows[0].count;
    }

    async function getUserName(name){
        const sqldb = await pool.query('select * from voice where username = $1', [name])
        return sqldb.rows[0].veiws;
    }
    
    return {
        getNames,
        Message,
        getPull,
        setNames,
        poolTable,
        getUserName
    }
}