async function sendMessage(){const t=document.getElementById("user-input").value,e=document.getElementById("chat-box"),s=document.getElementById("chat-model-name").value;if(!t.trim())return void alert("请输入内容");const n=marked.parse(t);e.innerHTML+=`<div class="user"><strong>你:</strong> ${n}</div>`,document.getElementById("user-input").value="",e.innerHTML+='<div class="loading"><strong>智能助手:</strong> 正在思考中...</div>';const o=e.lastElementChild;let a=JSON.parse(localStorage.getItem("chatHistory"))||[];a.push({role:"user",content:t});const r={method:"POST",headers:{Authorization:modelkey,"Content-Type":"application/json"},body:JSON.stringify({model:s,messages:a,stream:!1,max_tokens:512,stop:["null"],temperature:.7,top_p:.7,top_k:50,frequency_penalty:.5,n:1,response_format:{type:"text"},tools:[{type:"function",function:{description:"<string>",name:"<string>",parameters:{},strict:!1}}]})};try{const t=await fetch(modelapi,r),s=await t.json();o.remove();const n=marked.parse(s.choices[0].message.content);e.innerHTML+=`<div class="assistant"><strong>智能助手:</strong> ${n}</div>`,e.scrollTop=e.scrollHeight,a.push({role:"assistant",content:s.choices[0].message.content}),localStorage.setItem("chatHistory",JSON.stringify(a))}catch(t){o.remove(),e.innerHTML+='<div class="assistant"><strong>错误:</strong> 无法获取智能助手的回复</div>'}}window.onload=function(){const t=document.getElementById("chat-box");t.innerHTML+=`<div class="assistant"> ${marked.parse("欢迎使用智能助手系统！你可以在这里提出任何问题，我会尽力帮助你。")}</div>`;(JSON.parse(localStorage.getItem("chatHistory"))||[]).forEach((e=>{t.innerHTML+=`<div class="${e.role}"><strong>${"user"===e.role?"你:":"智能助手:"}</strong> ${marked.parse(e.content)}</div>`}))};