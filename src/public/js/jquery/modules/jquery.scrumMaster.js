(function($, jQuery) {
	jQuery.fn.scrumMaster = function(options) {
		options = jQuery.extend({}, jQuery.fn.scrumMaster.options, options);

		var me,
			listeners;

		me = $(this);
		me.options = options;

		$(options.pokerCardsShowButton).on('click', function(event) {
			var pushData = {
				type: 'show-cards'
			};
			window.managedSocket.send(JSON.stringify(pushData));
		});

		$(options.pokerCardsResetButton).on('click', function(event) {
			var reallyDelete,
				pushData;

			reallyDelete = confirm(options["i18n"]["cards-reset-confirm"]);
			if (reallyDelete) {
				var pushData = {
					type: 'reset-cards'
				};
				window.managedSocket.send(JSON.stringify(pushData));
			}
		});

		$(options.pokerRoomResetButton).on('click', function(event) {
			var reallyReset,
				pushData;

			reallyReset = confirm(options["i18n"]["room-reset-confirm"]);
			if (reallyReset) {
				pushData = {
						type: 'reset-room'
				};
				window.managedSocket.send(JSON.stringify(pushData));
			}
		});

		listeners = $({});

		listeners.on('reset-room', function(event, message) {
			// Type: 'reset-room'
			// So far this is the only type this module supports, so there is no need for a use case yet
			$(options.userstory).hide(400);
		});

		listeners.on('show-cards', function(event, message) {
			// poker-card
			const felt = $('.poker-felt').find()
			childrenFelt = felt.prevObject[0].children;

			const arr = []
			for (const felt of childrenFelt) {
				const obj = {
					value: +felt.children[0].innerHTML,
					id: felt.children[0].id,
					name: felt.innerText,
					idFelt: felt.id,
				}
			if (!arr[obj.value]?.length > 0) {
				arr[obj.value] = []
			}
			  arr[obj.value][arr[obj.value].length] = obj
			}

			console.log(arr)

			var max = arr.reduce(function(a, b) {
				return Math.max(a, b.length);
			}, -Infinity);

			const arrMax = arr.filter((el) => el.length === max)

			console.log(arrMax)
			if (arrMax.length  === 1) {
				const arrColor = arrMax[0]
				for (const obj of arrColor) {
					$(`#${obj.id}`).css("background-color", "#7CFC00");
				}

			}

			console.log('FIM')

			$('.' + options.showCardsSelectorClass).removeClass(options.showCardsToggleClass);
			$(options.pokerCardsShowButton).attr('disabled', 'disabled');
		});
		
		return listeners;
	};

	jQuery.fn.scrumMaster.options = {
		pokerCardsShowButton: null,
		pokerCardsResetButton: null,
		pokerRoomResetButton: null,
		showCardsSelectorClass: null,
		showCardsToggleClass: null,
		userstory: null,
		"i18n": null
	};
})(jQuery, jQuery);