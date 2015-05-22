window.onload = function() {
	var vm = new Vue({
		el: "#main",
		data: {
			showDebug: false,
			debugHistory: [],
			userOptions: lightdm.users.map(function(u) {
				return {value: u.name, text: u.name}
			}),
			userKey: lightdm.users[0].name,
			sessionOptions: lightdm.sessions.map(function(s) { 
				return {value: s.key, text: s.name}
			}),
			sessionKey: lightdm.default_session,
			password: null,
			passwordPrompt: false
		},
		methods: {
			selectSession: function(i) {
				this.session = this.sessions[i];
			},
			selectUser: function(userKey, old) {
				userKey = userKey || this.userKey;
				this.passwordPrompt = false;
				this.debug({msg: "Start auth...", userKey: userKey, old: old});
				if (old && userKey != old)
					lightdm.cancel_authentication();
				lightdm.start_authentication(userKey);
			},
			login: function(e) {
				e.preventDefault();
				this.pendingAuth = true;
				vm.debug({f: "provide_secret", v: vm.password});
				lightdm.provide_secret(vm.password);
				
			},
			passwordIncorrect: function() {
				var self = this;
				this.password = "";
				this.passwordPrompt = false;
				window.p = this.$$.password;
				this.$$.password.style.backgroundColor = "#991111";
				setTimeout(function() {
					self.$$.password.style.backgroundColor = "";
					self.selectUser();
				}, 1000);
			},
			debug: function(m) {
				this.debugHistory.push(m);
			}
		},
		watch: {
			userKey: this.selectUser
		}
	});
	window.authentication_complete = function () {
		vm.debug({ldmuser: lightdm.authentication_user, is_authenticated: lightdm.is_authenticated});
		if (lightdm.is_authenticated) {
			lightdm.login(lightdm.authentication_user, vm.sessionKey);
		} else {
			vm.debug({msg: "Password Incorrect"});
			vm.password = "";
			vm.passwordIncorrect();
		}
	};
	window.show_prompt = function(text) {
		vm.debug({f: "show_prompt", v: text});
		if (text == "Password: ") {
			vm.passwordPrompt = true;
			setTimeout(function() { vm.$$.password.focus(); }, 0);
		}
	};
	window.show_message = function(text) {
		vm.debug({f: "show_message", v: text});
	};
	window.show_error = function(text) {
		vm.debug({f: "show_error", v: text});
	};
	window.onkeypress = function(e) {
		e = window.event || e;
		if (e.keyCode == 126)
			vm.showDebug = !vm.showDebug;
	};
	vm.selectUser();
};
