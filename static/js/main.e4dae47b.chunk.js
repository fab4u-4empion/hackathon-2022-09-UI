(this["webpackJsonpmini-app"]=this["webpackJsonpmini-app"]||[]).push([[0],{130:function(e,t,c){},132:function(e,t,c){"use strict";c.r(t);var s=c(0),n=c.n(s),j=c(14),i=c.n(j),a=c(8),r=c.n(a),o=c(12),b=c(5),l=(c(129),c(130),c(133)),h=c(1),d=function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(b.j,{children:"\u0421\u043e\u0431\u044b\u0442\u0438\u044f"}),Object(h.jsx)(b.f,{style:{height:"1000px"},children:Object(h.jsx)(b.m,{icon:Object(h.jsx)(l.a,{width:56,height:56})})})]})},O=function(e){var t=e.onChatOpen;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(b.j,{children:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f"}),Object(h.jsx)(b.f,{children:Object(h.jsx)(b.h,{children:[1,2,3,4].map((function(e){return Object(h.jsxs)(b.n,{before:Object(h.jsxs)(b.g,{gradientColor:Object(b.v)(e),children:["C",e]}),onClick:function(){return t("Chat ".concat(e))},caption:Object(h.jsxs)(b.r,{children:[(c="FirstName: last message very long text",s=30,c.length>s?c.substring(0,s)+"...":c)," \xb7 2h"]}),children:["Chat ",e]},e);var c,s}))})})]})},x=c(134),u=function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(b.j,{children:"\u041f\u0440\u043e\u0444\u0438\u043b\u044c"}),Object(h.jsx)(b.f,{style:{height:"1000px"},children:Object(h.jsx)(b.m,{icon:Object(h.jsx)(x.a,{width:56,height:56})})})]})},f=function(e){var t=e.self,c=void 0!==t&&t,s=e.text,n=e.caption,j=void 0===n?"":n;return Object(h.jsx)("div",{className:"messageBox ".concat(c?"self":""),children:Object(h.jsxs)("div",{className:"messageTextBox ".concat(c?"self":""),children:[Object(h.jsx)("div",{children:s}),j&&Object(h.jsx)("div",{className:"messageCaption",children:j})]})})},g=function(){return Object(s.useEffect)((function(){setTimeout((function(){return window.scrollTo(0,document.body.scrollHeight)}),0)}),[]),Object(h.jsxs)("div",{className:"messageList",caption:"21:05",children:[Object(h.jsx)(f,{text:"message",caption:"21:05"}),Object(h.jsx)(f,{text:"longgggggg message",caption:"21:05"}),Object(h.jsx)(f,{text:"poweofoewkfopwkoqfkwopekfokewopfkoewkfoewf",caption:"21:05"}),Object(h.jsx)(f,{text:"other people",caption:"21:05"}),Object(h.jsx)(f,{self:!0,text:"self message",caption:"21:05"})]})},p=function(e){var t=e.chatID,c=e.onClose,n=Object(s.useState)(""),j=Object(o.a)(n,2),i=j[0],a=j[1],r=Object(s.useState)(0),l=Object(o.a)(r,2),d=l[0],O=l[1],x=Object(s.useRef)();return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsx)(b.j,{className:"shadowPanelHeader",separator:!1,before:Object(h.jsx)(b.k,{onClick:function(){return c()}}),children:Object(h.jsx)(b.l,{before:Object(h.jsx)(b.g,{size:36,gradientColor:Object(b.v)(Date.now()),children:"Ch"}),status:"10 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u0432",children:t})}),Object(h.jsx)(g,{}),Object(h.jsx)(b.e,{vertical:"bottom",style:{paddingBottom:0},children:Object(h.jsxs)("div",{ref:x,children:[Object(h.jsx)(b.o,{wide:!0}),Object(h.jsx)(b.t,{value:i,onChange:function(e){return a(e.target.value)},onHeightChange:function(){return function(){var e=x.current;if(e){var t=e.offsetHeight;t!==d&&O(t)}}()},placeholder:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",after:Object(h.jsx)(s.Fragment,{children:Object(h.jsx)(b.u,{mode:"send",disabled:0===i.length})})})]})})]})},m=function(){var e=Object(s.useState)("bright_light"),t=Object(o.a)(e,2),c=t[0],j=(t[1],n.a.useState("messages")),i=Object(o.a)(j,2),a=i[0],r=(i[1],Object(s.useState)("chat")),l=Object(o.a)(r,2),x=l[0],f=l[1],g=Object(s.useState)(null),m=Object(o.a)(g,2),v=m[0],w=m[1],C=Object(s.useState)(!0),k=Object(o.a)(C,2),y=(k[0],k[1]);return Object(h.jsx)(b.c,{scheme:c,children:Object(h.jsx)(b.a,{children:Object(h.jsx)(b.b,{children:Object(h.jsx)(b.q,{header:Object(h.jsx)(b.j,{separator:!1}),style:{justifyContent:"center"},children:Object(h.jsx)(b.p,{animate:!0,spaced:!1,width:"100%",maxWidth:"100%",children:Object(h.jsxs)(b.d,{activeStory:a,tabbar:!1,children:[Object(h.jsx)(b.s,{id:"events",activePanel:"events",children:Object(h.jsx)(b.i,{id:"events",children:Object(h.jsx)(d,{})})}),Object(h.jsxs)(b.s,{id:"messages",activePanel:x,children:[Object(h.jsx)(b.i,{id:"messages",children:Object(h.jsx)(O,{onChatOpen:function(e){w(e),f("chat"),y(!1)}})}),Object(h.jsx)(b.i,{id:"chat",className:"chatPanel",children:Object(h.jsx)(p,{chatID:v,onClose:function(){f("messages"),y(!0)}})})]}),Object(h.jsx)(b.s,{id:"profile",activePanel:"profile",children:Object(h.jsx)(b.i,{id:"profile",children:Object(h.jsx)(u,{})})})]})})})})})})};r.a.send("VKWebAppInit"),i.a.render(Object(h.jsx)(m,{}),document.getElementById("root"))}},[[132,1,2]]]);
//# sourceMappingURL=main.e4dae47b.chunk.js.map