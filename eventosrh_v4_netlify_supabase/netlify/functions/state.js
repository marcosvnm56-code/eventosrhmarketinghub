const {json,verified,db,fail}=require('./_shared');
exports.handler=async event=>{
 if(!verified(event))return json(401,{error:'Sessão expirada. Entre novamente.'});
 if(!['GET','PUT'].includes(event.httpMethod))return json(405,{error:'Método não permitido'});
 try{
  if(event.httpMethod==='GET'){
   const rows=await db('marketing_workspace?id=eq.1&select=data,revision');
   if(!rows?.length)throw Error('Tabela marketing_workspace não criada. Execute o SQL fornecido.');
   return json(200,rows[0]);
  }
  if(Buffer.byteLength(event.body||'')>4_500_000)return json(413,{error:'Arquivo de dados grande demais. Reduza as imagens incorporadas.'});
  const payload=JSON.parse(event.body||'{}');
  if(!payload.data||typeof payload.data!=='object'||Array.isArray(payload.data)||!Number.isSafeInteger(payload.revision)||payload.revision<0)return json(400,{error:'Dados inválidos'});
  const updated=await db('marketing_workspace?id=eq.1&revision=eq.'+payload.revision,{method:'PATCH',headers:{Prefer:'return=representation'},body:JSON.stringify({data:payload.data,revision:payload.revision+1,updated_at:new Date().toISOString()})});
  if(!updated?.length)return json(409,{error:'O painel foi alterado em outro dispositivo. Atualize para ver a versão mais recente.'});
  return json(200,{revision:updated[0].revision});
 }catch(e){return fail(e)}
};
