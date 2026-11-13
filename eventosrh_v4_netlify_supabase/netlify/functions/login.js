const {crypto,json,sign,fail}=require('./_shared');
exports.handler=async event=>{if(event.httpMethod!=='POST')return json(405,{error:'Método não permitido'});try{
 const password=String(JSON.parse(event.body||'{}').password||'');const correct=process.env.PORTAL_PASSWORD;if(!correct)throw Error('PORTAL_PASSWORD não configurada');
 const a=crypto.createHash('sha256').update(password).digest(),b=crypto.createHash('sha256').update(correct).digest();
 if(!crypto.timingSafeEqual(a,b))return json(401,{error:'Código de acesso incorreto.'});
 const token=sign({exp:Date.now()+8*60*60*1000});
 return json(200,{ok:true},{'Set-Cookie':`erh_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`});
 }catch(e){return fail(e)}};
