Turing.Algorithms = [];

Turing.Algorithms.push({
	"name": "Multiplication par 2",
	"alphabets": [0, 1],
	"defaultState": 0,

	"states": [
		[
			{
				write: null,
				move: "right",
				next: 0
			},

			{
				write: null,
				move: "right",
				next: 0
			},

			{
				write: 0,
				move: "left",
				next: 1
			}
		],

		[
			{
				write: null,
				move: "left",
				next: 1
			},

			{
				write: null,
				move: "left",
				next: 1
			},

			{
				write: null,
				move: "right",
				next: -1
			}
		]
	]
});

Turing.Algorithms.push({
	"name": "Inversions des bits",
	"alphabets": [0, 1],
	"defaultState": 0,

	"states": [
		[
			{
				write: 1,
				move: "right",
				next: 0
			},

			{
				write: 0,
				move: "right",
				next: 0
			},

			{
				write: null,
				move: "left",
				next: 1
			}
		],

		[
			{
				write: null,
				move: "left",
				next: 1
			},

			{
				write: null,
				move: "left",
				next: 1
			},

			{
				write: null,
				move: "right",
				next: -1
			}
		]
	]
});

Turing.Algorithms.push({
	"name": "Soustraction par 1",
	"alphabets": [0, 1],
	"defaultState": 0,

	"states": [
		[
			{
				write: null,
				move: "right",
				next: 0
			},

			{
				write: null,
				move: "right",
				next: 0
			},

			{
				write: null,
				move: "left",
				next: 1
			}
		],

		[
			{
				write: 1,
				move: "left",
				next: 1
			},

			{
				write: 0,
				move: "left",
				next: 2
			},

			{
				write: null,
				move: "right",
				next: -1
			}
		],

		[
			{
				write: null,
				move: "left",
				next: 2
			},

			{
				write: null,
				move: "left",
				next: 2
			},

			{
				write: null,
				move: "right",
				next: -1
			}
		],
	]
});

Turing.Algorithms.push({
	"name": "Boucle Infinie",
	"alphabets": [0, 1],
	"defaultState": 0,

	"states": [
		[
			{
				write: null,
				move: null,
				next: 0
			},

			{
				write: null,
				move: null,
				next: 0
			},

			{
				write: null,
				move: null,
				next: 0
			}
		]
	]
});