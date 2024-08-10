async function before(m) {
    let user = db.data.users[m.sender]                              
    if (new Date() - user.lastBanned > 0 && user.banned) {
            user.lastBanned = 0
            user.banned = false
        }
    }
    
module.exports = {
    before,
}