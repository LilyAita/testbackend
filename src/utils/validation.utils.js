exports.validate_data = (req, need_fields)=>{
    let res = [];
    let myreq = new Map(Object.entries(req.body));
    for (var field of need_fields)
    {
        if(!myreq.has(field))
        {
            res.push(field);
        }
    }
    return res;
} 

