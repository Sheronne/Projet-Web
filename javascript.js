var date = new Date();
var tableau = new Vue({
    el: '#main',
    data: {
        elementsPerPage: 10,
        elementsPerPageOptions: [10, 20, 30],
        currentPage: 1,
        ascending: false,
        sortColumn: '',
        showModal: false,
        searchString: "",
        //gridColumns: ['ID', 'Titre', 'Resume', 'Affectation', 'Client', 'Etat'],
        col: {
            ID: '',
            Titre: '',
            Resume: '',
            Affectation: '',
            Client: '',
            Etat: '',
            Date: '',
        },
        row: {
            id: '',
            titre: '',
            resume: '',
            affectation: '',
            client: '',
            etat: '',
            date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(),
        },
        rows: []

    },
    mounted: function () {
        this.on_load()
    },
    methods: {
        "addRow": function addRow() {
            var obj = ({ ID: this.row.id, Titre: this.row.titre, Resume: this.row.resume, Affectation: this.row.affectation, Client: this.row.client, Etat: this.row.etat, Date: this.row.date });
            this.rows.push(obj);
            localStorage.setItem('allrows', JSON.stringify(this.rows));
        },
        "on_load": function on_load() {
            if (JSON.parse(localStorage.getItem('allrows')) != null) {
                this.rows = JSON.parse(localStorage.getItem('allrows'));
            }
        },
        "onSubmit": function onSubmit() {
        },
        filterItems: function (presets) {
            var app = this;
            return rows.filter(function (preset) {
                let regex = new RegExp('(' + app.searchQuery + ')', 'i');
                return rows.Titre.match(regex);
            })
        },
        "removeRow": function removeRow() {
            console.log(this.rows)
            for (let i = this.rows.length - 1; i >= 0; i--) {
                console.log(i)
                if (this.rows[i].del) {
                    this.rows.splice(i, 1)
                }
            }
            localStorage.setItem('allrows', JSON.stringify(this.rows));
        },
        "removeThisRow": function removeThisRow(index) {
            this.$delete(this.rows, index);
            localStorage.setItem('allrows', JSON.stringify(this.rows));
        },
        "filterItems": function filterItems(presets) {
            var app = this;
            return rows.filter(function(preset) {
              let regex = new RegExp('(' + app.searchString + ')', 'i');
              return preset.Titre.match(regex);
            })
          },
        "sortTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }
            var ascending = this.ascending;
            this.rows.sort(function (a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })
        },
        "resPage": function resPage() {
            this.currentPage = 1;
        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            const start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return ['ID', 'Titre', 'Resume', 'Affectation', 'Client', 'Etat', 'Date'];
            }
            return Object.keys(this.rows[0])
        }
    }
});

// register modal component
Vue.component('modal', {
    template: '#modal-template'
})
