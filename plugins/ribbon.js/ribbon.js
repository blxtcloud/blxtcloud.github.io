(()=>{function e(e,t,n){return Number(e.getAttribute(t))||n}var n,i,t=(t=document.getElementsByTagName("script"))[t.length-1];config={z:e(t,"zIndex",-1),a:e(t,"alpha",.6),s:e(t,"size",90)};var o=(t=document.createElement("canvas")).getContext("2d"),a=window.devicePixelRatio||1,c=window.innerWidth,l=window.innerHeight,d=config.s,r=Math,g=0,h=2*r.PI,s=r.cos,f=r.random;function m(){for(o.clearRect(0,0,c,l),n=[{x:0,y:.7*l+d},{x:0,y:.7*l-d}];n[1].x<c+d;){t=e=void 0;var e=n[0],t=n[1];o.beginPath(),o.moveTo(e.x,e.y),o.lineTo(t.x,t.y),e=t.x+(2*f()-.25)*d,t=function e(t){i=t+(2*f()-1.1)*d;return l<i||i<0?e(t):i}(t.y),o.lineTo(e,t),o.closePath(),g-=h/-50,o.fillStyle="#"+(127*s(g)+128<<16|127*s(g+h/3)+128<<8|127*s(g+h/3*2)+128).toString(16),o.fill(),n[0]=n[1],n[1]={x:e,y:t}}}t.width=c*a,t.height=l*a,o.scale(a,a),o.globalAlpha=config.a,t.style.cssText="opacity: "+config.a+";position:fixed;top:0;left:0;z-index: "+config.z+";width:100%;height:100%;pointer-events:none;",document.getElementsByTagName("body")[0].appendChild(t),document.onclick=m,(document.ontouchstart=m)()})();