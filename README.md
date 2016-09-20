# Random--quote-machine
1. 用到了jquery,jquery-ui,ajax,及font-awesome.
2. twitter，tumblr点击不跳转问题已解决。
   问题原因：
   1）漏了“target = _blank”,以至于每次点击都刷新index页面。
   2）"currentQuote"及"currentAuthor"为局部变量，click事件访问不到。
3. 补充了注释。
4. 下版本用scss替代css.
