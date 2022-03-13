let users = [{id : 1, name : 'Dian', email : 'dian@gmail.com'},
{id : 2, name : 'Herdiana', email : 'herdiana@gmail.com'}]

module.exports = {
    index : (req, res)=>{
        if(users.length > 0){
            res.json({
                status : true,
                data : users,
                method : req.method,
                url : req.url
            })
        } else {
            res.json({
                status : false,
                message : 'Data masih kosong'
            })
        }
    }
}