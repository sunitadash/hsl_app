(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(t,e){},147:function(t,e){},152:function(t,e,n){},154:function(t,e,n){},156:function(t,e,n){},161:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(61),i=n.n(o),c=(n(72),n(13)),s=n(14),l=n(16),u=n(15),p=n(17),m=n(163),d=n(164),h=n(65),A=n(62),v=n.n(A),f=n(63),b=n.n(f),g=n(11),y=n.n(g),D=(n(151),n(152),function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={time:y()().locale("fi","en").format("LT")},n}return Object(p.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.intervalID=setInterval(function(){return t.tick()},1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalID)}},{key:"tick",value:function(){this.setState({time:y()().locale("fi","en").format("LT")})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App-clock"},this.state.time)}}]),e}(a.Component)),O=n(21),S=n.n(O),j=(n(154),function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={stop:{}},n}return Object(p.a)(e,t),Object(s.a)(e,[{key:"componentDidMount",value:function(){this.interval=setInterval(this.refreshData.bind(this),15e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.interval)}},{key:"refreshData",value:function(){var t=this;fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-type":"application/graphql",Accept:"application/json"},body:'{\n                stop(id: "HSL:'.concat(this.props.stopId,'") {\n                  name\n                  stoptimesWithoutPatterns {\n                    scheduledDeparture\n                    realtimeDeparture\n                    departureDelay\n                    realtime\n                    serviceDay\n                    trip {\n                        routeShortName\n                        tripHeadsign\n                      }\n                    }          \n                }\n              }')}).then(function(t){return t.json()}).then(function(e){t.setState({stop:e.data.stop})})}},{key:"componentDidUpdate",value:function(){-1!==this.props.stopId&&this.refreshData()}},{key:"shouldComponentUpdate",value:function(t,e){return void 0===this.state.stop||void 0===this.state.stop.name||(t.stopId!==this.props.stopId||S()(e,"stop.name","")!==this.state.stop.name)}},{key:"getTimeStamp",value:function(t){var e=y.a.duration(y()(t).diff(y()())).asMinutes();return e>30?y()(t).format("h:mm"):parseInt(e,10)}},{key:"render",value:function(){var t=this,e=this.state.stop,n=void 0===e?void 0:e;return[n&&n.stoptimesWithoutPatterns&&r.a.createElement("h4",{key:"stop-name",style:{textAlign:"center"}},"Vaihtoyhteydet pys\xe4kilt\xe4 : ",n.name),n&&n.stoptimesWithoutPatterns&&r.a.createElement("table",{className:"scheduled",key:"scheduled"},r.a.createElement("thead",{align:"left"},r.a.createElement("tr",{style:{borderBottom:"2px solid white"}},r.a.createElement("th",null,"Linja"),r.a.createElement("th",null,"M\xe4\xe4r\xe4np\xe4\xe4"),r.a.createElement("th",{style:{textAlign:"right"}},"Min"))),r.a.createElement("tbody",{className:"next-routes"},n.stoptimesWithoutPatterns.map(function(e,n){return r.a.createElement("tr",{key:n.toString(),style:{borderBottom:"1px solid white"}},r.a.createElement("td",null,r.a.createElement("span",{className:"bold"},S()(e,"trip.routeShortName",""))),r.a.createElement("td",null,r.a.createElement("span",null,S()(e,"trip.tripHeadsign",""))),r.a.createElement("td",{style:{textAlign:"right"}},r.a.createElement("span",{className:"bold"},t.getTimeStamp(1e3*(e.serviceDay+e.realtimeDeparture)))))})))].filter(Boolean)}}]),e}(a.Component)),w=(n(156),function(t){function e(){var t,n;Object(c.a)(this,e);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(t=Object(u.a)(e)).call.apply(t,[this].concat(r)))).state={nextStop:-1},n}return Object(p.a)(e,t),Object(s.a)(e,[{key:"componentWillMount",value:function(){var t=this,e=this.props,n=e.operatorId,a=e.busId;this.mqtt=v.a.connect("wss://mqtt.hsl.fi"),this.mqtt.on("connect",function(){console.log("MQTT Connected"),t.mqtt.subscribe("/hfp/v1/journey/ongoing/bus/"+n+"/"+a+"/#")}),this.mqtt.on("message",function(e,n,a){var r=e.split("/"),o=Object(h.a)(r,13),i=o[10],c=o[12],s=JSON.parse(n),l=S()(s,"VP.desi");t.setState({routeNo:l,headSign:i,nextStopId:c})})}},{key:"render",value:function(){var t=this.state,e=t.routeNo,n=t.headSign,a=t.nextStopId;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:b.a,className:"App-logo",alt:"logo"}),r.a.createElement("h4",null,e," ",n),r.a.createElement(D,null)),r.a.createElement(j,{stopId:a}))}}]),e}(a.Component)),k=function(t){function e(){return Object(c.a)(this,e),Object(l.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(p.a)(e,t),Object(s.a)(e,[{key:"render",value:function(){return r.a.createElement(m.a,null,r.a.createElement(d.a,{path:"/:operatorId?/:busId?",render:function(t){return r.a.createElement(w,t.match.params)}}))}}]),e}(a.Component),I=n(162);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(I.a,null,r.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},63:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAA8CAMAAADWtUEnAAAC61BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8JS/TAAAAA+HRSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2ODk6Ozw9Pj9AQUJDREVGR0lKS0xNTk9QUVJTVFVWV1hZWltcXV9gYWJjZGVm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"},67:function(t,e,n){t.exports=n(161)},72:function(t,e,n){},77:function(t,e){},79:function(t,e){}},[[67,2,1]]]);
//# sourceMappingURL=main.81728a9c.chunk.js.map