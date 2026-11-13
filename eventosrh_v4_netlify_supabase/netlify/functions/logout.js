const {json}=require('./_shared');
exports.handler=async event=>event.httpMethod==='POST'?json(200,{ok:true},{'Set-Cookie':'erh_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'}):json(405,{error:'Método não permitido'});
